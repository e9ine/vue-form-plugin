<template>
    <div>
        <label class="control-label" :for="attrs.id || label || property.name" v-text="label || property.name" v-show="!hideLabel"></label>
        <div class="form-element" v-if="displayMode === 'CREATE' || displayMode === 'EDIT'">
            <textarea :name="attrs.name || label" :id="attrs.id || label || property.name" :class="customClass" :required="required" :placeholder="placeholder" :disabled="disabled" :rows="rows || (property && property.textarea) || 3" v-model="clonedValue.value" @input="handler" class="form-control" v-bind="attrs"></textarea>
        </div>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW' && (property.filter || filter)">{{ $options.filters[filter || property.filter](clonedValue.value, ...(filterArgs || property.filterArgs)) }}</p>
        <p class="form-control-static pre" v-text="clonedValue.value || '-'" v-else-if="displayMode === 'VIEW'"></p>
    </div>
</template>

<script>
export default {
    name: 'Textareafield',
    props: {
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
        rows: {
            type: Number
        },
        property: {
            type: Object
        },
        attrs: {
            type: Object
        }
    },
    data() {
        return {
            clonedValue: {
                value: this.value || this.property.value
            }
        };
    },
    methods: {
        handler() {
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if (this.property) {
                if ((this.required || this.property.required) && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else if (this.property.regex && this.property.regex.test(this.clonedValue.value)) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'regex';
                } else if (this.property.maxlength && (!this.clonedValue.value || this.clonedValue.value.length > this.property.maxlength)) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'length';
                } else {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                }
            }
        }
    },
    created() {
        this.handler();
    }
};
</script>
<style scoped>
.pre {
    white-space: pre;
}
</style>
