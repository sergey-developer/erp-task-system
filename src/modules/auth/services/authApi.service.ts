import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import {
  LoginMutationArgsModel,
  LoginResponseModel,
  LogoutMutationArgsModel,
} from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const authApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseModel, LoginMutationArgsModel>({
      query: (queryArg) => ({
        url: AuthEndpointsEnum.Login,
        method: HttpMethodEnum.POST,
        data: queryArg,
      }),
    }),
    logout: build.mutation<void, LogoutMutationArgsModel>({
      query: (queryArg) => ({
        url: AuthEndpointsEnum.Logout,
        method: HttpMethodEnum.POST,
        data: queryArg,
      }),
    }),
  }),

  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation } = authApiService
