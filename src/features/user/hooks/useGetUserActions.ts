import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUserActionsErrMsg } from 'features/user/constants'
import { GetUserActionsQueryArgs, GetUserActionsSuccessResponse } from 'features/user/models'
import { useGetUserActionsQuery } from 'features/user/services/userApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserActionsResult = CustomUseQueryHookResult<
  GetUserActionsQueryArgs,
  GetUserActionsSuccessResponse
>

type UseGetUserActionsOptions = CustomUseQueryOptions<
  GetUserActionsQueryArgs,
  GetUserActionsSuccessResponse
>

export const useGetUserActions = (
  args: GetUserActionsQueryArgs,
  options?: UseGetUserActionsOptions,
): UseGetUserActionsResult => {
  const state = useGetUserActionsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getUserActionsErrMsg)
      }
    }
  }, [state.error])

  return state
}
