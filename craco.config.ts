import path from 'path'

import theme from './src/styles/theme'

const CracoLessPlugin = require('craco-less')

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-header-height': '60px',
              '@layout-header-padding': '0px 40px',
              // @ts-ignore
              '@layout-header-background': theme.colors.white,
            },
            javascriptEnabled: true,
          },
        },
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
