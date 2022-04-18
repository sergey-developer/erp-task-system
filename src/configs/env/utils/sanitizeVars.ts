import { GetVarsResult } from './getVars'

export type SanitizedVars = {
  NODE_ENV: string
  REACT_APP_API_URL: string
}

const sanitizeVars = (envVars: GetVarsResult): SanitizedVars => {
  for (const [key, value] of Object.entries(envVars)) {
    if (value === undefined) {
      throw new Error(`Missing key "${key}" in process.env`)
    }
  }

  return envVars as SanitizedVars
}

export default sanitizeVars
