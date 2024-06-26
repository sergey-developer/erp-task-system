import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import { createRelocationTaskAttachmentErrMsg } from 'modules/warehouse/constants/relocationTask'
import {
  CreateRelocationTaskAttachmentMutationArgs,
  CreateRelocationTaskAttachmentSuccessResponse,
} from 'modules/warehouse/models/relocationTask'
import { useCreateRelocationTaskAttachmentMutation } from 'modules/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  getErrorDetailStr,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateRelocationTaskAttachmentResult = [
  (
    args: Omit<CreateRelocationTaskAttachmentMutationArgs, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateRelocationTaskAttachmentSuccessResponse>>,
  CustomUseMutationState<
    CreateRelocationTaskAttachmentMutationArgs,
    CreateRelocationTaskAttachmentSuccessResponse
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
        showErrorNotification(createRelocationTaskAttachmentErrMsg)
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
