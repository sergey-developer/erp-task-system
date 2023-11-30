import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import { createAttachmentErrorMsg } from 'modules/attachment/constants'
import {
  CreateAttachmentMutationArgs,
  CreateAttachmentSuccessResponse,
} from 'modules/attachment/models'
import { useCreateAttachmentMutation } from 'modules/attachment/services/attachmentApi.service'

import {
  getErrorDetail,
  getErrorDetailStr,
  isBadRequestError,
  isErrorResponse,
} from 'shared/services/baseApi'
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
        showErrorNotification(createAttachmentErrorMsg)
      }
    }
  }, [state.error])

  const handler = useCallback<UseCreateAttachmentResult[0]>(
    async (args, { file, onSuccess, onError }) => {
      try {
        const response = await mutation({ ...args, file: file as FileToSend }).unwrap()
        if (onSuccess) onSuccess({ id: response.id })
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
