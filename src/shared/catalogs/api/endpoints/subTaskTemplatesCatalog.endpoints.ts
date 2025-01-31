import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'shared/catalogs/api/dto/subTaskTemplates'
import { HttpMethodEnum } from 'shared/constants/http'

const subTaskTemplatesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubTaskTemplatesCatalog: build.query<
      GetSubTaskTemplateListSuccessResponse,
      GetSubTaskTemplateListQueryArgs
    >({
      query: (params) => ({
        url: CatalogsApiEnum.GetSubTaskTemplates,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetSubTaskTemplatesCatalogQuery } = subTaskTemplatesCatalogEndpoints
