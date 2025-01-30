import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentNomenclaturesErrMsg } from 'features/warehouse/constants/equipment'
import { GetEquipmentNomenclaturesQueryArgs } from 'features/warehouse/models'
import { useGetEquipmentNomenclaturesQuery } from 'features/warehouse/services/equipmentApi.service'
import { GetEquipmentNomenclaturesTransformedSuccessResponse } from 'features/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentNomenclaturesResult = CustomUseQueryHookResult<
  MaybeUndefined<GetEquipmentNomenclaturesQueryArgs>,
  GetEquipmentNomenclaturesTransformedSuccessResponse
>

type UseGetEquipmentNomenclaturesOptions = CustomUseQueryOptions<
  MaybeUndefined<GetEquipmentNomenclaturesQueryArgs>,
  GetEquipmentNomenclaturesTransformedSuccessResponse
>

export const useGetEquipmentNomenclatures = (
  args?: GetEquipmentNomenclaturesQueryArgs,
  options?: UseGetEquipmentNomenclaturesOptions,
): UseGetEquipmentNomenclaturesResult => {
  const state = useGetEquipmentNomenclaturesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentNomenclaturesErrMsg)
      }
    }
  }, [state.error])

  return state
}
