import { createLocalVue, mount } from '@vue/test-utils';
import FieldFor from '@/lib/FieldFor';
import Vue from 'vue';
import VueTelInput from 'vue-tel-input';

describe('PhoneField.vue', () => {
    let wrapper;
    afterEach(() => {
        wrapper.destroy();
    });
    it('does render vue tel input when type is Phone', async () => {
        const localVue = createLocalVue();
        localVue.use(VueTelInput);
        wrapper = mount(FieldFor, {
            localVue,
            propsData: {
                value: '',
                displayMode: 'EDIT',
                type: 'Phone'
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.vue-tel-input').exists()).toBe(true);
    });
});
