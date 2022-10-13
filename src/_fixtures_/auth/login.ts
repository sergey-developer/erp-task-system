import {
  CORRECT_ACCESS_TOKEN,
  CORRECT_REFRESH_TOKEN,
} from '_tests_/constants/auth'
import { LoginResponseModel } from 'modules/auth/models'

export const loginResponseSuccess: LoginResponseModel = {
  access: CORRECT_ACCESS_TOKEN,
  refresh: CORRECT_REFRESH_TOKEN,
}
