<template>
    <div>
        <label class="control-label" :for="$attrs.id || options.label || property.name" v-text="options.label || property.name" v-show="!options.hideLabel"></label>
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'" class="form-element">
            <div v-if="typeof items[0] === 'object'" class="single">
                <span class="allowclear" v-if="options.allowClear && displayMode !== 'VIEW' && clonedValue.value" @click="clearSelected">
                    <i class="material-icons">close</i>
                </span>
                <multiselect v-model="selected" :options="items" open-direction="bottom" :track-by="options.valueField || '_id'" :label="displayField || 'Name'" :searchable="!!options.searchable" :close-on-select="true" select-label="" deselect-label="" :hide-selected="true" :disabled="options.disabled" :placeholder="options.placeholder" :allow-empty="options.allowClear" @close="handler">
                    <template slot="option" slot-scope="props">
                        <div v-if="options.optionTemplate && options.optionTemplate.length > 0 && props && props.option">
                            <v-runtime-template :template="options.optionTemplate" :template-props="{ props }"></v-runtime-template>
                        </div>
                        <div v-else class="d-flex align-items-center">
                            <Avatar :text="props.option.Name" :image-url="props.option[options.avatarProp]" size="30" class="mr8" v-if="options.showAvatar"></Avatar>
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
                <span class="allowclear" v-if="options.allowClear && displayMode !== 'VIEW' && clonedValue.value" @click="clearSelected">
                    <i class="material-icons">close</i>
                </span>
                <multiselect v-model="selected" :options="items" open-direction="bottom" :searchable="!!options.searchable" :close-on-select="true" select-label="" deselect-label="" :disabled="options.disabled" :hide-selected="true" :placeholder="options.placeholder" @close="handler"> </multiselect>
            </div>
        </div>
        <p class="form-control-static" v-else-if="items && displayMode === 'VIEW' && typeof items[0] === 'string' && (property.filter || options.filter)">
            {{ $options.filters[options.filter || property.filter](clonedValue.value, ...$options.filterArgs) || '-' }}
        </p>
        <p class="form-control-static" v-else-if="items && displayMode === 'VIEW' && typeof items[0] === 'object' && (property.filter || options.filter)">
            {{ $options.filters[options.filter || property.filter](displayFromObject, ...$options.filterArgs) || '-' }}
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
import Avatar from './Avatar';
import Multiselect from 'vue-multiselect';
import VRuntimeTemplate from 'v-runtime-template';
export default {
    name: 'SelectField',
    props: {
        options: {
            type: Object
        },
        value: {
            type: [String, Array, Object]
        },
        displayMode: {
            type: String
        },
        property: {
            type: Object
        },
        selectFrom: {
            type: [Object, Array]
        }
    },
    components: {
        Avatar,
        Multiselect,
        VRuntimeTemplate
    },
    data() {
        return {
            clonedValue: {},
            displayField: '',
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
            if (this.options.fullObject) {
                clonedValue.value = this.selected;
            } else {
                clonedValue.value = typeof this.selected === 'object' ? this.selected[this.options.valueField || '_id'] : this.selected;
            }
            this.clonedValue = clonedValue;
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if (this.property) {
                if ((this.options.required || this.property.required) && !this.clonedValue.value) {
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
            return this.selectFrom || (this.property ? this.property.enum : []);
        },
        displayFromObject() {
            let result;
            if (this.selectFrom.length) {
                result = this.selectFrom.find(item => item[this.options.valueField || '_id'] === this.clonedValue.value);
                return result ? result[this.displayField || 'Name'] : undefined;
            }
            return '';
        }
    },
    watch: {
        selectFrom: {
            handler: function(newVal) {
                if (newVal.length > 0 && typeof newVal[0] === 'object') {
                    this.selected = newVal.find(item => item[this.options.valueField || '_id'] === (typeof this.selected === 'object' ? this.selected[this.options.valueField || '_id'] : this.selected));
                } else if (newVal.length === 0) {
                    this.selected = undefined;
                }
            },
            deep: true
        }
    },
    created() {
        this.displayField = this.options.displayField;
        if (this.selectFrom && this.selectFrom.length && typeof this.selectFrom[0] === 'object') {
            // check if any external objects exist in the list  via select from
            if (this.value) {
                this.selected = this.selectFrom.find(item => item[this.options.valueField || '_id'] === this.value);
            } else if (this.property && this.property.value) {
                this.selected = this.selectFrom.find(item => item[this.options.valueField || '_id'] === this.property.value);
            } else {
                this.selected = undefined;
            }
        } else {
            // else treat the value as string
            if (this.value) {
                this.selected = this.value;
            } else if (this.property && this.property.value) {
                this.selected = this.property.value;
            } else {
                this.selected = undefined;
            }
        }
        this.handler();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
