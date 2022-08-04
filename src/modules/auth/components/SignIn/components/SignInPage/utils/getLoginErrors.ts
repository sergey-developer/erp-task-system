import { LoginMutationArgsModel } from 'modules/auth/models'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/interfaces/utils'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'

const getLoginErrors = (
  error: MaybeUndefined<ErrorResponse<LoginMutationArgsModel>>,
): Array<string> => {
  const errorMessages: Array<string> = []

  if (!error) return errorMessages

  switch (error.status) {
    case HttpStatusCodeEnum.BadRequest:
      errorMessages.push('Неверный запрос')
      return errorMessages
    case HttpStatusCodeEnum.Unauthorized:
      errorMessages.push('Неверный логин и/или пароль')
      return errorMessages
    default:
      return getErrorDetail(error)
  }
}

export default getLoginErrors
