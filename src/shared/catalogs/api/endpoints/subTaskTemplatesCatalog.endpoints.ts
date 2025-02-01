import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetSubTaskTemplatesCatalogQueryArgs,
  GetSubTaskTemplatesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/subTaskTemplates'
import { HttpMethodEnum } from 'shared/constants/http'

const subTaskTemplatesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSubTaskTemplatesCatalog: build.query<
      GetSubTaskTemplatesCatalogSuccessResponse,
      GetSubTaskTemplatesCatalogQueryArgs
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
