import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import { createTaskAttachmentErrMsg } from 'features/task/constants/task'
import {
  CreateTaskAttachmentMutationArgs,
  CreateTaskAttachmentSuccessResponse,
} from 'features/task/models'
import { useCreateTaskAttachmentMutation } from 'features/task/services/taskApi.service'

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
    args: Omit<CreateTaskAttachmentMutationArgs, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateTaskAttachmentSuccessResponse>>,
  CustomUseMutationState<CreateTaskAttachmentMutationArgs, CreateTaskAttachmentSuccessResponse>,
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
