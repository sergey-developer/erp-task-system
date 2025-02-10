import {
  CreateAttachmentMutationArgs,
  CreateAttachmentSuccessResponse,
} from 'features/attachments//api/schemas'
import { useCreateAttachmentMutation } from 'features/attachments/api/attachments.endpoints'
import { createAttachmentErrMsg } from 'features/attachments/api/constants'
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
    args: Omit<CreateAttachmentMutationArgs, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateAttachmentSuccessResponse>>,
  CustomUseMutationState<CreateAttachmentMutationArgs, CreateAttachmentSuccessResponse>,
]

export const useCreateAttachment = (): UseCreateAttachmentResult => {
  const [mutation, state] = useCreateAttachmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createAttachmentErrMsg)
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
