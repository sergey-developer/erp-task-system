import { getNomenclatureGroupListMessages } from 'features/warehouse/constants/nomenclatureGroup'
import {
  GetNomenclatureGroupListRequest,
  GetNomenclatureGroupListResponse,
} from 'features/warehouse/models'
import { useGetNomenclatureGroupListQuery } from 'features/warehouse/services/nomenclatureGroupApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureGroupListResult = CustomUseQueryHookResult<
  GetNomenclatureGroupListRequest,
  GetNomenclatureGroupListResponse
>

type UseGetNomenclatureGroupListOptions = CustomUseQueryOptions<
  GetNomenclatureGroupListRequest,
  GetNomenclatureGroupListResponse
>

export const useGetNomenclatureGroups = (
  args?: GetNomenclatureGroupListRequest,
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
