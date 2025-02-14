import { getRelocationTasksErrMsg } from 'features/warehouse/constants/relocationTask'
import { GetRelocationTasksRequest } from 'features/warehouse/models'
import { useGetRelocationTasksQuery } from 'features/warehouse/services/relocationTaskApi.service'
import { GetRelocationTasksTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetRelocationTasksResult = CustomUseQueryHookResult<
  GetRelocationTasksRequest,
  GetRelocationTasksTransformedResponse
>

type UseGetRelocationTasksOptions = CustomUseQueryOptions<
  GetRelocationTasksRequest,
  GetRelocationTasksTransformedResponse
>

export const useGetRelocationTasks = (
  args: GetRelocationTasksRequest,
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
