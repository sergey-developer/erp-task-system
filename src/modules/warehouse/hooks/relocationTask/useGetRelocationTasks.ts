import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTasksErrMsg } from 'modules/warehouse/constants/relocationTask'
import { GetRelocationTasksQueryArgs } from 'modules/warehouse/models'
import { useGetRelocationTasksQuery } from 'modules/warehouse/services/relocationTaskApi.service'
import { GetRelocationTasksTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationTasksResult = CustomUseQueryHookResult<
  GetRelocationTasksQueryArgs,
  GetRelocationTasksTransformedSuccessResponse
>

type UseGetRelocationTasksOptions = CustomUseQueryOptions<
  GetRelocationTasksQueryArgs,
  GetRelocationTasksTransformedSuccessResponse
>

export const useGetRelocationTasks = (
  args: GetRelocationTasksQueryArgs,
  options?: UseGetRelocationTasksOptions,
): UseGetRelocationTasksResult => {
  const state = useGetRelocationTasksQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationTasksErrMsg)
      }
    }
  }, [state.error])

  return state
}
