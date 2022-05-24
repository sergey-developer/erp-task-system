import { LoginApiArg } from 'modules/auth/models'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'

export const getError = (error: ErrorResponse<LoginApiArg>): string => {
  switch (error.status) {
    case HttpStatusCodeEnum.BadRequest:
      return 'Неверный запрос'
    case HttpStatusCodeEnum.Unauthorized:
      return 'Неверный логин и/или пароль'
    default:
      return getErrorDetail(error)
  }
}
