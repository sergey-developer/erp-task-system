import { passwordRegexp } from 'features/auth/constants'

export const checkPasswordValid = (value: string): boolean =>
  passwordRegexp.test(value)
