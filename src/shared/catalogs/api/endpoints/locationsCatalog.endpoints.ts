import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetLocationsCatalogQueryArgs,
  GetLocationsCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/locations'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const locationsCatalogEndpoints = baseApi.injectEndpoints({
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
