import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
} from 'shared/catalogs/models/subTaskTemplates'
import { HttpMethodEnum } from 'shared/constants/http'

const subTaskTemplatesCatalogEndpoints = baseApiService.injectEndpoints({
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
