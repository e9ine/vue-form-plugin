export const FieldMixin = {
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
    }
};
