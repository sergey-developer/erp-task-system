import {
  CORRECT_ACCESS_TOKEN,
  CORRECT_REFRESH_TOKEN,
} from '_tests_/constants/auth'
import { LoginSuccessResponse } from 'modules/auth/models'

export const loginResponseSuccess: LoginSuccessResponse = {
  access: CORRECT_ACCESS_TOKEN,
  refresh: CORRECT_REFRESH_TOKEN,
}
