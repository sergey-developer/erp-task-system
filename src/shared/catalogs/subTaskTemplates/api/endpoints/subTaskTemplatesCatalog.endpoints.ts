import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetSubTaskTemplatesCatalogRequest,
  GetSubTaskTemplatesCatalogResponse,
} from 'shared/catalogs/subTaskTemplates/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const subTaskTemplatesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubTaskTemplatesCatalog: build.query<
      GetSubTaskTemplatesCatalogResponse,
      GetSubTaskTemplatesCatalogRequest
    >({
      query: (params) => ({
        url: CatalogApiPathsEnum.GetSubTaskTemplates,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetSubTaskTemplatesCatalogQuery } = subTaskTemplatesCatalogEndpoints
