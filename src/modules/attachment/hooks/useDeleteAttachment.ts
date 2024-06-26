import { UploadFile } from 'antd/es/upload'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import { deleteAttachmentErrMsg } from 'modules/attachment/constants'
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
import { FileResponse } from 'shared/types/file'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteAttachmentResult = [
  (file: UploadFile<FileResponse>) => Promise<void>,
  CustomUseMutationState<DeleteAttachmentMutationArgs, DeleteAttachmentSuccessResponse>,
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
        showErrorNotification(deleteAttachmentErrMsg)
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
