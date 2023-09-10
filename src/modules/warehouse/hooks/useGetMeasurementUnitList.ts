import { useEffect } from 'react'

import {
  CustomUseQueryHookResult,
  CustomUseQueryOptions,
} from 'lib/rtk-query/types'

import { getMeasurementUnitListMessages } from 'modules/warehouse/constants'
import {
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetMeasurementUnitListQuery } from 'modules/warehouse/services/measurementUnitApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetMeasurementUnitListResult = CustomUseQueryHookResult<
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse
>

export const useGetMeasurementUnitList = (
  args?: GetMeasurementUnitListQueryArgs,
  options?: CustomUseQueryOptions<
    GetMeasurementUnitListQueryArgs,
    GetMeasurementUnitListSuccessResponse
  >,
): UseGetMeasurementUnitListResult => {
  const state = useGetMeasurementUnitListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getMeasurementUnitListMessages.commonError)
    }
  }, [state.error])

  return state
}
