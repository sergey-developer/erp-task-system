import { useCreateRelocationTaskAttachmentMutation } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  getErrorDetailStr,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { createRelocationTaskAttachmentErrorMessage } from '../api/constants'
import {
  CreateRelocationTaskAttachmentRequest,
  CreateRelocationTaskAttachmentResponse,
} from '../api/schemas'

type UseCreateRelocationTaskAttachmentResult = [
  (
    args: Omit<CreateRelocationTaskAttachmentRequest, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateRelocationTaskAttachmentResponse>>,
  CustomUseMutationState<
    CreateRelocationTaskAttachmentRequest,
    CreateRelocationTaskAttachmentResponse
  >,
]

export const useCreateRelocationTaskAttachment = (): UseCreateRelocationTaskAttachmentResult => {
  const [mutation, state] = useCreateRelocationTaskAttachmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createRelocationTaskAttachmentErrorMessage)
      }
    }
  }, [state.error])

  const handler = useCallback<UseCreateRelocationTaskAttachmentResult[0]>(
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
