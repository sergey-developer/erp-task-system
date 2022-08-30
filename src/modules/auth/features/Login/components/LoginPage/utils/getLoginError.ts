import {
  LOGIN_BAD_REQUEST_ERROR_MSG,
  LOGIN_WRONG_DATA_ERROR_MSG,
} from 'modules/auth/features/Login/constants/messages'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

import { LoginFormFields } from '../interfaces'

const getLoginError = (
  error: MaybeUndefined<ErrorResponse<LoginFormFields>>,
): MaybeNull<string> => {
  if (!error) return null

  switch (error.status) {
    case HttpStatusCodeEnum.BadRequest:
      return LOGIN_BAD_REQUEST_ERROR_MSG
    case HttpStatusCodeEnum.Unauthorized:
      return LOGIN_WRONG_DATA_ERROR_MSG
    default:
      return UNKNOWN_ERROR_MSG
  }
}

export default getLoginError
