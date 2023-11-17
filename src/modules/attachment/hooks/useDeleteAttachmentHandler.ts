import { UploadFile } from 'antd/es/upload/interface'
import { useCallback } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import {
  DeleteAttachmentMutationArgs,
  DeleteAttachmentSuccessResponse,
} from 'modules/attachment/models'

import { FileResponse } from 'shared/types/file'

import { useDeleteAttachment } from './useDeleteAttachment'

type UseDeleteAttachmentHandlerResult = [
  (file: UploadFile<FileResponse>) => Promise<void>,
  CustomUseMutationState<DeleteAttachmentMutationArgs, DeleteAttachmentSuccessResponse>,
]

export const useDeleteAttachmentHandler = (): UseDeleteAttachmentHandlerResult => {
  const [mutation, state] = useDeleteAttachment()

  const handler = useCallback<UseDeleteAttachmentHandlerResult[0]>(
    async (file) => {
      if (file.response?.id) {
        await mutation({ attachmentId: file.response.id }).unwrap()
      }
    },
    [mutation],
  )

  return [handler, state]
}
