import typescript from '@rollup/plugin-typescript';

export default {
    input:   [
        'src/baidu/code.ts',
    ],
    output: {
        dir:    'src/baidu',
        format: 'iife',
    },
    plugins: [typescript({module: 'esnext'})],
};
