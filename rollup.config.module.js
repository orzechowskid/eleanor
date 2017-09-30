import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import {
    minify
} from 'uglify-es';

export default {
    input: `src/index.js`,
    name: `eleanor`,
    output: {
        file: `dist/index.es.js`,
        format: `es`
    },
    plugins: [
        autoExternal(),
        babel({
            exclude: `node_modules/**`
        }),
        uglify({}, minify)
    ]
};
