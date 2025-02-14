import {
  CreateInfrastructureOrderFormAttachmentRequest,
  CreateInfrastructureOrderFormAttachmentResponse,
} from 'features/infrastructures/api/dto'
import { useCreateInfrastructureOrderFormAttachmentMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { createInfrastructureOrdersFormAttachmentErrorMessage } from 'features/infrastructures/constants'
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

type UseCreateInfrastructureOrderFormAttachmentResult = [
  (
    args: Omit<CreateInfrastructureOrderFormAttachmentRequest, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateInfrastructureOrderFormAttachmentResponse>>,
  CustomUseMutationState<
    CreateInfrastructureOrderFormAttachmentRequest,
    CreateInfrastructureOrderFormAttachmentResponse
  >,
]

export const useCreateInfrastructureOrderFormAttachment =
  (): UseCreateInfrastructureOrderFormAttachmentResult => {
    const [mutation, state] = useCreateInfrastructureOrderFormAttachmentMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (
          isBadRequestError(state.error) ||
          isForbiddenError(state.error) ||
          isNotFoundError(state.error)
        ) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createInfrastructureOrdersFormAttachmentErrorMessage)
        }
      }
    }, [state.error])

    const handler = useCallback<UseCreateInfrastructureOrderFormAttachmentResult[0]>(
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
