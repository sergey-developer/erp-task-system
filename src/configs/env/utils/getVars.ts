import { MaybeUndefined } from 'shared/interfaces/utils'

type EnvVars = {
  NODE_ENV: MaybeUndefined<string>
  REACT_APP_API_URL: MaybeUndefined<string>
}

export type GetVarsResult = EnvVars

const getVars = (): GetVarsResult => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  }
}

export default getVars
