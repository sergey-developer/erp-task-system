import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUrgencyRateTypesCatalogQueryArgs,
  GetUrgencyRateTypesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/urgencyRateTypes'
import { HttpMethodEnum } from 'shared/constants/http'

const urgencyRateTypesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUrgencyRateTypesCatalog: build.query<
      GetUrgencyRateTypesCatalogSuccessResponse,
      GetUrgencyRateTypesCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetUrgencyRateTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetUrgencyRateTypesCatalogQuery } = urgencyRateTypesCatalogEndpoints
