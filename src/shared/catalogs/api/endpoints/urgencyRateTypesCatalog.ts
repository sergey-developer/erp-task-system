import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUrgencyRateTypesQueryArgs,
  GetUrgencyRateTypesSuccessResponse,
} from 'shared/catalogs/models/urgencyRateTypes'
import { HttpMethodEnum } from 'shared/constants/http'

const urgencyRateTypesCatalogEndpoints = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getUrgencyRateTypesCatalog: build.query<
      GetUrgencyRateTypesSuccessResponse,
      GetUrgencyRateTypesQueryArgs
    >({
      query: () => ({
        url: CatalogsApiEnum.GetUrgencyRateTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetUrgencyRateTypesCatalogQuery } = urgencyRateTypesCatalogEndpoints
