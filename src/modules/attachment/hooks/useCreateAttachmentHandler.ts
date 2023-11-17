import { UploadRequestOption } from 'rc-upload/es/interface'
import { useCallback } from 'react'

import { CustomUseMutationState } from 'lib/rtk-query/types'

import {
  CreateAttachmentMutationArgs,
  CreateAttachmentSuccessResponse,
} from 'modules/attachment/models'

import { getErrorDetailStr, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { FileToSend } from 'shared/types/file'
import { MaybeUndefined } from 'shared/types/utils'

import { useCreateAttachment } from './useCreateAttachment'

type UseCreateAttachmentHandlerResult = [
  (
    args: Omit<CreateAttachmentMutationArgs, 'file'>,
    options: UploadRequestOption,
  ) => Promise<MaybeUndefined<CreateAttachmentSuccessResponse>>,
  CustomUseMutationState<CreateAttachmentMutationArgs, CreateAttachmentSuccessResponse>,
]

export const useCreateAttachmentHandler = (): UseCreateAttachmentHandlerResult => {
  const [mutation, state] = useCreateAttachment()

  const handler = useCallback<UseCreateAttachmentHandlerResult[0]>(
    async (args, { file, onSuccess, onError }) => {
      try {
        const response = await mutation({
          ...args,
          file: file as FileToSend,
        }).unwrap()

        if (onSuccess) onSuccess({ id: response.id })

        return response
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            if (onError) onError({ name: '', message: getErrorDetailStr(error) || '' })
          }
        }
      }
    },

    [mutation],
  )

  return [handler, state]
}
