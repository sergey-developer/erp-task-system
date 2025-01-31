import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUrgencyRateTypesQueryArgs,
  GetUrgencyRateTypesSuccessResponse,
} from 'shared/catalogs/api/dto/urgencyRateTypes'
import { HttpMethodEnum } from 'shared/constants/http'

const urgencyRateTypesCatalogEndpoints = baseApi.injectEndpoints({
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
