import { MeasurementUnitApiEnum } from 'modules/warehouse/constants'
import {
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const measurementUnitApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getMeasurementUnitList: build.query<
      GetMeasurementUnitListSuccessResponse,
      GetMeasurementUnitListQueryArgs
    >({
      query: () => ({
        url: MeasurementUnitApiEnum.GetMeasurementUnitList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetMeasurementUnitListQuery } = measurementUnitApiService
