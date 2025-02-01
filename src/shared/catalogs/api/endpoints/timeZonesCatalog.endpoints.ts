import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetTimeZonesCatalogQueryArgs,
  GetTimeZonesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/timeZones'
import { HttpMethodEnum } from 'shared/constants/http'

const timeZonesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTimeZonesCatalog: build.query<
      GetTimeZonesCatalogSuccessResponse,
      GetTimeZonesCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetTimeZones,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetTimeZonesCatalogQuery, endpoints } = timeZonesCatalogEndpoints
