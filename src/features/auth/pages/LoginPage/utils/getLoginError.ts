import { LOGIN_BAD_REQUEST_ERROR_MSG, LOGIN_WRONG_DATA_ERROR_MSG } from 'features/auth/constants'

import { commonApiMessages } from 'shared/constants/common'
import { HttpCodeEnum } from 'shared/constants/http'
import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeNull } from 'shared/types/utils'

export const getLoginError = (error: unknown): MaybeNull<string> => {
  if (!isErrorResponse(error)) return null

  switch (error.status) {
    case HttpCodeEnum.BadRequest:
      return LOGIN_BAD_REQUEST_ERROR_MSG
    case HttpCodeEnum.Unauthorized:
      return LOGIN_WRONG_DATA_ERROR_MSG
    default:
      return commonApiMessages.unknownError
  }
}
