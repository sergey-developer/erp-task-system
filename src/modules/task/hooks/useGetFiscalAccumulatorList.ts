import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getFiscalAccumulatorListMessages } from 'modules/task/constants'
import {
  GetFiscalAccumulatorListQueryArgs,
  GetFiscalAccumulatorListSuccessResponse,
} from 'modules/task/models'
import { useGetFiscalAccumulatorQuery } from 'modules/task/services/fiscalAccumulatorApiService'

import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFiscalAccumulatorListResult = CustomUseQueryHookResult<
  GetFiscalAccumulatorListQueryArgs,
  GetFiscalAccumulatorListSuccessResponse
>

export const useGetFiscalAccumulatorList = (): UseGetFiscalAccumulatorListResult => {
  const state = useGetFiscalAccumulatorQuery()

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getFiscalAccumulatorListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
