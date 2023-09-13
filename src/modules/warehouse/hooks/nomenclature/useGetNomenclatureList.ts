import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getNomenclatureListMessages } from 'modules/warehouse/constants/nomenclature'
import { GetNomenclatureListQueryArgs } from 'modules/warehouse/models'
import { useGetNomenclatureListQuery } from 'modules/warehouse/services/nomenclatureApiService'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureListResult = CustomUseQueryHookResult<
  GetNomenclatureListQueryArgs,
  GetNomenclatureListTransformedSuccessResponse
>

type UseGetNomenclatureListOptions = CustomUseQueryOptions<
  GetNomenclatureListQueryArgs,
  GetNomenclatureListTransformedSuccessResponse
>

export const useGetNomenclatureList = (
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
