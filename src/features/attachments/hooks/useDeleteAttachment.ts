import { UploadFile } from 'antd/es/upload'
import { deleteAttachmentErrorMessage } from 'features/attachments/api/constants'
import { useDeleteAttachmentMutation } from 'features/attachments/api/endpoints/attachments.endpoints'
import {
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
} from 'features/attachments/api/schemas'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { FileResponse } from 'shared/types/file'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteAttachmentResult = [
  (file: UploadFile<FileResponse>) => Promise<void>,
  CustomUseMutationState<DeleteAttachmentRequest, DeleteAttachmentResponse>,
]

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
        showErrorNotification(deleteAttachmentErrorMessage)
      }
    }
  }, [state.error])

  const handler = useCallback<UseDeleteAttachmentResult[0]>(
    async (file) => {
      if (file.response?.id) {
        await mutation({ attachmentId: file.response.id }).unwrap()
      }
    },
    [mutation],
  )

  return [handler, state]
}
