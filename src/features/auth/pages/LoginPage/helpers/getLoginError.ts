import {
  loginBadRequestErrorMessage,
  loginWrongDataErrorMessage,
} from 'features/auth/api/constants'

import { isErrorResponse } from 'shared/api/baseApi'
import { commonApiErrorMessage } from 'shared/constants/common'
import { HttpCodeEnum } from 'shared/constants/http'
import { MaybeNull } from 'shared/types/utils'

export const getLoginError = (error: unknown): MaybeNull<string> => {
  if (!isErrorResponse(error)) return null

  switch (error.status) {
    case HttpCodeEnum.BadRequest:
      return loginBadRequestErrorMessage
    case HttpCodeEnum.Unauthorized:
      return loginWrongDataErrorMessage
    default:
      return commonApiErrorMessage
  }
}
