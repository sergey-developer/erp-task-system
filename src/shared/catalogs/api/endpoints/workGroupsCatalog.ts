import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetWorkGroupsCatalogQueryArgs,
  GetWorkGroupsCatalogSuccessResponse,
} from 'shared/catalogs/models/workGroups'
import { HttpMethodEnum } from 'shared/constants/http'

const workGroupsCatalogEndpoints = baseApiService.injectEndpoints({
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
