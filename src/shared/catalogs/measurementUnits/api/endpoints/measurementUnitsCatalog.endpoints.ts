import {
  GetMeasurementUnitsCatalogQueryArgs,
  GetMeasurementUnitsCatalogSuccessResponse,
} from 'features/warehouse/models'

import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'

const measurementUnitsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMeasurementUnitsCatalog: build.query<
      GetMeasurementUnitsCatalogSuccessResponse,
      GetMeasurementUnitsCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetMeasurementUnits,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetMeasurementUnitsCatalogQuery } = measurementUnitsCatalogEndpoints
