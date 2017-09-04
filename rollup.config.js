import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';

export default {
  input: 'src/index.js',
  name: 'json-api-denormalizr',
  output: {
    file: 'dist/index.js',
    format: 'umd'
  },
  sourcemap: true,
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
