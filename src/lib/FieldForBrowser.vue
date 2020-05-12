<template>
    <div class="form-group" :class="[{ 'form-filled': value !== undefined && showValidationIndicators }, { 'form-error': touched && invalid && showValidationIndicators }, { 'form-success': touched && !invalid && showValidationIndicators }]">
        <component :is="component" v-bind="$props" :attrs="$attrs" :value="value" :display-mode="displayMode ? displayMode : $parent.displayMode" :property="property" @updateValue="sendValue" @touched="touched = true">
            <template v-slot:label v-if="$slots.label">
                <slot name="label"></slot>
            </template>
            <template v-slot:view v-if="$slots.view">
                <slot name="view"></slot>
            </template>
        </component>
        <p class="validation-message" v-if="property && invalid && $parent.displayMode !== 'VIEW'">
            {{ validationMessage }}
        </p>
    </div>
</template>

<script>
import { FieldMixin } from '../mixins/field';
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
    mixins: [FieldMixin],
    methods: {
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
    created() {
        // Custom way
        if (this.type) {
            this.component = mapping[this.type];
        } else if (this.schema) {
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
