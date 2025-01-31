import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getNomenclatureListMessages } from 'features/warehouse/constants/nomenclature'
import { GetNomenclatureListQueryArgs } from 'features/warehouse/models'
import { useGetNomenclatureListQuery } from 'features/warehouse/services/nomenclatureApi.service'
import { GetNomenclatureListTransformedSuccessResponse } from 'features/warehouse/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureListResult = CustomUseQueryHookResult<
  GetNomenclatureListQueryArgs,
  GetNomenclatureListTransformedSuccessResponse
>

type UseGetNomenclatureListOptions = CustomUseQueryOptions<
  GetNomenclatureListQueryArgs,
  GetNomenclatureListTransformedSuccessResponse
>

export const useGetNomenclatures = (
  args?: GetNomenclatureListQueryArgs,
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
