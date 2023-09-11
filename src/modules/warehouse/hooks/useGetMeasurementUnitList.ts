import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getMeasurementUnitListMessages } from 'modules/warehouse/constants'
import {
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetMeasurementUnitListQuery } from 'modules/warehouse/services/measurementUnitApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetMeasurementUnitListResult = CustomUseQueryHookResult<
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse
>

type UseGetMeasurementUnitListOptions = CustomUseQueryOptions<
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse
>

export const useGetMeasurementUnitList = (
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
