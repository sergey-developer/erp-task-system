import * as login from './login'
import * as token from './tokens'

const authFixtures = {
  ...login,
  ...token,
} as const

export default authFixtures
