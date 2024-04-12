import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskRegistrationRequestRecipientsFNErrMsg } from 'modules/task/constants/task'
import {
  GetTaskRegistrationRequestRecipientsFNQueryArgs,
  GetTaskRegistrationRequestRecipientsFNSuccessResponse,
} from 'modules/task/models'
import { useGetTaskRegistrationRequestRecipientsFNQuery } from 'modules/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
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
