import { getUserActionsErrorMessage } from 'features/users/api/constants'
import { useGetUserActionsQuery } from 'features/users/api/endpoints/users.endpoints'
import { GetUserActionsRequest, GetUserActionsResponse } from 'features/users/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserActionsResult = CustomUseQueryHookResult<
  GetUserActionsRequest,
  GetUserActionsResponse
>

type UseGetUserActionsOptions = CustomUseQueryOptions<GetUserActionsRequest, GetUserActionsResponse>

export const useGetUserActions = (
  args: GetUserActionsRequest,
  options?: UseGetUserActionsOptions,
): UseGetUserActionsResult => {
  const state = useGetUserActionsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getUserActionsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
