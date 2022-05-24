import { ErrorResponse, getErrorDetail } from 'shared/services/api'

import { LoginApiArg } from '../models'

export const getError = (error: ErrorResponse<LoginApiArg>): string => {
  switch (error.status) {
    case 400:
      return 'Неверный запрос'
    case 401:
      return 'Неверный логин и/или пароль'
    default:
      return getErrorDetail(error)
  }
}
