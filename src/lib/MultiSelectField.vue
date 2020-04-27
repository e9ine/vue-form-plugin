<template>
    <div>
        <label class="control-label" :for="options.label || property.name" v-text="options.label || property.name" v-show="!options.hideLabel"></label>
        <br class="clearfix" />
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'" class="form-element">
            <div v-if="options.multiple && typeof items[0] === 'object'" class="multiple">
                <multiselect v-model="selected" :options="items" :multiple="true" track-by="_id" :label="displayField || 'Name'" :close-on-select="true" :clear-on-select="true" :preserve-search="false" select-label="" deselect-label="" :hide-selected="true" @close="handler" @remove="remove">
                    <template slot="option" slot-scope="props">
                        <Avatar :text="props.option.Name" :image-url="props.option[options.avatarProp]" size="30" class="mr8" v-if="options.showAvatar"></Avatar>
                        <div class="description">
                            <div class="title">
                                {{ props.option.Name }}
                            </div>
                            <small class="text-muted" v-if="props.option.Description">
                                {{ props.option.Description }}
                            </small>
                        </div>
                    </template>
                </multiselect>
            </div>
            <div v-else-if="typeof items[0] === 'string'" class="multiple">
                <multiselect v-model="selected" :options="items" :multiple="true" track-by="_id" :label="displayField || 'Name'" :close-on-select="true" :clear-on-select="true" :preserve-search="false" select-label="" deselect-label="" :hide-selected="true" @close="handler" @remove="remove"></multiselect>
            </div>
        </div>
        <p class="form-control-static" v-else-if="selectFrom && displayMode === 'VIEW' && typeof selectFrom[0] === 'object'" v-text="displayFromObject"></p>
    </div>
</template>

<script>
import Avatar from './Avatar';
import Multiselect from 'vue-multiselect';
export default {
    name: 'MultiSelectField',
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
        Multiselect,
        Avatar
    },
    data() {
        return {
            clonedValue: {},
            displayField: '',
            selected: []
        };
    },
    methods: {
        addTag(newTag) {
            this.clonedValue.value.push(newTag);
        },
        remove() {
            this.$nextTick(() => {
                this.handler();
            });
        },
        handler() {
            let clonedValue = { ...this.clonedValue };
            if (this.options.fullObject) {
                clonedValue.value = this.selected;
            } else {
                clonedValue.value = this.selected.map(item => item[this.options.valueField || '_id']);
            }
            this.clonedValue = clonedValue;
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if (this.property) {
                if (this.property.required && !this.clonedValue.value && !this.multiple) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else if (this.property.required && !this.clonedValue.value.length && this.multiple) {
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
            if (this.selectFrom.length && !this.options.fullObject) {
                result = this.selectFrom.filter(item => item[this.options.valueField || '_id'] === this.clonedValue.value);
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
        this.displayField = this.options.displayField;
        if (this.selectFrom && this.selectFrom.length && typeof this.selectFrom[0] === 'object') {
            // check if any external objects exist in the list  via select from
            if (this.value) {
                this.selected = this.selectFrom.filter(item => item[this.options.valueField || '_id'] === this.value);
            } else if (this.property && this.property.value) {
                this.selected = this.selectFrom.filter(item => this.property.value.indexOf(item[this.options.valueField || '_id']) > -1);
            } else {
                this.selected = [];
            }
        } else {
            if (this.value) {
                this.selected = Array.isArray(this.value) ? this.value : [this.value];
            } else if (this.property && this.property.value) {
                this.selected = Array.isArray(this.value) ? this.property.value : [this.property.value];
            } else {
                this.selected = [];
            }
        }
        this.handler();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
