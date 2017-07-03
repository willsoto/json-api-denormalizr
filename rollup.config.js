import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'src/index.js',
  moduleName: 'json-api-denormalizr',
  format: 'umd',
  dest: 'dist/index.js',
  external: ['lodash'],
  globals: {
    lodash: '_'
  },
  sourceMap: true,
  plugins: [
    eslint(),
    babel({
      babelrc: false,
      presets: [
        'stage-2',
        [
          'env',
          {
            targets: {
              browsers: ['last 2 versions']
            },
            modules: false
          }
        ]
      ],
      plugins: ['external-helpers']
    }),
    uglify(),
    filesize()
  ].filter(plugin => !!plugin)
};
