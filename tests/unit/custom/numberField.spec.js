import { shallowMount } from '@vue/test-utils';
import FieldFor from '@/lib/FieldFor';
import Vue from 'vue';

describe('NumberField.vue', () => {
    let wrapper;
    afterEach(() => {
        wrapper.destroy();
    });
    it('should display number input in edit mode', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 5,
                displayMode: 'EDIT',
                type: 'Number'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('input').attributes('type')).toBe('number');
    });

    it('should show the correct value after edit', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 20,
                type: 'Number',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        wrapper.find('input').setValue(30);
        await Vue.nextTick();
        expect(wrapper.emitted('changed')).toStrictEqual([[20], [30]]);
    });

    it('should show the p tag with relevant value in view mode', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 50,
                type: 'Number',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p.form-control-static').exists()).toBe(true);
        expect(wrapper.find('p.form-control-static').text()).toBe('50');
    });

    it('should show the placeholder when placeholder is passed as a prop in edit mode', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 0,
                placeholder: 'Start typing here...',
                type: 'Number',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('input').attributes('placeholder')).toBe('Start typing here...');
    });

    it('should show the label with correct value when label prop is passed', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 40,
                label: 'Cost',
                type: 'Number',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('label').text()).toBe('Cost');
    });

    it('should hide the label when hide-label prop is set', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 0,
                label: 'Cost',
                type: 'Number',
                hideLabel: true,
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').element.style.display).toBe('none');
    });

    it('should show filtered value when filter is used', async () => {
        require('../../filters');
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 50,
                placeholder: 'Start typing here...',
                type: 'Number',
                displayMode: 'VIEW',
                filter: 'currency',
                filterArgs: ['USD']
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').text()).toBe('$50.00');
    });

    it('should show a hyphen if value is blank in view mode', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                placeholder: 'Start typing here...',
                type: 'Number',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').text()).toBe('-');
    });

    it('should show currency box with input group when currency prop is passed', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 50,
                type: 'Number',
                displayMode: 'EDIT',
                prepend: '£'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.input-group').exists()).toBe(true);
        expect(wrapper.find('.input-group-text').text()).toBe('£');
    });

    it('should show min and max attributes when min and max are passed as props', async () => {
        wrapper = shallowMount(FieldFor, {
            propsData: {
                value: 50,
                type: 'Number',
                displayMode: 'EDIT',
                min: 5,
                max: 100
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('input').attributes('min')).toBe('5');
        expect(wrapper.find('input').attributes('max')).toBe('100');
    });
});
