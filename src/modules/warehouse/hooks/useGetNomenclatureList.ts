import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getNomenclatureListMessages } from 'modules/warehouse/constants'
import { GetNomenclatureListQueryArgs } from 'modules/warehouse/models'
import { useGetNomenclatureListQuery } from 'modules/warehouse/services/nomenclatureApi.service'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetNomenclatureListResult = CustomUseQueryHookResult<
  MaybeUndefined<GetNomenclatureListQueryArgs>,
  GetNomenclatureListTransformedSuccessResponse
>

export type UseGetNomenclatureListOptions = CustomUseQueryOptions<
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
