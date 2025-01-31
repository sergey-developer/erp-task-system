import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskRegistrationRequestRecipientsFNErrMsg } from 'features/task/constants/task'
import {
  GetTaskRegistrationRequestRecipientsFNQueryArgs,
  GetTaskRegistrationRequestRecipientsFNSuccessResponse,
} from 'features/task/models'
import { useGetTaskRegistrationRequestRecipientsFNQuery } from 'features/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskRegistrationRequestRecipientsFNResult = CustomUseQueryHookResult<
  GetTaskRegistrationRequestRecipientsFNQueryArgs,
  GetTaskRegistrationRequestRecipientsFNSuccessResponse
>

type UseGetTaskRegistrationRequestRecipientsFNOptions = CustomUseQueryOptions<
  GetTaskRegistrationRequestRecipientsFNQueryArgs,
  GetTaskRegistrationRequestRecipientsFNSuccessResponse
>

export const useGetTaskRegistrationRequestRecipientsFN = (
  args: GetTaskRegistrationRequestRecipientsFNQueryArgs,
  options?: UseGetTaskRegistrationRequestRecipientsFNOptions,
): UseGetTaskRegistrationRequestRecipientsFNResult => {
  const state = useGetTaskRegistrationRequestRecipientsFNQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskRegistrationRequestRecipientsFNErrMsg)
      }
    }
  }, [state.error])

  return state
}
