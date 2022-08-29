import {
  LOGIN_BAD_REQUEST_ERROR_MSG,
  LOGIN_WRONG_DATA_ERROR_MSG,
} from 'modules/auth/features/Login/constants/messages'
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
      errorMessages.push(LOGIN_BAD_REQUEST_ERROR_MSG)
      return errorMessages
    case HttpStatusCodeEnum.Unauthorized:
      errorMessages.push(LOGIN_WRONG_DATA_ERROR_MSG)
      return errorMessages
    default:
      return getErrorDetail(error)
  }
}

export default getLoginErrors
