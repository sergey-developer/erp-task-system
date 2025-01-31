import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from 'shared/catalogs/api/dto/timeZones'
import { HttpMethodEnum } from 'shared/constants/http'

const timeZonesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTimeZonesCatalog: build.query<GetTimeZoneListSuccessResponse, GetTimeZoneListQueryArgs>({
      query: () => ({
        url: CatalogsApiEnum.GetTimeZones,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetTimeZonesCatalogQuery, endpoints } = timeZonesCatalogEndpoints
