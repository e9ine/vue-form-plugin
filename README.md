# vue-form-plugin
[https://components9.firebaseapp.com/vue2/models/](https://components9.firebaseapp.com/vue2/models/)
## Installation
```
npm install --save @e9ine/vue-form-plugin 
```

## Usage

1. For full usage, you can use the plugin without passing any options like below :

```vue
    import Vue from 'vue';
    import VueFormPlugin from '@e9ine/vue-form-plugin';
    Vue.use(VueFormPlugin);
```

2. You can also pass options in case you don't want to use a parent Form Wrapper `<FormFor>` or `<SubFormFor>`.

```vue
    import Vue from 'vue';
    import VueFormPlugin from '@e9ine/vue-form-plugin';
    Vue.use(VueFormPlugin, {
        formFor: false,
        subFormFor: false
    });
```

3. Tree shaking individual component import : You can individually import the components locally within your components.
```vue
    import FieldFor from '@e9ine/vue-form-plugin/src/lib/FieldFor';
```

## Examples

There are two ways to build forms with this plugin.

1. Custom Usage with only FieldFor: 
- type, value, label and displayMode props are required for this form scheme.
- This is a minimal setup required to display fields within forms. For error mechanism, you will have to handle it externally through computed properties.
```vue
    <FieldFor type="Text" :value.sync="name" label="Name" display-mode="EDIT"></FieldFor>
```

2. Using FormFor
- This way is a more recommended way to use forms since it additionally gives you features to check if form is valid or not, error mechanism etc.
- <FormFor> component acts as a parent to all its <FieldFor> children and tracks the incoming and outgoing data by processing the events.
- Technically you have to pass the schema of the form and rest is taken care by the plugin. An Example is available below. 
```vue
    <FormFor :data="address" :model="Address" display-mode="EDIT">
        <FieldFor field="Line1"></FieldFor>
        <FieldFor field="Line2"></FieldFor>
    </FormFor>
```
- Full documentation is available [here](https://components9.firebaseapp.com/vue2/models/)

