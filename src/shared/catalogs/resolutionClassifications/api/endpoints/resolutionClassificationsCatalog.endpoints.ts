import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetResolutionClassificationsCatalogRequest,
  GetResolutionClassificationsCatalogResponse,
} from 'shared/catalogs/api/endpoints/resolutionClassifications/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const resolutionClassificationsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResolutionClassificationsCatalog: build.query<
      GetResolutionClassificationsCatalogResponse,
      GetResolutionClassificationsCatalogRequest
    >({
      query: (params) => ({
        url: CatalogEndpointsEnum.GetResolutionClassifications,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetResolutionClassificationsCatalogQuery } =
  resolutionClassificationsCatalogEndpoints
