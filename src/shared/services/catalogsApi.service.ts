import { CatalogsApiEnum } from 'shared/constants/catalogs'
import { HttpMethodEnum } from 'shared/constants/http'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'shared/models/catalogs'

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
  }),
})

export const { useGetTimeZoneListQuery, useGetSubTaskTemplateListQuery, endpoints } =
  catalogsApiService
