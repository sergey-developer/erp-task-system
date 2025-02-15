import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import { GetMeasurementUnitsCatalogRequest, GetMeasurementUnitsCatalogResponse } from '../schemas'

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
