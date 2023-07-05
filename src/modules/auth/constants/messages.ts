export const LOGOUT_ERROR_MSG = 'Ошибка выхода из системы'

export const LOGIN_BAD_REQUEST_ERROR_MSG = 'Неверный запрос'

export const LOGIN_WRONG_DATA_ERROR_MSG = 'Неверный логин и/или пароль'

export const INCORRECT_PASSWORD_ERROR_MSG =
  'Пароль не соответствует требованиям: не менее 8 символов, минимум одна цифра, минимум одна латинская буква в верхнем и нижнем регистре, минимум один из спецсимволов ~!@#$%^&*_-+=`|\\(){}[]:;"\'<>,.?/'

export const UPDATE_PASSWORD_SUCCESS_MSG = 'Пароль успешно изменен'

export const updatePasswordErrorMessages = {
  commonError: 'Ошибка обновления пароля',
} as const
