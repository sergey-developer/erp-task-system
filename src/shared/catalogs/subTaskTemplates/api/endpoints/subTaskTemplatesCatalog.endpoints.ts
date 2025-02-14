import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetSubTaskTemplatesCatalogRequest,
  GetSubTaskTemplatesCatalogResponse,
} from 'shared/catalogs/api/endpoints/subTaskTemplates/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const subTaskTemplatesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubTaskTemplatesCatalog: build.query<
      GetSubTaskTemplatesCatalogResponse,
      GetSubTaskTemplatesCatalogRequest
    >({
      query: (params) => ({
        url: CatalogEndpointsEnum.GetSubTaskTemplates,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetSubTaskTemplatesCatalogQuery } = subTaskTemplatesCatalogEndpoints
