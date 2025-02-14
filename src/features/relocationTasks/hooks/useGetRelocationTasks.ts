import { useGetRelocationTasksQuery } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import { getRelocationTasksErrorMessage } from 'features/relocationTasks/constants'
import { GetRelocationTasksRequest } from 'features/warehouse/models'
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
        showErrorNotification(getRelocationTasksErrorMessage)
      }
    }
  }, [state.error])

  return state
}
