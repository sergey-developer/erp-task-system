import * as login from './login'
import * as token from './token'

const authFixtures = {
  ...login,
  ...token,
} as const

export default authFixtures
