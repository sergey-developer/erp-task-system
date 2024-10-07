import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUrgencyRateTypesErrMsg } from 'shared/constants/catalogs'
import {
  GetUrgencyRateTypesQueryArgs,
  GetUrgencyRateTypesSuccessResponse,
} from 'shared/models/catalogs/urgencyRateTypes'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetUrgencyRateTypesQuery } from 'shared/services/catalogsApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUrgencyRateTypesResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUrgencyRateTypesQueryArgs>,
  GetUrgencyRateTypesSuccessResponse
>

type UseGetUrgencyRateTypesOptions = CustomUseQueryOptions<
  MaybeUndefined<GetUrgencyRateTypesQueryArgs>,
  GetUrgencyRateTypesSuccessResponse
>

export const useGetUrgencyRateTypes = (
  args?: GetUrgencyRateTypesQueryArgs,
  options?: UseGetUrgencyRateTypesOptions,
): UseGetUrgencyRateTypesResult => {
  const state = useGetUrgencyRateTypesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUrgencyRateTypesErrMsg)
    }
  }, [state.error])

  return state
}
