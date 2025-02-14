import { getNomenclatureListMessages } from 'features/warehouse/constants/nomenclature'
import { GetNomenclatureListRequest } from 'features/warehouse/models'
import { useGetNomenclatureListQuery } from 'features/warehouse/services/nomenclatureApi.service'
import { GetNomenclatureListTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureListResult = CustomUseQueryHookResult<
  GetNomenclatureListRequest,
  GetNomenclatureListTransformedResponse
>

type UseGetNomenclatureListOptions = CustomUseQueryOptions<
  GetNomenclatureListRequest,
  GetNomenclatureListTransformedResponse
>

export const useGetNomenclatures = (
  args?: GetNomenclatureListRequest,
  options?: UseGetNomenclatureListOptions,
): UseGetNomenclatureListResult => {
  const state = useGetNomenclatureListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getNomenclatureListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
