import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getNomenclatureListMessages } from 'modules/warehouse/constants'
import { GetNomenclatureListQueryArgs } from 'modules/warehouse/models'
import { useGetNomenclatureListQuery } from 'modules/warehouse/services/nomenclatureApi.service'
import { GetNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { isErrorResponse, isForbiddenError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetNomenclatureListResult = CustomUseQueryHookResult<
  GetNomenclatureListQueryArgs,
  GetNomenclatureListTransformedSuccessResponse
>

export const useGetNomenclatureList = (
  args: GetNomenclatureListQueryArgs,
): UseGetNomenclatureListResult => {
  const state = useGetNomenclatureListQuery(args)

  useEffect(() => {
    if (state.error) {
      if (isErrorResponse(state.error)) {
        if (isForbiddenError(state.error) && state.error.data.detail) {
          showErrorNotification(state.error.data.detail)
        } else {
          showErrorNotification(getNomenclatureListMessages.commonError)
        }
      }
    }
  }, [state.error])

  return state
}
