import {
  GetMeasurementUnitsCatalogRequest,
  GetMeasurementUnitsCatalogResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getMeasurementUnitsCatalogErrMsg } from '../api/constants'
import { useGetMeasurementUnitsCatalogQuery } from '../api/endpoints/measurementUnitsCatalog.endpoints'

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
      showErrorNotification(getMeasurementUnitsCatalogErrMsg)
    }
  }, [state.error])

  return state
}
