import {
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse,
} from 'features/warehouse/models'
import { MeasurementUnitApiEnum } from 'features/warehouse/services/measurementUnitApiService'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

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
