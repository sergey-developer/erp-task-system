import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetWorkGroupsCatalogRequest,
  GetWorkGroupsCatalogResponse,
} from 'shared/catalogs/api/endpoints/workGroups/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const workGroupsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupsCatalog: build.query<GetWorkGroupsCatalogResponse, GetWorkGroupsCatalogRequest>({
      query: () => ({
        url: CatalogApiPathsEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWorkGroupsCatalogQuery } = workGroupsCatalogEndpoints
