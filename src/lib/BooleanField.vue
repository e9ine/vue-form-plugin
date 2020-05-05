<template>
    <div class="checkbox">
        <template v-if="$slots.label">
            <slot name="label"></slot>
        </template>
        <label v-else class="control-label" v-text="attrs.id || label || property.name" v-show="!hideLabel"></label>
        <div class="form-element">
            <input :class="customClass" class="check" type="checkbox" :id="attrs.id || randomId" v-model="clonedValue.value" :disabled="disabled || displayMode === 'VIEW'" @change="handler" v-bind="attrs" />
            <label class="check-label" :for="randomId"></label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BooleanField',
    props: {
        value: {},
        label: {
            type: String
        },
        required: {
            type: Boolean
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
                value: this.value ?? this.property.value ?? false
            },
            randomId: Math.random()
        };
    },
    methods: {
        handler() {
            this.$emit('updateValue', this.clonedValue);
        }
    },
    watch: {
        value(newVal) {
            this.clonedValue.value = newVal;
        }
    }
};
</script>
