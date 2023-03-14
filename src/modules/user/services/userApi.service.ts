import { UserEndpointEnum } from 'modules/user/constants/api'
import {
  GetUserCodeQueryArgs,
  GetUserCodeSuccessResponse,
  GetUserProfileQueryArgs,
  GetUserProfileSuccessResponse,
} from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const userApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<
      GetUserProfileSuccessResponse,
      GetUserProfileQueryArgs
    >({
      query: () => ({
        url: UserEndpointEnum.GetUserProfile,
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserCode: build.query<GetUserCodeSuccessResponse, GetUserCodeQueryArgs>({
      query: () => ({
        url: UserEndpointEnum.GetUserCode,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserProfileQuery,
  useGetUserCodeQuery,
  endpoints: userApiEndpoints,
} = userApiService
