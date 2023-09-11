import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getNomenclatureGroupListMessages } from 'modules/warehouse/constants'
import {
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetNomenclatureGroupListQuery } from 'modules/warehouse/services/nomenclatureGroupApi.service'

import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureGroupListResult = CustomUseQueryHookResult<
  MaybeUndefined<GetNomenclatureGroupListQueryArgs>,
  GetNomenclatureGroupListSuccessResponse
>

type UseGetNomenclatureGroupListOptions = CustomUseQueryOptions<
  GetNomenclatureGroupListQueryArgs,
  GetNomenclatureGroupListSuccessResponse
>

export const useGetNomenclatureGroupList = (
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
