import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/interfaces'

import { getFiscalAccumulatorTaskListMessages } from 'modules/task/constants'
import {
  GetFiscalAccumulatorTaskListQueryArgs,
  GetFiscalAccumulatorTaskListSuccessResponse,
} from 'modules/task/models'
import { useGetFiscalAccumulatorTaskListQuery } from 'modules/task/services/taskApi.service'

import { isErrorResponse, isForbiddenError } from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

export type UseGetFiscalAccumulatorTaskListResult = CustomUseQueryHookResult<
  GetFiscalAccumulatorTaskListQueryArgs,
  GetFiscalAccumulatorTaskListSuccessResponse
>

export const useGetFiscalAccumulatorTaskList = (
  args: GetFiscalAccumulatorTaskListQueryArgs,
): UseGetFiscalAccumulatorTaskListResult => {
  const state = useGetFiscalAccumulatorTaskListQuery(args)

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showMultipleErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getFiscalAccumulatorTaskListMessages.commonError)
      }
    }
  }, [state.error, state.isError])

  return state
}
