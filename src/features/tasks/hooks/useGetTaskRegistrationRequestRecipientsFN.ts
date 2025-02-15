import { useGetTaskRegistrationRequestRecipientsFNQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import { getTaskRegistrationRequestRecipientsFNErrorMessage } from 'features/tasks/api/constants'
import {
  GetTaskRegistrationRequestRecipientsFNRequest,
  GetTaskRegistrationRequestRecipientsFNResponse,
} from 'features/tasks/api/schemas'
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
