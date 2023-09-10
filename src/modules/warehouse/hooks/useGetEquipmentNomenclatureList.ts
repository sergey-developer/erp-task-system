import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentNomenclatureListMessages } from 'modules/warehouse/constants'
import { GetEquipmentNomenclatureListQueryArgs } from 'modules/warehouse/models'
import { useGetEquipmentNomenclatureListQuery } from 'modules/warehouse/services/equipmentApi.service'
import { GetEquipmentNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetEquipmentNomenclatureListResult = CustomUseQueryHookResult<
  GetEquipmentNomenclatureListQueryArgs,
  GetEquipmentNomenclatureListTransformedSuccessResponse
>

export const useGetEquipmentNomenclatureList = (
  args: GetEquipmentNomenclatureListQueryArgs,
): UseGetEquipmentNomenclatureListResult => {
  const state = useGetEquipmentNomenclatureListQuery(args)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getEquipmentNomenclatureListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
