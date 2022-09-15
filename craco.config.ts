import path from 'path'

import { when } from '@craco/craco'

require('react-scripts/config/env')

const CracoAntdPlugin = require('craco-antd')

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  plugins: [
    {
      plugin: CracoAntdPlugin,
      options: {
        customizeThemeLessPath: resolvePath('src/styles/customTheme.less'),
      },
    },
  ],
  ...when(process.env.REACT_APP_ENVIRONMENT === 'production', () => ({
    babel: {
      plugins: ['babel-plugin-jsx-remove-data-test-id'],
    },
  })),
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
