import { UserEndpointEnum } from 'modules/user/constants/api'
import {
  GetUserProfileQueryArgsModel,
  GetUserProfileResponseModel,
} from 'modules/user/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const userApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getUserProfile: build.query<
      GetUserProfileResponseModel,
      GetUserProfileQueryArgsModel
    >({
      query: () => ({
        url: UserEndpointEnum.GetUserProfile,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserProfileQuery, endpoints: userApiEndpoints } =
  userApiService
