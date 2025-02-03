import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetWorkGroupsCatalogQueryArgs,
  GetWorkGroupsCatalogSuccessResponse,
} from 'shared/catalogs/api/endpoints/workGroups/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const workGroupsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupsCatalog: build.query<
      GetWorkGroupsCatalogSuccessResponse,
      GetWorkGroupsCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWorkGroupsCatalogQuery } = workGroupsCatalogEndpoints
