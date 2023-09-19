import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTaskListMessages } from 'modules/warehouse/constants/relocationTask'
import { GetRelocationTaskListQueryArgs } from 'modules/warehouse/models'
import { useGetRelocationTaskListQuery } from 'modules/warehouse/services/relocationTaskApi.service'
import { GetRelocationTaskListTransformedSuccessResponse } from 'modules/warehouse/types'

import { isErrorResponse } from 'shared/services/baseApi'
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
      showErrorNotification(getRelocationTaskListMessages.commonError)
    }
  }, [state.error])

  return state
}
