import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTasksErrMsg } from 'features/warehouse/constants/relocationTask'
import { GetRelocationTasksQueryArgs } from 'features/warehouse/models'
import { useGetRelocationTasksQuery } from 'features/warehouse/services/relocationTaskApi.service'
import { GetRelocationTasksTransformedSuccessResponse } from 'features/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetRelocationTasksResult = CustomUseQueryHookResult<
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
