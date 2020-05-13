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
            type: Boolean,
            default: undefined
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
        regex: {
            type: String
        },
        email: {
            type: Boolean,
            default: undefined
        },
        showSuggestion: {
            type: Boolean,
            default: false
        },
        suggestions: {
            type: Array
        },
        showValidationIndicators: {
            type: Boolean,
            default: false
        },
        maxlength: {
            type: Number
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
    inject: {
        schema: {
            default: null
        },
        options: {
            default: null
        }
    },
    data() {
        return {
            component: null,
            property: {},
            error: '',
            invalid: false,
            touched: (this.value || (this.property && this.property.value ? this.property.value : false))
        };
    },
    methods: {
        sendValue(valueObj) {
            this.invalid = valueObj.$invalid;
            this.error = valueObj.$error;
            // Model service way
            if (this.property.name) {
                this.property.value = valueObj.value;
                this.$set(this.$parent.data, this.property.name, valueObj.value);
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
            if (!this.error) return '';
            if (this.invalid) {
                if (!this.error) {
                    this.error = 'default';
                }
                return typeof this.$messages[this.error] === 'string' ? this.$messages[this.error] : this.$messages[this.error](this.$props, this.property);
            }
        }
    }
};
