<template>
    <div class="form-group">
        <component :is="component" v-bind="$props" :attrs="$attrs" :value="value" :display-mode="displayMode ? displayMode : $parent.displayMode" :property="property" @updateValue="sendValue"> </component>
        <p class="validation-message" v-if="property && invalid && $parent.displayMode !== 'VIEW'">
            {{ validationMessage }}
        </p>
    </div>
</template>

<script>
import BooleanField from './BooleanField.vue';
import DateField from './DateField.vue';
import MultiSelectField from './MultiSelectField.vue';
import NumberField from './NumberField.vue';
import PhoneField from './PhoneField.vue';
import SelectField from './SelectField.vue';
import TextareaField from './TextareaField.vue';
import TextField from './TextField.vue';
const mapping = {
    Boolean: BooleanField,
    Date: DateField,
    MultiSelect: MultiSelectField,
    Number: NumberField,
    Phone: PhoneField,
    Select: SelectField,
    Textarea: TextareaField,
    Text: TextField
};
export default {
    name: 'FieldFor',
    props: {
        // standard props
        field: {
            type: String
        },
        type: {
            type: String
        },
        value: {},
        label: {
            type: String
        },
        required: {
            type: [String, Boolean]
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
        regex: {
            type: String
        },
        showSuggestion: {
            type: Boolean,
            default: false
        },
        suggestions: {
            type: Array
        },
        // input[type=number]
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        prepend: {
            type: String
        },
        // textarea
        rows: {
            type: Number
        },
        // dropdown
        selectFrom: {
            type: Array
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
        // custom
        phone: {
            type: Boolean
        },
        showFlags: {
            type: Boolean
        },
        // date
        calendarConfig: {
            type: Object
        }
    },
    data() {
        return {
            component: null,
            property: {},
            error: '',
            invalid: false
        };
    },
    methods: {
        sendValue(valueObj) {
            // Model service way
            if (this.property.name) {
                this.property.value = valueObj.value;
                this.$set(this.$parent.data, this.property.name, valueObj.value);
                this.invalid = valueObj.$invalid;
                this.error = valueObj.$error;
                let found = this.$parent.errors.findIndex(err => err.name === this.property.name);
                if (found > -1) {
                    this.$parent.errors.splice(found, 1);
                }
                if (this.invalid) {
                    this.$parent.errors.push({
                        name: this.property.name,
                        error: valueObj.$error
                    });
                }
                this.$parent.invalid = this.$parent.errors.length !== 0;

                // emit the changes
                this.$emit('changed', this.property.value);
            } else {
                // if done through custom way
                this.$emit('update:value', valueObj.value);
                this.$emit('changed', valueObj.value);
            }
        },
        // Model service way
        loadFieldComponentFromModel() {
            if (this.property.type.name === 'String') {
                if (this.property.textarea || this.rows) {
                    this.component = TextareaField;
                } else if (this.selectFrom && this.multiple) {
                    this.component = MultiSelectField;
                } else if (this.property.enum || this.selectFrom) {
                    this.component = SelectField;
                } else if (this.property.phone || this.phone) {
                    this.component = PhoneField;
                } else {
                    this.component = TextField;
                }
            } else if (this.property.type.name === 'Number') {
                this.component = NumberField;
            } else if (this.property.type.name === 'Boolean') {
                this.component = BooleanField;
            } else if (this.property.type.name === 'Date' || this.property.type.name === 'moment') {
                this.component = DateField;
            } else if (this.property.type.name === 'Array') {
                this.component = MultiSelectField;
            }
        }
    },
    computed: {
        validationMessage() {
            let errMsg = '';
            if (!this.error) return '';
            switch (this.error) {
            case 'email': {
                errMsg = 'Provided email is incorrect';
                break;
            }
            case 'length': {
                errMsg = 'Length of characters exceeds the allowed limit of ' + this.property.maxlength;
                break;
            }
            case 'required': {
                errMsg = (this.label || this.property.name) + ' field is a required field';
                break;
            }
            case 'regex': {
                errMsg = (this.label || this.property.name) + ' is not in the correct format';
                break;
            }
            case 'min': {
                errMsg = (this.label || this.property.name) + ' must be above ' + (this.min !== undefined ? this.min : this.property.min);
                break;
            }
            case 'max': {
                errMsg = (this.label || this.property.name) + ' must be below ' + (this.max !== undefined ? this.max : this.property.max);
                break;
            }
            default: {
                errMsg = (this.label || this.property.name) + ' is incorrect';
            }
            }
            return errMsg;
        }
    },
    created() {
        // Custom way
        if (this.type) {
            this.component = mapping[this.type];
        } else if (this.$parent.schema) {
            // Model service way
            let prop = this.$parent.schema[this.field];
            if (prop === undefined) {
                console.error(`${this.field} is not available in the schema. Please add it to your model.js in order to show a field.`);
                return;
            }
            prop.name = this.field;
            prop.value = this.$parent.$props.data ? this.$parent.$props.data[this.field] : '-';
            this.property = JSON.parse(JSON.stringify(prop));
            this.property.type = prop.type;
            this.loadFieldComponentFromModel();
        }
    }
};
</script>
