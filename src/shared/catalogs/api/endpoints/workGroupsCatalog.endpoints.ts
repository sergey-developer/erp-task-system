import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetWorkGroupsCatalogQueryArgs,
  GetWorkGroupsCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/workGroups'
import { HttpMethodEnum } from 'shared/constants/http'

const workGroupsCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupsCatalog: build.query<
      GetWorkGroupsCatalogSuccessResponse,
      GetWorkGroupsCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogsApiEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWorkGroupsCatalogQuery } = workGroupsCatalogEndpoints
