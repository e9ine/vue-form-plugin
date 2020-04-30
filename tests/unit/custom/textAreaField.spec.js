import { mount } from '@vue/test-utils';
import FieldFor from '@/lib/FieldFor';
import Vue from 'vue';

describe('TextareaField.vue', () => {
    let wrapper;
    afterEach(() => {
        wrapper.destroy();
    });
    it('should exist in edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Textarea',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('textarea').exists()).toBe(true);
    });

    it('should show textarea in edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Textarea',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('textarea').exists()).toBe(true);
    });

    it('should render the p tag in view mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Textarea',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p.form-control-static').exists()).toBe(true);
    });

    it('should show the placeholder when placeholder is passed as prop in edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Textarea',
                displayMode: 'EDIT',
                placeholder: 'Start typing here...'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('textarea').attributes('placeholder')).toBe('Start typing here...');
    });

    it('should show have default 3 rows in edit mode when rows prop is not passed', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Textarea',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('textarea').attributes('rows')).toBe('3');
    });

    it('should show the number of rows when rows prop is passed in edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Textarea',
                displayMode: 'EDIT',
                rows: 4
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('textarea').attributes('rows')).toBe('4');
    });

    it('should show the number of rows when rows prop is passed in edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Textarea',
                displayMode: 'EDIT',
                rows: 4
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('textarea').attributes('rows')).toBe('4');
    });

    it('should show the label when label is passed as a prop', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                label: 'Description',
                type: 'Textarea',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').exists()).toBe(true);
    });

    it('should hide the label when hide-label prop is set', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                label: 'Description',
                type: 'Textarea',
                hideLabel: true,
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').element.style.display).toBe('none');
    });

    it('should attach the "pre" class in view mode to pre-wrap the string', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'This is a sample text \n This is a new line',
                type: 'Textarea',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').element.classList).toContain('pre');
    });

    it('should show a hyphen if value is blank in view mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                placeholder: 'Start typing here...',
                type: 'Textarea',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').text()).toBe('-');
    });
});
