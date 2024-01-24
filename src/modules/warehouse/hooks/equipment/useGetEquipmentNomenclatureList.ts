import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentNomenclaturesErrorMsg } from 'modules/warehouse/constants/equipment'
import { GetEquipmentNomenclatureListQueryArgs } from 'modules/warehouse/models'
import { useGetEquipmentNomenclatureListQuery } from 'modules/warehouse/services/equipmentApi.service'
import { GetEquipmentNomenclatureListTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentNomenclatureListResult = CustomUseQueryHookResult<
  GetEquipmentNomenclatureListQueryArgs,
  GetEquipmentNomenclatureListTransformedSuccessResponse
>

export const useGetEquipmentNomenclatureList = (
  args: GetEquipmentNomenclatureListQueryArgs,
): UseGetEquipmentNomenclatureListResult => {
  const state = useGetEquipmentNomenclatureListQuery(args)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentNomenclaturesErrorMsg)
      }
    }
  }, [state.error])

  return state
}
