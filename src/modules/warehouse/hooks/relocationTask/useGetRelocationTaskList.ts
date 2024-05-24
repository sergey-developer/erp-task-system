import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTaskListErrMsg } from 'modules/warehouse/constants/relocationTask'
import { GetRelocationTaskListQueryArgs } from 'modules/warehouse/models'
import { useGetRelocationTaskListQuery } from 'modules/warehouse/services/relocationTaskApi.service'
import { GetRelocationTaskListTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationTaskListResult = CustomUseQueryHookResult<
  GetRelocationTaskListQueryArgs,
  GetRelocationTaskListTransformedSuccessResponse
>

type UseGetRelocationTaskListOptions = CustomUseQueryOptions<
  GetRelocationTaskListQueryArgs,
  GetRelocationTaskListTransformedSuccessResponse
>

export const useGetRelocationTaskList = (
  args: GetRelocationTaskListQueryArgs,
  options?: UseGetRelocationTaskListOptions,
): UseGetRelocationTaskListResult => {
  const state = useGetRelocationTaskListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationTaskListErrMsg)
      }
    }
  }, [state.error])

  return state
}
