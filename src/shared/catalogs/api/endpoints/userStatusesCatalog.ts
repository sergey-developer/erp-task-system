import { baseApiService } from 'shared/api/services/baseApi'
import { CatalogsApiEnum } from 'shared/catalogs/api/constants/endpoints'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/catalogs/models/userStatuses'
import { HttpMethodEnum } from 'shared/constants/http'

const userStatusesCatalogEndpoints = baseApiService.injectEndpoints({
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
