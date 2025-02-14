import { getTaskRegistrationRequestRecipientsFNErrorMessage } from 'features/task/constants/task'
import {
  GetTaskRegistrationRequestRecipientsFNRequest,
  GetTaskRegistrationRequestRecipientsFNResponse,
} from 'features/task/models'
import { useGetTaskRegistrationRequestRecipientsFNQuery } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskRegistrationRequestRecipientsFNResult = CustomUseQueryHookResult<
  GetTaskRegistrationRequestRecipientsFNRequest,
  GetTaskRegistrationRequestRecipientsFNResponse
>

type UseGetTaskRegistrationRequestRecipientsFNOptions = CustomUseQueryOptions<
  GetTaskRegistrationRequestRecipientsFNRequest,
  GetTaskRegistrationRequestRecipientsFNResponse
>

export const useGetTaskRegistrationRequestRecipientsFN = (
  args: GetTaskRegistrationRequestRecipientsFNRequest,
  options?: UseGetTaskRegistrationRequestRecipientsFNOptions,
): UseGetTaskRegistrationRequestRecipientsFNResult => {
  const state = useGetTaskRegistrationRequestRecipientsFNQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskRegistrationRequestRecipientsFNErrorMessage)
      }
    }
  }, [state.error])

  return state
}
