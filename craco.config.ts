import path from 'path'

// import babelJsxPlugin from 'babel-plugin-jsx-remove-data-test-id'

// const rewireBabelLoader = require('craco-babel-loader')
const rewireBabelLoader = require('craco-babel-loader-plugin')
const CracoAntDesignPlugin = require('craco-antd')
// const babelJsxPlugin = require('babel-plugin-jsx-remove-data-test-id')

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: resolvePath('src/styles/customTheme.less'),
      },
    },
    {
      plugin: rewireBabelLoader,
      options: {
        includes: [
          resolvePath('node_modules/babel-plugin-jsx-remove-data-test-id'),
        ],
      },
    },
  ],
  // babel: {
  //   plugins: ['babel-plugin-jsx-remove-data-test-id'],
  // },

  // babel: {
  //   presets: [],
  //   plugins: [...whenProd(() => [new babelJsxPlugin()], [])],
  // },
  webpack: {
    alias: {
      lib: resolvePath('src/lib'),
      configs: resolvePath('src/configs'),
      modules: resolvePath('src/modules'),
      components: resolvePath('src/components'),
      state: resolvePath('src/state'),
      shared: resolvePath('src/shared'),
      styles: resolvePath('src/styles'),
      app: resolvePath('src/app'),
      _tests_: resolvePath('src/_tests_'),
      _fixtures_: resolvePath('src/_fixtures_'),
    },
  },
}
