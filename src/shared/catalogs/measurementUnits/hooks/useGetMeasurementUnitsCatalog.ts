import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getMeasurementUnitsCatalogErrorMessage } from '../api/constants'
import { useGetMeasurementUnitsCatalogQuery } from '../api/endpoints/measurementUnitsCatalog.endpoints'
import {
  GetMeasurementUnitsCatalogRequest,
  GetMeasurementUnitsCatalogResponse,
} from '../api/schemas'

type UseGetMeasurementUnitListResult = CustomUseQueryHookResult<
  GetMeasurementUnitsCatalogRequest,
  GetMeasurementUnitsCatalogResponse
>

type UseGetMeasurementUnitListOptions = CustomUseQueryOptions<
  GetMeasurementUnitsCatalogRequest,
  GetMeasurementUnitsCatalogResponse
>

export const useGetMeasurementUnitsCatalog = (
  args?: GetMeasurementUnitsCatalogRequest,
  options?: UseGetMeasurementUnitListOptions,
): UseGetMeasurementUnitListResult => {
  const state = useGetMeasurementUnitsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMeasurementUnitsCatalogErrorMessage)
    }
  }, [state.error])

  return state
}
