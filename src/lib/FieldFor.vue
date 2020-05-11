<template>
    <div class="form-group">
        <component :is="component" v-bind="$props" :attrs="$attrs" :value="value" :display-mode="displayMode ? displayMode : $parent.displayMode" :property="property" @updateValue="sendValue">
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

export default {
    name: 'FieldFor',
    mixins: [FieldMixin],
    methods: {
        // Custom Way
        loadFieldComponentFromType() {
            return () => import('./' + this.type + 'Field.vue');
        },
        // Model service way
        loadFieldComponentFromModel() {
            if (this.property.type.name === 'String') {
                if (this.property.textarea || this.rows) return () => import('./TextareaField.vue');
                else if (this.selectFrom && this.multiple) return () => import('./MultiSelectField.vue');
                else if (this.property.enum || this.selectFrom) return () => import('./SelectField.vue');
                else if (this.property.phone || this.phone) return () => import('./PhoneField.vue');
                return () => import('./TextField.vue');
            } else if (this.property.type.name === 'Number') {
                return () => import('./NumberField.vue');
            } else if (this.property.type.name === 'Boolean') {
                return () => import('./BooleanField.vue');
            } else if (this.property.type.name === 'Date' || this.property.type.name === 'moment') {
                return () => import('./DateField.vue');
            } else if (this.property.type.name === 'Array') {
                return () => import('./MultiSelectField.vue');
            }
        }
    },
    created() {
        // Custom way
        if (this.type) {
            this.component = this.loadFieldComponentFromType();
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
            this.component = this.loadFieldComponentFromModel();
        }
    }
};
</script>
