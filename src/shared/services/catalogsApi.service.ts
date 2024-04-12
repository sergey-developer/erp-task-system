import { CatalogsApiEnum } from 'shared/constants/catalogs'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetLocationsQueryArgs, GetLocationsSuccessResponse } from 'shared/models/catalogs/location'
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
import { MaybeUndefined } from 'shared/types/utils'

import {
  GetFaChangeTypesQueryArgs,
  GetFaChangeTypesSuccessResponse,
} from '../models/catalogs/faChangeTypes'
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
    getLocations: build.query<GetLocationsSuccessResponse, MaybeUndefined<GetLocationsQueryArgs>>({
      query: (params) => ({
        url: CatalogsApiEnum.GetLocations,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getFaChangeTypes: build.query<
      GetFaChangeTypesSuccessResponse,
      MaybeUndefined<GetFaChangeTypesQueryArgs>
    >({
      query: () => ({
        url: CatalogsApiEnum.GetFaChangeTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const {
  useGetTimeZoneListQuery,

  useGetSubTaskTemplateListQuery,

  useGetUserStatusListQuery,

  useGetLocationsQuery,
  useLazyGetLocationsQuery,

  useGetFaChangeTypesQuery,

  endpoints,
} = catalogsApiService
