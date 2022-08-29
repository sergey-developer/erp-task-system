import { LoginResponseModel } from 'modules/auth/models'

export const CORRECT_EMAIL = 'correct@mail.ru'
export const INCORRECT_EMAIL = 'incorrect-email'
export const NOT_EXISTING_EMAIL = 'not-exist@mail.ru'

export const CORRECT_PASSWORD = 'correct-password'
export const WRONG_PASSWORD = 'wrong-password'

export const CORRECT_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoiQURNSU4ifQ._dHw0q0cMhOG_Y4KPpjzkpgYwGuyl3GAvFXZrSWhYl4'

export const CORRECT_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoiQURNSU4ifQ.kCB1hsZQH5YGs4mGTVBUESoq5MHWSDGk7dj74E7lfVw'

export const successLoginResponse: LoginResponseModel = {
  access: CORRECT_ACCESS_TOKEN,
  refresh: CORRECT_REFRESH_TOKEN,
}

export const btnLoadingClass = 'ant-btn-loading'
export const validatingStatusClass = 'ant-form-item-is-validating'
