import { CatalogsApiEnum } from 'shared/constants/catalogs'
import { HttpMethodEnum } from 'shared/constants/http'
import {
  GetFaChangeTypesQueryArgs,
  GetFaChangeTypesSuccessResponse,
} from 'shared/models/catalogs/faChangeTypes'
import {
  GetInfrastructureWorkTypesQueryArgs,
  GetInfrastructureWorkTypesSuccessResponse,
} from 'shared/models/catalogs/infrastructureWorkTypes'
import {
  GetLocationsCatalogQueryArgs,
  GetLocationsCatalogSuccessResponse,
} from 'shared/models/catalogs/locations'
import {
  GetResolutionClassificationsQueryArgs,
  GetResolutionClassificationsSuccessResponse,
} from 'shared/models/catalogs/resolutionClassifications'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'shared/models/catalogs/subTaskTemplate'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from 'shared/models/catalogs/timeZone'
import {
  GetUrgencyRateTypesQueryArgs,
  GetUrgencyRateTypesSuccessResponse,
} from 'shared/models/catalogs/urgencyRateTypes'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/models/catalogs/userStatus'
import {
  GetWorkGroupsCatalogQueryArgs,
  GetWorkGroupsCatalogSuccessResponse,
} from 'shared/models/catalogs/workGroups'
import { MaybeUndefined } from 'shared/types/utils'

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

    getFaChangeTypes: build.query<
      GetFaChangeTypesSuccessResponse,
      MaybeUndefined<GetFaChangeTypesQueryArgs>
    >({
      query: () => ({
        url: CatalogsApiEnum.GetFaChangeTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
    getResolutionClassifications: build.query<
      GetResolutionClassificationsSuccessResponse,
      GetResolutionClassificationsQueryArgs
    >({
      query: (params) => ({
        url: CatalogsApiEnum.GetResolutionClassifications,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getWorkGroupsCatalog: build.query<
      GetWorkGroupsCatalogSuccessResponse,
      GetWorkGroupsCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogsApiEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
      }),
    }),
    getInfrastructureWorkTypes: build.query<
      GetInfrastructureWorkTypesSuccessResponse,
      GetInfrastructureWorkTypesQueryArgs
    >({
      query: () => ({
        url: CatalogsApiEnum.GetInfrastructureWorkTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
    getUrgencyRateTypes: build.query<
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

export const {
  useGetTimeZoneListQuery,

  useGetSubTaskTemplateListQuery,

  useGetUserStatusListQuery,

  useGetLocationsCatalogQuery,
  useLazyGetLocationsCatalogQuery,

  useGetFaChangeTypesQuery,

  useGetResolutionClassificationsQuery,

  useGetWorkGroupsCatalogQuery,

  useGetInfrastructureWorkTypesQuery,

  useGetUrgencyRateTypesQuery,

  endpoints,
} = catalogsApiService
