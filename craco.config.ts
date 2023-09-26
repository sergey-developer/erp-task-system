import path from 'path'

import { when } from '@craco/craco'

/**
  Нужно для парсинга `*.env` файлов и записи их в `process.env`
  `create-react-app` это делает автоматически, но это происходит,
  после того как запускается `craco` на основе этого конфига
 */
require('react-scripts/config/env')

// const CracoAntdPlugin = require('craco-antd')

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  ...when(process.env.REACT_APP_ENVIRONMENT === 'production', () => ({
    babel: {
      plugins: ['babel-plugin-jsx-remove-data-test-id'],
    },
  })),
  webpack: {
    alias: {
      assets: resolvePath('src/assets'),
      lib: resolvePath('src/lib'),
      configs: resolvePath('src/configs'),
      modules: resolvePath('src/modules'),
      components: resolvePath('src/components'),
      state: resolvePath('src/state'),
      shared: resolvePath('src/shared'),
      styles: resolvePath('src/styles'),
      app: resolvePath('src/app'),
      _tests_: resolvePath('src/_tests_'),
    },
  },
}
