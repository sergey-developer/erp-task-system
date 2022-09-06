import path from 'path'

const CracoAntDesignPlugin = require('craco-antd')

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: resolvePath('./src/styles/customTheme.less'),
      },
    },
  ],
  webpack: {
    alias: {
      lib: resolvePath('./src/lib'),
      configs: resolvePath('./src/configs'),
      modules: resolvePath('./src/modules'),
      components: resolvePath('./src/components'),
      state: resolvePath('./src/state'),
      shared: resolvePath('./src/shared'),
      styles: resolvePath('./src/styles'),
      app: resolvePath('./src/app'),
      _tests_: resolvePath('./src/_tests_'),
      _fixtures_: resolvePath('./src/_fixtures_'),
    },
  },
}
