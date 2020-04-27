<template>
    <div class="checkbox">
        <label class="control-label" v-text="attrs.id || label || property.name" v-show="!hideLabel"></label>
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
                value: this.value !== undefined ? this.value : this.property.value !== undefined ? this.property.value : false
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

<style lang="scss" scoped>
.check {
    display: none;
}

.check,
.check:after,
.check:before,
.check *,
.check *:after,
.check *:before,
.check + label.check-label {
    box-sizing: border-box;
}

.check::selection,
.check:after::selection,
.check:before::selection,
.check *::selection,
.check *:after::selection,
.check *:before::selection,
.check + label.check-label::selection {
    background: none;
}

.check + label.check-label {
    outline: 0;
    display: block;
    margin-top: 5px;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    user-select: none;
    text-align: left;
}

.check + label.check-label:after,
.check + label.check-label:before {
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
}

.check + label.check-label:after {
    left: 0;
}

.check + label.check-label:before {
    display: none;
}

.check:checked + label.check-label:after {
    left: 50%;
}

.check + label.check-label {
    background: $form-light-grey;
    border-radius: 2em;
    padding: 2px;
    transition: all 0.4s ease;
}

.check + label.check-label:after {
    border-radius: 50%;
    background: #fff;
    transition: all 0.2s ease;
}

.check:checked + label.check-label {
    background: $form-primary;
}

.check:disabled + label {
    opacity: 0.6 !important;
}
</style>
