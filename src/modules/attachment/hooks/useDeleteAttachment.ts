import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { deleteAttachmentErrorMsg } from 'modules/attachment/constants'
import {
  DeleteAttachmentMutationArgs,
  DeleteAttachmentSuccessResponse,
} from 'modules/attachment/models'
import { useDeleteAttachmentMutation } from 'modules/attachment/services/attachmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteAttachmentResult = CustomUseMutationResult<
  DeleteAttachmentMutationArgs,
  DeleteAttachmentSuccessResponse
>

export const useDeleteAttachment = (): UseDeleteAttachmentResult => {
  const [mutation, state] = useDeleteAttachmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteAttachmentErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
