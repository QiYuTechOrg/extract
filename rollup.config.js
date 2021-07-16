import typescript from '@rollup/plugin-typescript';

export default {
    input:   [
        'src/baidu_hot/view.ts',
    ],
    output:  {
        dir:    'src/baidu_hot',
        format: 'iife',
    },
    plugins: [
        typescript({module: 'esnext'}),
    ],
};
