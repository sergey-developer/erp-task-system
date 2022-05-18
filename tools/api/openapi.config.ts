import path from 'path'

import type { ConfigFile } from '@rtk-query/codegen-openapi'

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const config: ConfigFile = {
  schemaFile: process.env.REACT_APP_SWAGGER_SCHEMA_URL || '',
  apiFile: path.resolve(__dirname, '../../src/shared/services/api/index.ts'),
  apiImport: 'api',
  outputFile: path.resolve(__dirname, '../../src/shared/services/api/api.ts'),
  exportName: 'api',
  hooks: true,
}

export default config
