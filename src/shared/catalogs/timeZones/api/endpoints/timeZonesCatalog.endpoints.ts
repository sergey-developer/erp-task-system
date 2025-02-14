import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetTimeZonesCatalogRequest,
  GetTimeZonesCatalogResponse,
} from 'shared/catalogs/api/endpoints/timeZones/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const timeZonesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTimeZonesCatalog: build.query<GetTimeZonesCatalogResponse, GetTimeZonesCatalogRequest>({
      query: () => ({
        url: CatalogApiPathsEnum.GetTimeZones,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetTimeZonesCatalogQuery, endpoints } = timeZonesCatalogEndpoints
