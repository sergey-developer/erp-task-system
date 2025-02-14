import {
  CreateAttachmentRequest,
  CreateAttachmentResponse,
} from 'features/attachments//api/schemas'
import { createAttachmentErrorMessage } from 'features/attachments/api/constants'
import { useCreateAttachmentMutation } from 'features/attachments/api/endpoints/attachments.endpoints'
import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  getErrorDetailStr,
  isBadRequestError,
  isErrorResponse,
} from 'shared/api/baseApi'
import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateAttachmentResult = [
  (
    args: Omit<CreateAttachmentRequest, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateAttachmentResponse>>,
  CustomUseMutationState<CreateAttachmentRequest, CreateAttachmentResponse>,
]

export const useCreateAttachment = (): UseCreateAttachmentResult => {
  const [mutation, state] = useCreateAttachmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createAttachmentErrorMessage)
      }
    }
  }, [state.error])

  const handler = useCallback<UseCreateAttachmentResult[0]>(
    async (args, { file, onSuccess, onError }) => {
      try {
        const response = await mutation({ ...args, file: file as FileToSend }).unwrap()
        if (onSuccess) onSuccess(response)
        return response
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          if (onError) onError({ name: '', message: getErrorDetailStr(error) || '' })
        }
      }
    },

    [mutation],
  )

  return [handler, state]
}
