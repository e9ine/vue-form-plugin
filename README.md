# vue-form-plugin
Docs : [https://vue9-form-plugin.netlify.app](https://vue9-form-plugin.netlify.app)

[![Build Status](https://travis-ci.org/sharvilak11/vue-form-plugin.svg?branch=master)](https://travis-ci.org/sharvilak11/vue-form-plugin)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e3f2cb11-e545-4955-bde2-b2601ea51a40/deploy-status)](https://app.netlify.com/sites/vue9-form-plugin/deploys)

## Installation

## Full Plugin Usage

Even though vue-form-plugin is so simple, you don't really need to set import locally within each component - you can simply set it up by using the plugin on Vue instance for a better developer experience.

To set up a new instance of vue-form-plugin, and start developing just use it like below:

```js
import Vue from 'vue';
import VueFormPlugin from '@e9ine/vue-form-plugin';

Vue.use(VueFormPlugin);
```

You can also pass options if you do not plan to use FormFor in your project.

```js
import Vue from 'vue';
import VueFormPlugin from '@e9ine/vue-form-plugin';

Vue.use(VueFormPlugin, {
    formFor: false
});
```

**Note**: CSS will be auto imported in this case. No need to manually import

## Tree Shaking Usage

You can also import it separately in each component and use.

```js
import {FormFor, FieldFor} from '@e9ine/vue-form-plugin';

export default {
    components: {
        FieldFor,
        FormFor
    }
}
```
**Note**: CSS will be auto imported in this case. No need to manually import

## SFC & Dynamic import Usage

To use the dynamic import version for FieldFor, load the plugin from **src directory**. This will follow on-demand loading for each component via dynamic imports.

You will also need to manually include the scss in this case.

```js
import Vue from 'vue';
import VueFormPlugin from '@e9ine/vue-form-plugin/src';

Vue.use(VueFormPlugin); // options if any same as Full Plugin Usage
```

You can also import each component via tree shaking in your local components. This should be the preferred way if you are planning to use forms in only limited pages, suitable for websites.

```js
import {FormFor, FieldFor} from '@e9ine/vue-form-plugin/src';
```

Manually include CSS/SCSS in your style.scss. You can either import style.scss or manually pick certain scss files to be imported.

```scss
@import '~@e9ine/vue-form-plugin/src/scss/style.scss';
```

## CDN Usage (Browser)

Include [vue-form-plugin](https://unpkg.com/@e9ine/vue-form-plugin) in the page. Make sure to keep the component name in kebab case as running Vue in browser mode can't detect capitalised component names.

No need to write Vue.use line since plugin will take care of automatically getting installed in Global Vue context.

Look at a simple example below :

```html
<head>
    <title>Browser build</title>
    <script src="https://unpkg.com/vue@2.6.11/dist/vue.js"></script>
    <script src="https://unpkg.com/@e9ine/vue-form-plugin"></script>
</head>
<div id="app">
    <field-for 
            type="Number" 
            label="Counter" 
            :value.sync="counter" 
            display-mode="EDIT">
    </field-for>
</div>
<script>
    new Vue({
        el: '#app',
        data: {
            counter: 0
        }
    });
</script>
```

## CDN Usage (ESM)

```html
<script type="module">
    import Vue from "https://unpkg.com/browse/vue@2.6.11/dist/vue.esm.browser.js"
    import VueFormPlugin from  "https://unpkg.com/@e9ine/vue-form-plugin/dist/vue-form-plugin.esm.js";
</script>
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
<FormFor :data="address" display-mode="EDIT">
    <FieldFor field="Line1"></FieldFor>
    <FieldFor field="Line2"></FieldFor>
</FormFor>
```

Check out more in docs.

