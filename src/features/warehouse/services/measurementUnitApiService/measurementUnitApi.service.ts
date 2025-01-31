import {
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse,
} from 'features/warehouse/models'
import { MeasurementUnitApiEnum } from 'features/warehouse/services/measurementUnitApiService'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const measurementUnitApiService = baseApi.injectEndpoints({
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
