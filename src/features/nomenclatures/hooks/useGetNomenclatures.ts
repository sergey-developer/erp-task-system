import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getNomenclaturesErrorMessage } from '../api/constants'
import { useGetNomenclaturesQuery } from '../api/endpoints/nomenclatures.endpoints'
import { GetNomenclaturesRequest } from '../api/schemas'
import { GetNomenclaturesTransformedResponse } from '../api/types'

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
        showErrorNotification(getNomenclaturesErrorMessage)
      }
    }
  }, [state.error])

  return state
}
