import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getSubTasksErrMsg } from 'modules/task/constants/task'
import { GetSubTaskListQueryArgs, GetSubTaskListSuccessResponse } from 'modules/task/models'
import { useGetSubTaskListQuery } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSubTaskListResult = CustomUseQueryHookResult<
  GetSubTaskListQueryArgs,
  GetSubTaskListSuccessResponse
>

type UseGetCountryListOptions = CustomUseQueryOptions<
  GetSubTaskListQueryArgs,
  GetSubTaskListSuccessResponse
>

export const useGetSubTaskList = (
  args: GetSubTaskListQueryArgs,
  options?: UseGetCountryListOptions,
): UseGetSubTaskListResult => {
  const state = useGetSubTaskListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getSubTasksErrMsg)
      }
    }
  }, [state.error])

  return state
}
