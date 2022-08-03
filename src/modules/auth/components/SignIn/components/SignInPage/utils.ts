import { LoginMutationArgsModel } from 'modules/auth/models'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { MaybeNull } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

export const getLoginError = (
  error: ErrorResponse<LoginMutationArgsModel>,
): MaybeNull<string> => {
  switch (error.status) {
    case HttpStatusCodeEnum.BadRequest:
      return 'Неверный запрос'
    case HttpStatusCodeEnum.Unauthorized:
      return 'Неверный логин и/или пароль'
    default:
      return null
  }
}
