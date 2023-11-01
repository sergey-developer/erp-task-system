import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createAttachmentErrorMsg } from 'modules/attachment/constants'
import {
  CreateAttachmentMutationArgs,
  CreateAttachmentSuccessResponse,
} from 'modules/attachment/models'
import { useCreateAttachmentMutation } from 'modules/attachment/services/attachmentApi.service'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateAttachmentResult = CustomUseMutationResult<
  CreateAttachmentMutationArgs,
  CreateAttachmentSuccessResponse
>

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

  return [mutation, state]
}
