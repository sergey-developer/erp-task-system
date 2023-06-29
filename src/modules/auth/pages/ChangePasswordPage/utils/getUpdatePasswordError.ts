import { updatePasswordErrorMessages } from 'modules/auth/constants'

import { MaybeNull } from 'shared/interfaces/utils'
import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isUnauthorizedError,
} from 'shared/services/api'

export const getUpdatePasswordError = (error: unknown): MaybeNull<string> => {
  if (!isErrorResponse(error)) return null

  if (error.data.detail) {
    if (
      isBadRequestError(error) ||
      isNotFoundError(error) ||
      isUnauthorizedError(error)
    ) {
      return error.data.detail[0]
    }
  }

  return updatePasswordErrorMessages.commonError
}
