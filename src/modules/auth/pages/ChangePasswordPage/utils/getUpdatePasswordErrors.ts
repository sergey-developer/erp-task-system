import { updatePasswordErrorMessages } from 'modules/auth/constants'

import { MaybeNull } from 'shared/interfaces/utils'
import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isUnauthorizedError,
} from 'shared/services/api'

export const getUpdatePasswordErrors = (
  error: unknown,
): MaybeNull<Array<string>> => {
  if (!isErrorResponse(error)) return null

  if (
    isBadRequestError(error) ||
    isNotFoundError(error) ||
    isUnauthorizedError(error)
  ) {
    if (error.data.detail) {
      return error.data.detail
    }
  }

  return [updatePasswordErrorMessages.commonError]
}
