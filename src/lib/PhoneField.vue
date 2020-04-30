<template>
    <div class="form-group">
        <label class="control-label" :for="$attrs.id || label || property.name" v-text="label || property.name" v-if="label || property.name" v-show="!hideLabel"></label>
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'" class="form-element">
            <vue-tel-input :enabled-flags="showFlags" :dynamic-placeholder="true" default-country="GB" :disabled-fetching-country="true" v-model="clonedValue.value" @input="handler" class="form-control" :country-changed="handler" :class="customClass"></vue-tel-input>
        </div>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW'">{{ clonedValue.value ? clonedValue.value : '-' }}</p>
    </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
export default {
    name: 'Phonefield',
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
        showFlags: {
            type: Boolean,
            default: true
        },
        property: {
            type: Object
        },
        attrs: {
            type: Object
        }
    },
    components: {
        VueTelInput
    },
    data() {
        return {
            clonedValue: {
                value: this.value || (this.property ? this.property.value : undefined)
            }
        };
    },
    methods: {
        handler(val, obj) {
            this.validate(val, obj);
            this.$emit('updateValue', this.clonedValue);
        },
        validate(val, obj) {
            if (this.property) {
                if (this.property.required && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else if (!this.property.required && !this.clonedValue.value) {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                } else if (obj && !obj.isValid) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'phone';
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
