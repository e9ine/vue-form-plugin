<template>
    <div>
        <template v-if="$slots.label">
            <slot name="label"></slot>
        </template>
        <label v-else class="control-label" :for="attrs.id || label || property.name" v-text="label || property.name" v-show="!hideLabel"></label>
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'" class="form-element">
            <div v-if="typeof items[0] === 'object'" class="single">
                <span class="allowclear" v-if="allowClear && displayMode !== 'VIEW' && clonedValue.value" @click="clearSelected">
                    <i class="material-icons">close</i>
                </span>
                <multiselect v-model="selected" :options="items" open-direction="bottom" :track-by="valueField || '_id'" :label="displayField || 'Name'" :searchable="!!searchable" :close-on-select="true" select-label="" deselect-label="" :hide-selected="true" :disabled="disabled" :placeholder="placeholder" :allow-empty="allowClear" @close="handler">
                    <template slot="option" slot-scope="props">
                        <div v-if="optionTemplate && optionTemplate.length > 0 && props && props.option">
                            <v-runtime-template :template="optionTemplate" :template-props="{ props }"></v-runtime-template>
                        </div>
                        <div v-else class="d-flex align-items-center">
                            <img class="profile" v-if="showAvatar" :src="props.option[avatarProp]" :alt="props.option.Name" loading="lazy" />
                            <div class="description">
                                <div class="title">
                                    {{ props.option.Name }}
                                </div>
                                <small class="text-muted" v-if="props.option.Description">
                                    {{ props.option.Description }}
                                </small>
                            </div>
                        </div>
                    </template>
                </multiselect>
            </div>
            <div v-else class="single">
                <span class="allowclear" v-if="allowClear && displayMode !== 'VIEW' && clonedValue.value" @click="clearSelected">
                    <i class="material-icons">close</i>
                </span>
                <multiselect v-model="selected" :options="items" open-direction="bottom" :searchable="!!searchable" :close-on-select="true" select-label="" deselect-label="" :disabled="disabled" :hide-selected="true" :placeholder="placeholder" @close="handler"> </multiselect>
            </div>
        </div>
        <template v-if="$slots.view && displayMode === 'VIEW'">
            <slot name="view"></slot>
        </template>
        <p class="form-control-static" v-else-if="items && displayMode === 'VIEW' && typeof items[0] === 'string' && (property.filter || filter)">
            {{ $options.filters[filter || property.filter](clonedValue.value, ...(filterArgs || property.filterArgs)) || '-' }}
        </p>
        <p class="form-control-static" v-else-if="items && displayMode === 'VIEW' && typeof items[0] === 'object' && (property.filter || filter)">
            {{ $options.filters[filter || property.filter](displayFromObject, ...(filterArgs || property.filterArgs)) || '-' }}
        </p>
        <p class="form-control-static" v-else-if="items && displayMode === 'VIEW' && typeof items[0] === 'object'">
            {{ displayFromObject || '-' }}
        </p>
        <p class="form-control-static" v-else-if="items && displayMode === 'VIEW' && typeof items[0] === 'string'">
            {{ clonedValue.value || '-' }}
        </p>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import VRuntimeTemplate from 'v-runtime-template';
export default {
    name: 'SelectField',
    props: {
        value: {
            type: [String, Array, Object]
        },
        label: {
            type: String
        },
        required: {
            type: Boolean
        },
        placeholder: {
            type: String
        },
        customClass: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        displayMode: {
            type: String
        },
        hideLabel: {
            type: Boolean
        },
        filter: {
            type: String
        },
        filterArgs: {
            type: Array,
            default: () => []
        },
        displayField: {
            type: String
        },
        valueField: {
            type: String
        },
        fullObject: {
            type: Boolean
        },
        searchable: {
            type: [Boolean, String]
        },
        multiple: {
            type: [Boolean, String]
        },
        allowClear: {
            type: Boolean
        },
        showAvatar: {
            type: Boolean
        },
        avatarProp: {
            type: String
        },
        optionTemplate: {
            type: String
        },
        selectFrom: {
            type: [Object, Array]
        },
        property: {
            type: Object
        },
        attrs: {
            type: Object
        }
    },
    components: {
        Multiselect,
        VRuntimeTemplate
    },
    data() {
        return {
            clonedValue: {},
            selected: []
        };
    },
    methods: {
        clearSelected() {
            this.selected = undefined;
            this.handler();
        },
        handler() {
            let clonedValue = { ...this.clonedValue };
            if (this.fullObject) {
                clonedValue.value = this.selected;
            } else {
                clonedValue.value = typeof this.selected === 'object' ? this.selected[this.valueField || '_id'] : this.selected;
            }
            this.clonedValue = clonedValue;
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if (this.property) {
                if ((this.required || this.property.required) && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                }
            }
        }
    },
    computed: {
        items() {
            return this.selectFrom ?? this.property?.enum ?? [];
        },
        displayFromObject() {
            let result;
            if (this.selectFrom.length) {
                result = this.selectFrom.find(item => item[this.valueField || '_id'] === this.clonedValue.value);
                return result ? result[this.displayField || 'Name'] : undefined;
            }
            return '';
        }
    },
    watch: {
        selectFrom: {
            handler: function(newVal) {
                if (newVal.length > 0 && typeof newVal[0] === 'object') {
                    this.selected = newVal.find(item => item[this.valueField || '_id'] === (typeof this.selected === 'object' ? this.selected[this.valueField || '_id'] : this.selected));
                } else if (newVal.length === 0) {
                    this.selected = undefined;
                }
            },
            deep: true
        }
    },
    created() {
        if (this.selectFrom && this.selectFrom.length && typeof this.selectFrom[0] === 'object') {
            // check if any external objects exist in the list  via select from
            if (this.value) {
                this.selected = this.selectFrom.find(item => item[this.valueField || '_id'] === this.value);
            } else if (this.property && this.property.value) {
                this.selected = this.selectFrom.find(item => item[this.valueField || '_id'] === this.property.value);
            } else {
                this.selected = undefined;
            }
        } else {
            // else treat the value as string
            if (this.value) {
                this.selected = this.value;
            } else if (this.property?.value) {
                this.selected = this.property.value;
            } else {
                this.selected = undefined;
            }
        }
        this.handler();
    }
};
</script>
<style lang="scss" scoped>
.profile {
    display: inline-block;
    margin-right: 8px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
}
</style>
