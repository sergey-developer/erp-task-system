import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetResolutionClassificationsQueryArgs,
  GetResolutionClassificationsSuccessResponse,
} from 'shared/catalogs/api/dto/resolutionClassifications'
import { HttpMethodEnum } from 'shared/constants/http'

const resolutionClassificationsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getResolutionClassificationsCatalog: build.query<
      GetResolutionClassificationsSuccessResponse,
      GetResolutionClassificationsQueryArgs
    >({
      query: (params) => ({
        url: CatalogsApiEnum.GetResolutionClassifications,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetResolutionClassificationsCatalogQuery } =
  resolutionClassificationsCatalogEndpoints
