<template>
    <div>
        <template v-if="$slots.label">
            <slot name="label"></slot>
        </template>
        <label v-else class="control-label" :for="attrs.id || label || property.name" v-text="label || property.name" v-show="!hideLabel"></label>
        <div class="form-element" v-if="displayMode === 'EDIT' || displayMode === 'CREATE'">
            <input type="text" :class="customClass" :name="attrs.name || label" :id="attrs.id || label || property.name" :required="required" autocomplete="off" :placeholder="placeholder" v-model="clonedValue.value" @input="handler" class="form-control" :disabled="disabled" @focusin="toggleSuggestion(true)" @focusout="toggleSuggestion(false)" @keydown.tab="setValue" v-bind="attrs" />
            <div class="intellisense" v-if="showSuggestion" :class="{ visible: filteredSuggestion && clonedValue.value && isOpen }" @click="setValue">
                {{ filteredSuggestion }}
            </div>
            <div class="intellisense-help" v-if="showSuggestion && filteredSuggestion"><i class="material-icons">keyboard_tab</i>{{ filteredSuggestion ? 'Press Tab to Select' : '' }}</div>
        </div>
        <template v-if="$slots.view && displayMode === 'VIEW'">
            <slot name="view"></slot>
        </template>
        <p class="form-control-static" v-else-if="(displayMode === 'VIEW' && property.filter) || filter">{{ $options.filters[filter || property.filter](clonedValue.value, ...(filterArgs || property.filterArgs)) }}</p>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW'" v-text="clonedValue.value || '-'"></p>
    </div>
</template>

<script>
export default {
    name: 'Textfield',
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
        showSuggestion: {
            type: Boolean,
            default: false
        },
        suggestions: {
            type: Array
        },
        regex: {
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
            },
            filteredSuggestion: null,
            isOpen: false
        };
    },
    methods: {
        handler() {
            this.validate();
            this.$emit('updateValue', this.clonedValue);
            if (this.showSuggestion) {
                let found = this.suggestions.find(item => this.clonedValue.value && item.match(this.clonedValue.value) && this.clonedValue.value.length >= 2);
                this.filteredSuggestion = found ? found : '';
            }
        },
        toggleSuggestion(val) {
            this.isOpen = val;
            if (!val) {
                this.filteredSuggestion = null;
            }
        },
        setValue() {
            if (this.suggestions && this.filteredSuggestion) {
                this.clonedValue.value = this.filteredSuggestion;
                this.handler();
                this.isOpen = false;
            }
        },
        validate() {
            if (this.property) {
                if ((this.required ?? this.property.required) && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                    // eslint-disable-next-line
                } else if (this.property.email && !/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(this.clonedValue.value)) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'email';
                } else if (this.property.regex && !this.clonedValue.value.test(this.property.regex)) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'regex';
                } else if (this.regex && !this.clonedValue.value.test(this.regex)) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'regex';
                } else if (this.property.maxlength && (!this.clonedValue.value || this.clonedValue.value > this.property.maxlength)) {
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
