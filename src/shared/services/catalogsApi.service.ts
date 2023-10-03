import { CatalogsApiEnum } from 'shared/constants/catalogs'
import { HttpMethodEnum } from 'shared/constants/http'
import {
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse,
} from 'shared/models/catalogs/location'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'shared/models/catalogs/subTaskTemplate'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from 'shared/models/catalogs/timeZone'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/models/catalogs/userStatus'

import { baseApiService } from './baseApi'

export const catalogsApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getTimeZoneList: build.query<GetTimeZoneListSuccessResponse, GetTimeZoneListQueryArgs>({
      query: () => ({
        url: CatalogsApiEnum.GetTimeZoneList,
        method: HttpMethodEnum.Get,
      }),
    }),
    getSubTaskTemplateList: build.query<
      GetSubTaskTemplateListSuccessResponse,
      GetSubTaskTemplateListQueryArgs
    >({
      query: (params) => ({
        url: CatalogsApiEnum.GetSubTaskTemplateList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getUserStatusList: build.query<GetUserStatusListSuccessResponse, GetUserStatusListQueryArgs>({
      query: () => ({
        url: CatalogsApiEnum.GetUserStatusList,
        method: HttpMethodEnum.Get,
      }),
    }),
    getLocationList: build.query<GetLocationListSuccessResponse, GetLocationListQueryArgs>({
      query: () => ({
        url: CatalogsApiEnum.GetLocationList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const {
  useGetTimeZoneListQuery,
  useGetSubTaskTemplateListQuery,
  useGetUserStatusListQuery,
  useGetLocationListQuery,
  endpoints,
} = catalogsApiService
