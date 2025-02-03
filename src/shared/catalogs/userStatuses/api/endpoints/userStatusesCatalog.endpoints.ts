import { baseApi } from 'shared/api/baseApi'
import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse,
} from 'shared/catalogs/api/endpoints/userStatuses/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const userStatusesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserStatusesCatalog: build.query<
      GetUserStatusesCatalogSuccessResponse,
      GetUserStatusesCatalogQueryArgs
    >({
      query: () => ({
        url: CatalogEndpointsEnum.GetUserStatuses,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetUserStatusesCatalogQuery, endpoints } = userStatusesCatalogEndpoints
