import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetLocationsCatalogRequest,
  GetLocationsCatalogResponse,
} from 'shared/catalogs/locations/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const locationsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLocationsCatalog: build.query<
      GetLocationsCatalogResponse,
      MaybeUndefined<GetLocationsCatalogRequest>
    >({
      query: (params) => ({
        url: CatalogApiPathsEnum.GetLocations,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetLocationsCatalogQuery, useLazyGetLocationsCatalogQuery } =
  locationsCatalogEndpoints
