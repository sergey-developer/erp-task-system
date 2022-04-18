import _reduce from 'lodash/reduce'

import getVars from './utils/getVars'
import sanitizeVars, { SanitizedVars } from './utils/sanitizeVars'

const envVars = getVars()
const sanitizedEnvVars = sanitizeVars(envVars)

type EnvConfig = {
  env: SanitizedVars['NODE_ENV']
  apiUrl: SanitizedVars['REACT_APP_API_URL']
}

const configKeysMap: Record<keyof SanitizedVars, keyof EnvConfig> = {
  NODE_ENV: 'env',
  REACT_APP_API_URL: 'apiUrl',
}

const config = _reduce(
  Object.keys(sanitizedEnvVars),
  (acc, rawKey) => {
    const envKey = rawKey as keyof SanitizedVars
    const value = sanitizedEnvVars[envKey]
    const key = configKeysMap[envKey]

    if (acc[key]) {
      throw new Error(`Environment variable "${envKey}" is set twice`)
    } else {
      acc[key] = value
    }

    return acc
  },
  {} as EnvConfig,
)

export default config
