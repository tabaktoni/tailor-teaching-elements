'use strict';

const path = require('path');

module.exports = {
  input: {
    'tailor-teaching-elements': 'src/index.js'
  },
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'TailorTeachingElements',
    extractCSS: false
  },
  bundleNodeModules: ['style-inject', 'vue-runtime-helpers'],
  plugins: {
    vue: true,
    babel: {
      runtimeHelpers: true,
      sourceMap: true,
      extensions: ['.js', '.vue']
    },
    alias: {
      resolve: ['.vue', '.js'],
      entries: [
        { find: '@', replacement: path.resolve(__dirname, './src') }
      ]
    },
    'node-builtins': true,
    visualizer: {
      sourceMap: true,
      open: false
    }
  }
};
