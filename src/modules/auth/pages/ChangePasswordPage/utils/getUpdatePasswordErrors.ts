import { updatePasswordMessages } from 'modules/auth/constants'

import { MaybeNull } from 'shared/types/utils'
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
      return Array.isArray(error.data.detail)
        ? error.data.detail
        : [error.data.detail]
    }
  }

  return [updatePasswordMessages.commonError]
}
