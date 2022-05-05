import type { ConfigFile } from '@rtk-query/codegen-openapi'
require('dotenv').config()

const config: ConfigFile = {
  schemaFile: process.env.REACT_APP_SCHEMA_FILE || '',
  apiFile: './src/shared/services/api/index.ts',
  apiImport: 'api',
  outputFile: './src/shared/services/api/api.ts',
  exportName: 'api',
  hooks: true,
}

export default config
