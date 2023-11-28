import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getFiscalAccumulatorsErrorMsg } from 'modules/fiscalAccumulator/constants'
import {
  GetFiscalAccumulatorsQueryArgs,
  GetFiscalAccumulatorsSuccessResponse,
} from 'modules/fiscalAccumulator/models'
import { useGetFiscalAccumulatorsQuery } from 'modules/fiscalAccumulator/services/fiscalAccumulatorApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFiscalAccumulatorsResult = CustomUseQueryHookResult<
  GetFiscalAccumulatorsQueryArgs,
  GetFiscalAccumulatorsSuccessResponse
>

type UseGetFiscalAccumulatorsOptions = CustomUseQueryOptions<
  GetFiscalAccumulatorsQueryArgs,
  GetFiscalAccumulatorsSuccessResponse
>

export const useGetFiscalAccumulators = (
  options?: UseGetFiscalAccumulatorsOptions,
): UseGetFiscalAccumulatorsResult => {
  const state = useGetFiscalAccumulatorsQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getFiscalAccumulatorsErrorMsg)
      }
    }
  }, [state.error])

  return state
}
