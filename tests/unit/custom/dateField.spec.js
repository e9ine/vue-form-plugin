import { mount } from '@vue/test-utils';
import DateField from '@/lib/DateField';
import flatPickr from 'vue-flatpickr-component';
import moment from 'moment';
import Vue from 'vue';
require('../../filters');

describe('DateField.vue', () => {
    let wrapper;
    afterEach(() => {
        wrapper.destroy();
    });

    it('should render date picker component when type is set to DateField', async () => {
        wrapper = mount(DateField, {
            propsData: {
                label: 'Birthdate',
                value: new Date(),
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find(flatPickr).exists()).toBe(true);
    });

    it('should render date picker component when type is set to DateField', async () => {
        const currentTime = new moment().format('DD/MM/YYYY');
        wrapper = mount(DateField, {
            propsData: {
                label: 'Birthdate',
                value: currentTime,
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find(flatPickr).vm.$props.value).toBe(currentTime);
        expect(wrapper.vm.$data.formattedValue).toBe(currentTime);
    });

    it('should render p tag in view mode', async () => {
        wrapper = mount(DateField, {
            propsData: {
                label: 'Birthdate',
                value: new Date(),
                displayMode: 'VIEW',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.form-control-static').text()).toBe(new moment().format('DD/MM/YYYY'));
    });

    it('should render hyphen in p tag when no value in view mode', async () => {
        wrapper = mount(DateField, {
            propsData: {
                label: 'Birthdate',
                displayMode: 'VIEW',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.form-control-static').text()).toBe('-');
    });

    it('should render the placeholder when placeholder is passed in the options', async () => {
        wrapper = mount(DateField, {
            propsData: {
                label: 'Birthdate',
                placeholder: 'Choose your birth date',
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('input').attributes('placeholder')).toBe('Choose your birth date');
    });

    it('should show the label with proper value when label is passed in the options', async () => {
        wrapper = mount(DateField, {
            propsData: {
                label: 'Birth date',
                placeholder: 'Choose your birth date',
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').text()).toBe('Birth date');
    });

    it('should hide the label when hide-label option is true in the options', async () => {
        wrapper = mount(DateField, {
            propsData: {
                label: 'Birthdate',
                placeholder: 'Choose your birth date',
                hideLabel: true,
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').element.style.display).toBe('none');
    });
});
