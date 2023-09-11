import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getFiscalAccumulatorTaskListMessages } from 'modules/task/constants'
import {
  GetFiscalAccumulatorTaskListQueryArgs,
  GetFiscalAccumulatorTaskListSuccessResponse,
} from 'modules/task/models'
import { useGetFiscalAccumulatorTaskListQuery } from 'modules/task/services/taskApi.service'

import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFiscalAccumulatorTaskListResult = CustomUseQueryHookResult<
  GetFiscalAccumulatorTaskListQueryArgs,
  GetFiscalAccumulatorTaskListSuccessResponse
>

export const useGetFiscalAccumulatorTaskList = (): UseGetFiscalAccumulatorTaskListResult => {
  const state = useGetFiscalAccumulatorTaskListQuery()

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getFiscalAccumulatorTaskListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
