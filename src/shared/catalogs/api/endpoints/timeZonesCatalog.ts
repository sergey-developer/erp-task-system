import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from 'shared/catalogs/models/timeZones'
import { HttpMethodEnum } from 'shared/constants/http'

const timeZonesCatalogEndpoints = baseApiService.injectEndpoints({
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
