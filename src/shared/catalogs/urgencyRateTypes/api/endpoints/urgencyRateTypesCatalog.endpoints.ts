import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUrgencyRateTypesCatalogRequest,
  GetUrgencyRateTypesCatalogResponse,
} from 'shared/catalogs/api/endpoints/urgencyRateTypes/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const urgencyRateTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUrgencyRateTypesCatalog: build.query<
      GetUrgencyRateTypesCatalogResponse,
      GetUrgencyRateTypesCatalogRequest
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetUrgencyRateTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetUrgencyRateTypesCatalogQuery } = urgencyRateTypesCatalogEndpoints
