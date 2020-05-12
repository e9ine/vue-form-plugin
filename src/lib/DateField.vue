<template>
    <div>
        <template v-if="$slots.label">
            <slot name="label"></slot>
        </template>
        <label v-else class="control-label" :for="attrs.id || label || property.name" v-text="label || property.name" v-show="!hideLabel"></label>
        <div v-if="displayMode === 'EDIT' || displayMode === 'CREATE'" class="form-element">
            <flat-pickr v-model="formattedValue" :config="{ ...config, ...calendarConfig, ...property.calendarConfig }" class="form-control datepicker" :placeholder="placeholder || 'DD/MM/YYY'" ref="calendar" @click="$emit('touched')"></flat-pickr>
        </div>
        <template v-else-if="$slots.view && displayMode === 'VIEW'">
            <slot name="view"></slot>
        </template>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW' && clonedValue.value && !filter">{{ clonedValue.value | formatDate('DD/MM/YYYY') }}</p>
        <p class="form-control-static" v-else-if="displayMode === 'VIEW' && clonedValue.value && filter">{{ $options.filters[filter || property.filter](clonedValue.value, ...(filterArgs || property.filterArgs)) }}</p>
        <p class="form-control-static" v-else>-</p>
    </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import moment from 'moment/moment';
export default {
    name: 'DateField',
    props: {
        value: {
            type: [String, Date]
        },
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
        calendarConfig: {
            type: Object
        },
        property: {
            type: Object
        },
        attrs: {
            type: Object
        }
    },
    components: {
        flatPickr
    },
    filters: {
        formatDate(date, format) {
            if (!format) {
                format = 'DD/MM/YYYY HH:mm';
            }
            return date ? moment(date).format(format) : '';
        }
    },
    data() {
        let vm = this;
        return {
            clonedValue: {},
            formattedValue: null,
            config: {
                dateFormat: 'd/m/Y',
                showNonCurrentDates: false,
                onChange: () => {
                    vm.clonedValue.value = vm.$refs.calendar.fp.selectedDates[0];
                    vm.handler();
                }
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
                if ((this.required ?? this.property.required) && !this.clonedValue.value) {
                    this.clonedValue.$invalid = true;
                    this.clonedValue.$error = 'required';
                } else {
                    this.clonedValue.$invalid = false;
                    this.clonedValue.$error = null;
                }
            }
        }
    },
    created() {
        this.clonedValue.value = this.value ?? this.property?.value ?? undefined;
        this.formattedValue = this.clonedValue.value;
        this.handler();
    }
};
</script>
