import { createTaskAttachmentErrMsg } from 'features/task/constants/task'
import {
  CreateTaskAttachmentRequest,
  CreateTaskAttachmentResponse,
} from 'features/task/models'
import { useCreateTaskAttachmentMutation } from 'features/task/services/taskApi.service'
import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  getErrorDetailStr,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/api/baseApi'
import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskAttachmentResult = [
  (
    args: Omit<CreateTaskAttachmentRequest, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateTaskAttachmentResponse>>,
  CustomUseMutationState<CreateTaskAttachmentRequest, CreateTaskAttachmentResponse>,
]

export const useCreateTaskAttachment = (): UseCreateTaskAttachmentResult => {
  const [mutation, state] = useCreateTaskAttachmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskAttachmentErrMsg)
      }
    }
  }, [state.error])

  const handler = useCallback<UseCreateTaskAttachmentResult[0]>(
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
