import { baseApi } from 'shared/api/baseApi'
import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUserStatusesCatalogRequest,
  GetUserStatusesCatalogResponse,
} from 'shared/catalogs/userStatuses/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

const userStatusesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserStatusesCatalog: build.query<
      GetUserStatusesCatalogResponse,
      GetUserStatusesCatalogRequest
    >({
      query: () => ({
        url: CatalogApiPathsEnum.GetUserStatuses,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetUserStatusesCatalogQuery, endpoints } = userStatusesCatalogEndpoints
