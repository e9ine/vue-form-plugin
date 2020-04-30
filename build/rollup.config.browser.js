import { terser } from 'rollup-plugin-terser';
import base from './rollup.config.base';
import resolve from 'rollup-plugin-node-resolve';

const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'VueFormPlugin',
        file: 'dist/vue-form-plugin.min.js',
        format: 'iife'
    }
});

config.plugins.push(terser());

config.plugins.push(
    resolve({
        mainFields: ['module', 'jsnext:main', 'main', 'browser']
    })
);

export default config;
