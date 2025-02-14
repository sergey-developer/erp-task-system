import {
  GetMeasurementUnitsCatalogRequest,
  GetMeasurementUnitsCatalogResponse,
} from 'features/warehouse/models'

import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'

const measurementUnitsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMeasurementUnitsCatalog: build.query<
      GetMeasurementUnitsCatalogResponse,
      GetMeasurementUnitsCatalogRequest
    >({
      query: () => ({
        url: CatalogApiPathsEnum.GetMeasurementUnits,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetMeasurementUnitsCatalogQuery } = measurementUnitsCatalogEndpoints
