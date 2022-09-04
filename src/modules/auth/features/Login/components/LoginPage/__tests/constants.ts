import {
  CORRECT_ACCESS_TOKEN,
  CORRECT_REFRESH_TOKEN,
} from '__tests/constants/auth'
import { LoginResponseModel } from 'modules/auth/models'

export const CORRECT_EMAIL = 'correct@mail.ru'
export const INCORRECT_EMAIL = 'incorrect-email'
export const NOT_EXISTING_EMAIL = 'not-exist@mail.ru'

export const CORRECT_PASSWORD = 'correct-password'
export const WRONG_PASSWORD = 'wrong-password'

export const loginResponseSuccess: LoginResponseModel = {
  access: CORRECT_ACCESS_TOKEN,
  refresh: CORRECT_REFRESH_TOKEN,
}

export const btnLoadingClass = 'ant-btn-loading'
export const validatingStatusClass = 'ant-form-item-is-validating'
