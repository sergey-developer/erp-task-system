import {
  GetMeasurementUnitsCatalogQueryArgs,
  GetMeasurementUnitsCatalogSuccessResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getMeasurementUnitsCatalogErrMsg } from '../api/constants'
import { useGetMeasurementUnitsCatalogQuery } from '../api/endpoints/measurementUnitsCatalog.endpoints'

type UseGetMeasurementUnitListResult = CustomUseQueryHookResult<
  GetMeasurementUnitsCatalogQueryArgs,
  GetMeasurementUnitsCatalogSuccessResponse
>

type UseGetMeasurementUnitListOptions = CustomUseQueryOptions<
  GetMeasurementUnitsCatalogQueryArgs,
  GetMeasurementUnitsCatalogSuccessResponse
>

export const useGetMeasurementUnitsCatalog = (
  args?: GetMeasurementUnitsCatalogQueryArgs,
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
