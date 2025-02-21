import { updatePasswordErrorMessage } from 'features/auth/api/constants'

import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isUnauthorizedError,
} from 'shared/api/baseApi'
import { MaybeNull } from 'shared/types/utils'

export const getUpdatePasswordErrors = (error: unknown): MaybeNull<string[]> => {
  if (!isErrorResponse(error)) return null

  if (isBadRequestError(error) || isNotFoundError(error) || isUnauthorizedError(error)) {
    if (error.data.detail) {
      return Array.isArray(error.data.detail) ? error.data.detail : [error.data.detail]
    }
  }

  return [updatePasswordErrorMessage]
}
