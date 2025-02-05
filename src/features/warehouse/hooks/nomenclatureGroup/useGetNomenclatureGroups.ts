import { getNomenclatureGroupListMessages } from 'features/warehouse/constants/nomenclatureGroup'
import {
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse,
} from 'features/warehouse/models'
import { useGetNomenclatureGroupListQuery } from 'features/warehouse/services/nomenclatureGroupApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureGroupListResult = CustomUseQueryHookResult<
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse
>

type UseGetNomenclatureGroupListOptions = CustomUseQueryOptions<
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse
>

export const useGetNomenclatureGroups = (
  args?: GetNomenclatureGroupListQueryArgs,
  options?: UseGetNomenclatureGroupListOptions,
): UseGetNomenclatureGroupListResult => {
  const state = useGetNomenclatureGroupListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getNomenclatureGroupListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
