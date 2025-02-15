import { getEquipmentNomenclaturesErrorMessage } from 'features/equipments/api/constants'
import { useGetEquipmentNomenclaturesQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { GetEquipmentNomenclaturesRequest } from 'features/equipments/api/schemas'
import { GetEquipmentNomenclaturesTransformedResponse } from 'features/equipments/api/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentNomenclaturesResult = CustomUseQueryHookResult<
  MaybeUndefined<GetEquipmentNomenclaturesRequest>,
  GetEquipmentNomenclaturesTransformedResponse
>

type UseGetEquipmentNomenclaturesOptions = CustomUseQueryOptions<
  MaybeUndefined<GetEquipmentNomenclaturesRequest>,
  GetEquipmentNomenclaturesTransformedResponse
>

export const useGetEquipmentNomenclatures = (
  args?: GetEquipmentNomenclaturesRequest,
  options?: UseGetEquipmentNomenclaturesOptions,
): UseGetEquipmentNomenclaturesResult => {
  const state = useGetEquipmentNomenclaturesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentNomenclaturesErrorMessage)
      }
    }
  }, [state.error])

  return state
}
