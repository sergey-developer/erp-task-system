import path from 'path'
import { RetryChunkLoadPlugin } from 'webpack-retry-chunk-load-plugin'

/**
  Нужно для парсинга `*.env` файлов и записи их в `process.env`
  `create-react-app` это делает автоматически, но это происходит,
  после того как запускается `craco` на основе этого конфига
 */
require('react-scripts/config/env')

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    plugins: {
      add: [new RetryChunkLoadPlugin({ maxRetries: 3 })],
    },
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
