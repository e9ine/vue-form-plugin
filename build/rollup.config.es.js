import base from './rollup.config.base';

const config = Object.assign({}, base, {
    output: {
        name: 'vue-form-plugin',
        file: 'dist/vue-form-plugin.esm.js',
        format: 'es'
    }
});

export default config;
