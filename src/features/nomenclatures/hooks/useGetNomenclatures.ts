import { getNomenclaturesErrMsg } from 'features/nomenclatures/api/constants'
import { useGetNomenclaturesQuery } from 'features/nomenclatures/api/endpoints/nomenclatures.endpoints'
import { GetNomenclaturesRequest } from 'features/warehouse/models'
import { GetNomenclaturesTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetNomenclaturesResult = CustomUseQueryHookResult<
  GetNomenclaturesRequest,
  GetNomenclaturesTransformedResponse
>

type UseGetNomenclaturesOptions = CustomUseQueryOptions<
  GetNomenclaturesRequest,
  GetNomenclaturesTransformedResponse
>

export const useGetNomenclatures = (
  args?: GetNomenclaturesRequest,
  options?: UseGetNomenclaturesOptions,
): UseGetNomenclaturesResult => {
  const state = useGetNomenclaturesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getNomenclaturesErrMsg)
      }
    }
  }, [state.error])

  return state
}
