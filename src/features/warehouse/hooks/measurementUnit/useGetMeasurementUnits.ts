import { getMeasurementUnitListMessages } from 'features/warehouse/constants/measurementUnit'
import {
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse,
} from 'features/warehouse/models'
import { useGetMeasurementUnitListQuery } from 'features/warehouse/services/measurementUnitApiService'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetMeasurementUnitListResult = CustomUseQueryHookResult<
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse
>

type UseGetMeasurementUnitListOptions = CustomUseQueryOptions<
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse
>

export const useGetMeasurementUnits = (
  args?: GetMeasurementUnitListQueryArgs,
  options?: UseGetMeasurementUnitListOptions,
): UseGetMeasurementUnitListResult => {
  const state = useGetMeasurementUnitListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMeasurementUnitListMessages.commonError)
    }
  }, [state.error])

  return state
}
