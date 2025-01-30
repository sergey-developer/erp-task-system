import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetLocationsCatalogQueryArgs,
  GetLocationsCatalogSuccessResponse,
} from 'shared/catalogs/models/locations'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const locationsCatalogEndpoints = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getLocationsCatalog: build.query<
      GetLocationsCatalogSuccessResponse,
      MaybeUndefined<GetLocationsCatalogQueryArgs>
    >({
      query: (params) => ({
        url: CatalogsApiEnum.GetLocations,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetLocationsCatalogQuery, useLazyGetLocationsCatalogQuery } =
  locationsCatalogEndpoints
