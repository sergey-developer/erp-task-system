import { LoginResponseModel } from 'modules/auth/models'

export const CORRECT_EMAIL = 'correct@mail.ru'
export const INCORRECT_EMAIL = 'incorrect-email'
export const NOT_EXISTING_EMAIL = 'not-exist@mail.ru'

export const CORRECT_PASSWORD = 'correct-password'
export const WRONG_PASSWORD = 'wrong-password'

export const CORRECT_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

export const CORRECT_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphY2sgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.lzqnhucjESt_hUIOcGsau-Q7XAZ5HJvWQWwjie59x1s'

export const successLoginResponse: LoginResponseModel = {
  access: CORRECT_ACCESS_TOKEN,
  refresh: CORRECT_REFRESH_TOKEN,
}

export const btnLoadingClass = 'ant-btn-loading'
export const validatingStatusClass = 'ant-form-item-is-validating'
