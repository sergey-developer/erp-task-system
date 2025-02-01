import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetResolutionClassificationsCatalogQueryArgs,
  GetResolutionClassificationsCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/resolutionClassifications'
import { HttpMethodEnum } from 'shared/constants/http'

const resolutionClassificationsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResolutionClassificationsCatalog: build.query<
      GetResolutionClassificationsCatalogSuccessResponse,
      GetResolutionClassificationsCatalogQueryArgs
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
