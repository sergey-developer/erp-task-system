import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetResolutionClassificationsQueryArgs,
  GetResolutionClassificationsSuccessResponse,
} from 'shared/catalogs/models/resolutionClassifications'
import { HttpMethodEnum } from 'shared/constants/http'

const resolutionClassificationsCatalogEndpoints = baseApiService.injectEndpoints({
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
