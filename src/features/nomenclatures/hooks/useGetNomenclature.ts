import { getNomenclatureErrMsg } from 'features/nomenclatures/api/constants'
import { useGetNomenclatureQuery } from 'features/nomenclatures/api/endpoints/nomenclatures.endpoints'
import { GetNomenclatureRequest, GetNomenclatureResponse } from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureResult = CustomUseQueryHookResult<
  GetNomenclatureRequest,
  GetNomenclatureResponse
>

type UseGetNomenclatureOptions = CustomUseQueryOptions<
  GetNomenclatureRequest,
  GetNomenclatureResponse
>

export const useGetNomenclature = (
  args: GetNomenclatureRequest,
  options?: UseGetNomenclatureOptions,
): UseGetNomenclatureResult => {
  const state = useGetNomenclatureQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getNomenclatureErrMsg)
      }
    }
  }, [state.error])

  return state
}
