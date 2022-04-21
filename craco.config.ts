import path from 'path'
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
              '@layout-header-background': '#FFFFFF',
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
    },
  },
}
