import { mount } from '@vue/test-utils';
import SelectField from '@/lib/SelectField';
import Vue from 'vue';
import VueMultiSelect from 'vue-multiselect';

describe('SelectField.vue', () => {
    let wrapper;
    let selectFromOptions = [
        {
            _id: '1',
            Name: 'Apple',
            Description: 'An apple is a sweet, edible fruit produced by an apple tree.',
            Vitamin: 'A'
        },
        {
            _id: '2',
            Name: 'Mango',
            Description: 'A mango is a juicy stone fruit produced from numerous species of tropical trees.',
            Vitamin: 'C',
            ImageUrl: 'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-mango.jpg'
        },
        {
            _id: '3',
            Name: 'Banana',
            Description: 'A banana is an edible fruit produced by several kinds of large herbaceous flowering plants.',
            Vitamin: 'B-6'
        }
    ];

    it('should render select field component when display-mode is edit', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                options: {
                    type: 'Select',
                    label: 'Gender'
                },
                value: 'Male',
                selectFrom: ['Male', 'Female', 'Other'],
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.multiselect').exists()).toBe(true);
        wrapper.destroy();
    });

    // General options
    it('should show the placeholder when placeholder is passed as a prop in edit mode', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                placeholder: 'Pick a value',
                selectFrom: ['Male', 'Female', 'Other'],
                value: '',
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.multiselect__placeholder').text()).toBe('Pick a value');
        wrapper.destroy();
    });

    it('should show the label when label is passed as a prop', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                placeholder: 'Pick a value',
                selectFrom: ['Male', 'Female', 'Other'],
                value: 'Male',
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').exists()).toBe(true);
        expect(wrapper.find('label').text()).toBe('Gender');
        wrapper.destroy();
    });

    it('should hide the label when hide-label prop is set', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                hideLabel: true,
                placeholder: 'Pick a value',
                selectFrom: ['Male', 'Female', 'Other'],
                value: 'Male',
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('label').element.style.display).toBe('none');
        wrapper.destroy();
    });

    it('should show filtered value when filter is used', async () => {
        require('../../filters');
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                hideLabel: true,
                placeholder: 'Pick a value',
                filter: 'propercase',
                selectFrom: ['male', 'female', 'other'],
                value: 'male',
                displayMode: 'VIEW',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').text()).toBe('Male');
        wrapper.destroy();
    });

    it('should show a hyphen if value is blank in view mode', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                selectFrom: ['male', 'female', 'other'],
                value: '',
                displayMode: 'VIEW',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('p').text()).toBe('-');
        wrapper.destroy();
    });

    it('should disable the textbox when disabled prop doesnt meet the condition', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                disabled: true,
                placeholder: 'Pick a value',
                filter: 'propercase',
                selectFrom: ['male', 'female', 'other'],
                value: 'male',
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        const classList = wrapper.find('.multiselect').element.classList;
        expect(classList).toContain('multiselect--disabled');
        wrapper.destroy();
    });

    it('should show search box when searchable is set to true in options', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                placeholder: 'Pick a value',
                filter: 'propercase',
                searchable: true,
                selectFrom: ['male', 'female', 'other'],
                value: 'male',
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        const multiSelectEl = wrapper.find(VueMultiSelect).vm.$el;
        multiSelectEl.dispatchEvent(new window.Event('focus'));
        await Vue.nextTick();
        let result = wrapper.find('.multiselect__input').exists();
        expect(result).toBe(true);
    });

    /************************************************************/
    /**** Common funcs betweem String/Objects as select-from ****/
    /************************************************************/

    it('should render p tag with selected value when display-mode is view and select-from is array of strings', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                value: 'Male',
                selectFrom: ['Male', 'Female', 'Other'],
                displayMode: 'VIEW',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.form-control-static').exists()).toBe(true);
        expect(wrapper.find('.form-control-static').text()).toBe('Male');
        wrapper.destroy();
    });
    it('should set the selected variable as per the value when value prop is passed and select-from is array of strings', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                value: 'Male',
                selectFrom: ['Male', 'Female', 'Other'],
                displayMode: 'VIEW',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.vm.$data.selected).toBe('Male');
        expect(wrapper.vm.$data.selected).toBe(wrapper.vm.$data.clonedValue.value);
        wrapper.destroy();
    });
    it('should change the selectFrom asynchronously and same should be visible in the component', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                searchable: false,
                value: '',
                selectFrom: ['Male', 'Female'],
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        const multiSelectEl = wrapper.find(VueMultiSelect).vm.$el;
        multiSelectEl.dispatchEvent(new window.Event('focus'));
        await Vue.nextTick();
        expect(wrapper.findAll('.multiselect__element')).toHaveLength(2);
        wrapper.setProps({
            selectFrom: ['Male', 'Female', 'Other']
        });
        await Vue.nextTick();
        expect(wrapper.findAll('.multiselect__element')).toHaveLength(3);
    });

    it('should remove the current selected value when allow-clear is true and clear sign is clicked - value is string', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Gender',
                searchable: false,
                allowClear: true,
                value: 'Male',
                selectFrom: ['Male', 'Female', 'Other'],
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        const selectWrapper = wrapper.find(SelectField);
        expect(selectWrapper.vm.$data.selected).toBeTruthy();
        expect(selectWrapper.vm.$data.clonedValue.value).toBeTruthy();

        //Click on clear button
        const clearEl = selectWrapper.find('.allowclear');
        expect(clearEl.exists()).toBe(true);
        clearEl.trigger('click');
        await Vue.nextTick();
        expect(selectWrapper.vm.$data.selected).toBe(undefined);
        expect(selectWrapper.vm.$data.clonedValue.value).toBe(undefined);
        wrapper.destroy();
    });

    /************************************************************/
    /*************** Array of Objects select-from ***************/
    /************************************************************/

    it('should iterate over the objects and show default Name and Description property in the options', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Fruit',
                searchable: false,
                value: '',
                selectFrom: selectFromOptions,
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        const nameElements = wrapper.find(VueMultiSelect).findAll('.multiselect__element .description .title');
        const descElements = wrapper.find(VueMultiSelect).findAll('.multiselect__element .description .text-muted');
        for (let i = 0; i < selectFromOptions.length; i++) {
            expect(nameElements.at(i).text()).toBe(selectFromOptions[i].Name);
            expect(descElements.at(i).text()).toBe(selectFromOptions[i].Description);
        }
        wrapper.destroy();
    });

    it('should show iterate over the objects and show avatar in the options if show-avatar is true', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Fruit',
                searchable: false,
                showAvatar: true,
                avatarProp: 'ImageUrl',
                value: '',
                selectFrom: selectFromOptions,
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        const avatarElements = wrapper.find(VueMultiSelect).findAll('.profile');
        expect(avatarElements).toHaveLength(3);
        expect(avatarElements.at(1).element.style.backgroundImage).toBe(`url(${selectFromOptions[1].ImageUrl})`);
        wrapper.destroy();
    });

    it('should honour the display-field property and show the value of that property as match in selected item', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Fruit',
                searchable: false,
                displayField: 'Vitamin',
                value: selectFromOptions[0]._id,
                selectFrom: selectFromOptions,
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        expect(wrapper.find('.multiselect__single').text()).toBe(selectFromOptions[0].Vitamin);
        wrapper.setProps({
            displayMode: 'VIEW'
        });
        await Vue.nextTick();
        expect(wrapper.find('p.form-control-static').text()).toBe(selectFromOptions[0].Vitamin);
        wrapper.destroy();
    });

    it('should honour the value-field property and bind the value of that property in dropdown value', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Fruit',
                searchable: false,
                valueField: 'Vitamin',
                value: '',
                selectFrom: selectFromOptions,
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        wrapper
            .find(VueMultiSelect)
            .find('.multiselect__option')
            .trigger('click');
        await Vue.nextTick();
        wrapper.find(VueMultiSelect).vm.$emit('close');
        await Vue.nextTick();
        expect(wrapper.vm.$data.clonedValue.value).toBe(selectFromOptions[0].Vitamin);
        wrapper.destroy();
    });

    it('should bind the whole object to the dropdown value when full-object is true', async () => {
        wrapper = mount(SelectField, {
            propsData: {
                type: 'Select',
                label: 'Fruit',
                searchable: false,
                fullObject: true,
                value: '',
                selectFrom: selectFromOptions,
                displayMode: 'EDIT',
                property: {},
                attrs: {}
            }
        });
        await Vue.nextTick();
        wrapper
            .find(VueMultiSelect)
            .find('.multiselect__option')
            .trigger('click');
        await Vue.nextTick();
        wrapper.find(VueMultiSelect).vm.$emit('close');
        await Vue.nextTick();
        expect(wrapper.vm.$data.selected).toBe(selectFromOptions[0]);
        expect(wrapper.vm.$data.clonedValue.value).toBe(selectFromOptions[0]);
        wrapper.destroy();
    });
});
