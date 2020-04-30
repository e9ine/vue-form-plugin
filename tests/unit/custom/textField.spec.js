import { mount } from '@vue/test-utils';
import FieldFor from '@/lib/FieldFor';
import Vue from 'vue';

describe('TextField.vue', () => {
    let wrapper;
    afterEach(() => {
        wrapper.destroy();
    });

    it('does textbox exist in edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Text',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('input').exists()).toBe(true);
    });

    it('does textbox show the correct value after edit', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Text',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        wrapper.find('input').setValue('DEF');
        await Vue.nextTick();
        expect(wrapper.emitted('changed')).toStrictEqual([['ABC'], ['DEF']]);
    });

    it('does render the p tag in view mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'ABC',
                type: 'Text',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p.form-control-static').exists()).toBe(true);
    });

    it('should show the placeholder when placeholder is passed as a prop in edit mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                placeholder: 'Start typing here...',
                type: 'Text',
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('input').attributes('placeholder')).toBe('Start typing here...');
    });

    it('should show the label when label is passed as a prop', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                label: 'Email',
                type: 'Text',
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
                label: 'Email',
                type: 'Text',
                hideLabel: true,
                displayMode: 'EDIT'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').element.style.display).toBe('none');
    });

    it('should show filtered value when filter is used', async () => {
        require('../../filters');
        wrapper = mount(FieldFor, {
            propsData: {
                value: 'aBCDE',
                placeholder: 'Start typing here...',
                type: 'Text',
                displayMode: 'VIEW',
                filter: 'propercase'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').text()).toBe('Abcde');
    });

    it('should show a hyphen if value is blank in view mode', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                placeholder: 'Start typing here...',
                type: 'Text',
                displayMode: 'VIEW'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').text()).toBe('-');
    });

    it('should disable the textbox when disabled prop doesnt meet the condition', async () => {
        const val = 'sharvilak@@e9ine.com';
        wrapper = mount(FieldFor, {
            propsData: {
                value: val,
                label: 'Email',
                type: 'Text',
                displayMode: 'EDIT',
                disabled: !/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(val)
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('input').attributes('disabled')).toBe('disabled');
    });

    it('should show the suggestions in edit mode when should show-suggestion and suggestions props are passed and it should select if matching suggestion is tabbed via keyboard', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                type: 'Text',
                displayMode: 'EDIT',
                showSuggestion: true,
                suggestions: ['Bathroom', 'Kitchen']
            }
        });
        await Vue.nextTick();
        wrapper.find('input').setValue('Bath');
        await Vue.nextTick();
        expect(wrapper.find('.intellisense').exists()).toBe(true);
        expect(wrapper.find('.intellisense').text()).toBe('Bathroom');
        wrapper.find('input').trigger('focusin');
        wrapper.find('input').trigger('keydown.tab');
        await Vue.nextTick();
        expect(wrapper.find('input').element.value).toBe('Bathroom');
    });

    it('should show the suggestions in edit mode when should show-suggestion and suggestions props are passed and it should keep typed string as it is if any matching suggestion is not found when tabbed via keyboard', async () => {
        wrapper = mount(FieldFor, {
            propsData: {
                value: '',
                type: 'Text',
                displayMode: 'EDIT',
                showSuggestion: true,
                suggestions: ['Bathroom', 'Kitchen']
            }
        });
        await Vue.nextTick();
        wrapper.find('input').setValue('Dining');
        await Vue.nextTick();
        expect(wrapper.find('.visible').exists()).toBe(false);
        wrapper.find('input').trigger('focusin');
        wrapper.find('input').trigger('keydown.tab');
        await Vue.nextTick();
        expect(wrapper.find('input').element.value).toBe('Dining');
    });
});
