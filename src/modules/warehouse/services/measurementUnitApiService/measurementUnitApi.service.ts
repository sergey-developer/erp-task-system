import {
  GetMeasurementUnitListQueryArgs,
  GetMeasurementUnitListSuccessResponse,
} from 'modules/warehouse/models'
import { MeasurementUnitApiEnum } from 'modules/warehouse/services/measurementUnitApiService'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

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
