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
      configs: resolvePath('./src/configs'),
      modules: resolvePath('./src/modules'),
      components: resolvePath('./src/components'),
      state: resolvePath('./src/state'),
      shared: resolvePath('./src/shared'),
      app: resolvePath('./src/app'),
      styles: resolvePath('./src/styles'),
    },
  },
}
