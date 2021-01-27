<template>
    <div>
        <template v-if="$slots.label">
            <slot name="label"></slot>
        </template>
        <label v-else class="control-label" :for="label || property.name" v-text="label || property.name" v-show="!hideLabel"></label>
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'" class="form-element">
            <div v-if="typeof items[0] === 'object'" class="multiple">
                <multiselect v-model="selected" :options="items" :class="customClass" :style="customStyle" :multiple="true" :track-by="valueField || '_id'" :label="displayField || 'Name'" :close-on-select="true" :clear-on-select="true" :preserve-search="false" select-label="" deselect-label="" :hide-selected="true" @open="$emit('touched')" @close="handler" @remove="remove">
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
            <div v-else-if="typeof items[0] === 'string'" class="multiple">
                <multiselect v-model="selected" :options="items" :class="customClass" :style="customStyle" :multiple="true" track-by="valueField || '_id'" :label="displayField || 'Name'" :close-on-select="true" :clear-on-select="true" :preserve-search="false" select-label="" deselect-label="" :hide-selected="true" @open="$emit('touched')" @close="handler" @remove="remove"></multiselect>
            </div>
        </div>
        <template v-if="$slots.view && displayMode === 'VIEW'">
            <slot name="view"></slot>
        </template>
        <p class="form-control-static" v-else-if="selectFrom && displayMode === 'VIEW' && typeof selectFrom[0] === 'object'" v-text="displayFromObject"></p>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import VRuntimeTemplate from 'v-runtime-template';
export default {
    name: 'MultiSelectField',
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
        customStyle: {
            type: Object
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
        remove() {
            this.$nextTick(() => {
                this.handler();
            });
        },
        handler() {
            let clonedValue = { ...this.clonedValue };
            if (this.fullObject) {
                clonedValue.value = this.selected;
            } else {
                clonedValue.value = this.selected.map(item => item[this.valueField || '_id']);
            }
            this.clonedValue = clonedValue;
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if ((this.required ?? this.property?.required) && !this.clonedValue.value.length) {
                this.clonedValue.$invalid = true;
                this.clonedValue.$error = 'required';
            } else {
                this.clonedValue.$invalid = false;
                this.clonedValue.$error = null;
            }
        }
    },
    computed: {
        items() {
            return this.selectFrom || (this.property ? this.property.enum : []);
        },
        displayFromObject() {
            let result;
            if (this.selectFrom.length && !this.fullObject) {
                result = this.selectFrom.filter(item => item[this.valueField || '_id'] === this.clonedValue.value);
                return result.map(item => item[this.displayField || 'Name']).join(',');
            }
            return '';
        }
    },
    watch: {
        selectFrom: {
            handler: function(newVal) {
                if (newVal.length > 0 && typeof newVal[0] === 'object') {
                    this.selected = newVal.find(item => item._id === this.selected);
                }
            },
            deep: true
        }
    },
    created() {
        if (this.selectFrom && this.selectFrom.length && typeof this.selectFrom[0] === 'object') {
            // check if any external objects exist in the list  via select from
            if (this.value) {
                this.selected = this.selectFrom.filter(item => item[this.valueField || '_id'] === this.value);
            } else if (this.property?.value) {
                this.selected = this.selectFrom.filter(item => this.property.value.indexOf(item[this.valueField || '_id']) > -1);
            } else {
                this.selected = [];
            }
        } else {
            if (this.value) {
                this.selected = Array.isArray(this.value) ? this.value : [this.value];
            } else if (this.property?.value) {
                this.selected = Array.isArray(this.value) ? this.property.value : [this.property.value];
            } else {
                this.selected = [];
            }
        }
        this.handler();
    }
};
</script>

<style scoped>
.profile {
    display: inline-block;
    margin-right: 8px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
}
</style>
