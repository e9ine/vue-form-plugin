/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
import analyze from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import cjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';

const config = require('../package.json');

export default {
    input: 'src/index.js',
    plugins: [
        vue({
            css: true
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
        }),
        cjs(),
        replace({
            VERSION: JSON.stringify(config.version)
        }),
        postcss(),
        analyze()
    ],
    watch: {
        include: 'src/**'
    }
};
