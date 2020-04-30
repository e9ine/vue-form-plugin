import { mount } from '@vue/test-utils';
import FieldFor from '@/lib/FieldFor';
import Vue from 'vue';

describe('BooleanField.vue', () => {
    let wrapper;
    afterEach(() => {
        wrapper.destroy();
    });
    it('should render toggle component with label and a hidden input checkbox', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: true,
                type: 'Boolean',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.checkbox').exists()).toBe(true);
        expect(wrapper.find('.check').exists()).toBe(true);
    });

    it('should render toggle component in disabled state when mode is view', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: true,
                type: 'Boolean',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.check').attributes('disabled')).toBe('disabled');
    });

    it('should render toggle component in disabled state in edit mode when disabled prop is set to true', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: true,
                type: 'Boolean',
                displayMode: 'EDIT',
                disabled: true
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.check').attributes('disabled')).toBe('disabled');
    });

    it('should turn on the toggle after it is set during edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: false,
                type: 'Boolean',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        const checkboxInput = wrapper.find('.check');
        checkboxInput.setChecked();
        await Vue.nextTick();
        expect(wrapper.emitted('changed')).toStrictEqual([[true]]);
    });

    it('should show the label when label is passed as a prop', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: true,
                label: 'Active',
                type: 'Boolean',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        const labelElement = wrapper.find('label');
        expect(labelElement.exists()).toBe(true);
        expect(labelElement.text()).toBe('Active');
    });

    it('should have same value for check-label[for] and input[id]', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: true,
                label: 'Active',
                type: 'Boolean',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.check-label').attributes('for')).toBeTruthy();
        expect(wrapper.find('.check-label').attributes('for')).toBe(wrapper.find('.check').attributes('id'));
    });
});
