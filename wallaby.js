/* eslint-disable func-names */
module.exports = function(wallaby) {
  return {
    files: [
      {
        pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
        instrument: false,
      },
      'src/**/*.js',
    ],

    tests: ['test/**/*.spec.js'],

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },
  }
}
