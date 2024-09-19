import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback, useEffect } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import { createInfrastructureOrdersFormAttachmentErrMsg } from 'modules/infrastructures/constants'
import {
  CreateInfrastructureOrderFormAttachmentMutationArgs,
  CreateInfrastructureOrderFormAttachmentSuccessResponse,
} from 'modules/infrastructures/models'
import { useCreateInfrastructureOrderFormAttachmentMutation } from 'modules/infrastructures/services/infrastructuresApi.service'

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

type UseCreateInfrastructureOrderFormAttachmentResult = [
  (
    args: Omit<CreateInfrastructureOrderFormAttachmentMutationArgs, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateInfrastructureOrderFormAttachmentSuccessResponse>>,
  CustomUseMutationState<
    CreateInfrastructureOrderFormAttachmentMutationArgs,
    CreateInfrastructureOrderFormAttachmentSuccessResponse
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
          showErrorNotification(createInfrastructureOrdersFormAttachmentErrMsg)
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
