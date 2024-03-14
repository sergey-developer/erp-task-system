import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getFiscalAccumulatorTasksErrMsg } from 'modules/reports/constants'
import {
  GetFiscalAccumulatorTasksQueryArgs,
  GetFiscalAccumulatorTasksSuccessResponse,
} from 'modules/reports/models'
import { useGetFiscalAccumulatorTasksQuery } from 'modules/reports/services/fiscalAccumulatorApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFiscalAccumulatorTasksResult = CustomUseQueryHookResult<
  MaybeUndefined<GetFiscalAccumulatorTasksQueryArgs>,
  GetFiscalAccumulatorTasksSuccessResponse
>

type UseGetFiscalAccumulatorTasksOptions = CustomUseQueryOptions<
  MaybeUndefined<GetFiscalAccumulatorTasksQueryArgs>,
  GetFiscalAccumulatorTasksSuccessResponse
>

export const useGetFiscalAccumulatorTasks = (
  args?: GetFiscalAccumulatorTasksQueryArgs,
  options?: UseGetFiscalAccumulatorTasksOptions,
): UseGetFiscalAccumulatorTasksResult => {
  const state = useGetFiscalAccumulatorTasksQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getFiscalAccumulatorTasksErrMsg)
      }
    }
  }, [state.error])

  return state
}
