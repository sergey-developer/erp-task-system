import { baseApi } from 'shared/api/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/catalogs/api/dto/userStatuses'
import { HttpMethodEnum } from 'shared/constants/http'

const userStatusesCatalogEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserStatusesCatalog: build.query<
      GetUserStatusListSuccessResponse,
      GetUserStatusListQueryArgs
    >({
      query: () => ({
        url: CatalogsApiEnum.GetUserStatuses,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetUserStatusesCatalogQuery, endpoints } = userStatusesCatalogEndpoints
