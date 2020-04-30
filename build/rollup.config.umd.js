import base from './rollup.config.base';
import resolve from 'rollup-plugin-node-resolve';

const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'vue-form-plugin',
        file: 'dist/vue-form-plugin.umd.js',
        format: 'umd'
    }
});

config.plugins.push(
    resolve({
        mainFields: ['module', 'jsnext:main', 'main', 'browser']
    })
);

export default config;
