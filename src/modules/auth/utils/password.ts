import { passwordRegexp } from 'modules/auth/constants'

export const checkPasswordValid = (value: string): boolean =>
  passwordRegexp.test(value)
