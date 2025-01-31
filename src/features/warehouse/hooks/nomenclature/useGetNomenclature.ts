import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getNomenclatureMessages } from 'features/warehouse/constants/nomenclature'
import { GetNomenclatureQueryArgs, GetNomenclatureSuccessResponse } from 'features/warehouse/models'
import { useGetNomenclatureQuery } from 'features/warehouse/services/nomenclatureApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclatureResult = CustomUseQueryHookResult<
  GetNomenclatureQueryArgs,
  GetNomenclatureSuccessResponse
>

type UseGetNomenclatureOptions = CustomUseQueryOptions<
  GetNomenclatureQueryArgs,
  GetNomenclatureSuccessResponse
>

export const useGetNomenclature = (
  args: GetNomenclatureQueryArgs,
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
        showErrorNotification(getNomenclatureMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
