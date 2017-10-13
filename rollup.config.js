import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import {
    minify
} from 'uglify-es';

export default {
    input: `src/index.js`,
    name: `eleanor`,
    output: {
        file: `dist/index.js`,
        format: `umd`
    },
    plugins: [
        babel({
            exclude: `node_modules/**`
        }),
        nodeResolve({}),
        commonjs({
            include: `node_modules/**`,
            sourceMap: false
        }),
        uglify({}, minify)
    ]
};
