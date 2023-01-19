import {
  LOGIN_BAD_REQUEST_ERROR_MSG,
  LOGIN_WRONG_DATA_ERROR_MSG,
} from 'modules/auth/constants/errors'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import { HttpCodeEnum } from 'shared/constants/http'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

export const getLoginError = (
  error: MaybeUndefined<ErrorResponse>,
): MaybeNull<string> => {
  if (!error) return null

  switch (error.status) {
    case HttpCodeEnum.BadRequest:
      return LOGIN_BAD_REQUEST_ERROR_MSG
    case HttpCodeEnum.Unauthorized:
      return LOGIN_WRONG_DATA_ERROR_MSG
    default:
      return UNKNOWN_ERROR_MSG
  }
}
