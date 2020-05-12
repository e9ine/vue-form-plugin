<template>
    <div>
        <template v-if="$slots.label">
            <slot name="label"></slot>
        </template>
        <label v-else class="control-label" :for="attrs.id || label || property.name" v-text="label || property.name" v-show="!hideLabel"></label>
        <div v-if="displayMode === 'CREATE' || displayMode === 'EDIT'" class="form-element">
            <div class="input-group">
                <div class="input-group-prepend" v-if="prepend">
                    <span class="input-group-text">{{ prepend }}</span>
                </div>
                <input type="number" :name="attrs.name || label" :id="attrs.id || label || property.name" :required="required" :placeholder="placeholder" :class="[customClass, { 'w-auto': prepend }]" :min="min" :max="max" v-model="clonedValue.value" @input="handler" @focusout="$emit('touched')" class="form-control" :disabled="disabled" v-bind="attrs" />
            </div>
        </div>
        <template v-if="$slots.view && displayMode === 'VIEW'">
            <slot name="view"></slot>
        </template>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW' && clonedValue.value === undefined">-</p>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW' && (property.filter || filter)">
            {{ $options.filters[filter || property.filter](clonedValue.value, ...(filterArgs || property.filterArgs)) }}
        </p>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW'" v-text="clonedValue.value"></p>
    </div>
</template>

<script>
export default {
    name: 'NumberField',
    props: {
        value: {},
        label: {
            type: String
        },
        required: {
            type: Boolean
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
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        prepend: {
            type: String
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
                value: this.value ?? this.property?.value ?? undefined
            }
        };
    },
    methods: {
        handler() {
            if (this.clonedValue.value && typeof this.clonedValue.value !== 'number') {
                this.clonedValue.value = Number(this.clonedValue.value);
            }
            this.validate();
            this.$emit('updateValue', this.clonedValue);
        },
        validate() {
            if (this.property) {
                if ((this.required ?? this.property.required) && !this.clonedValue.value && this.clonedValue.value !== 0) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else if (this.min !== undefined && this.clonedValue.value < this.min) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'min';
                } else if (this.max !== undefined && this.clonedValue.value > this.max) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'max';
                } else if (this.property.min !== undefined && this.clonedValue.value < this.property.min) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'min';
                } else if (this.property.max !== undefined && this.clonedValue.value > this.property.max) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'max';
                } else if (this.clonedValue.value && typeof this.clonedValue.value !== 'number') {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'regex';
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
