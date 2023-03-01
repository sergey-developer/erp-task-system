import { LoginSuccessResponse } from 'modules/auth/models'

import {
  CORRECT_ACCESS_TOKEN,
  CORRECT_REFRESH_TOKEN,
} from '_tests_/constants/auth'

export const loginResponseSuccess: LoginSuccessResponse = {
  access: CORRECT_ACCESS_TOKEN,
  refresh: CORRECT_REFRESH_TOKEN,
}
