import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import {
  LoginMutationArgsModel,
  LoginResponseModel,
  LogoutMutationArgsModel,
  LogoutResponseModel,
} from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const authApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseModel, LoginMutationArgsModel>({
      query: (queryArg) => ({
        url: AuthEndpointsEnum.Login,
        method: HttpMethodEnum.Post,
        data: queryArg,
      }),
    }),
    logout: build.mutation<LogoutResponseModel, LogoutMutationArgsModel>({
      query: (queryArg) => ({
        url: AuthEndpointsEnum.Logout,
        method: HttpMethodEnum.Post,
        data: queryArg,
      }),
    }),
  }),

  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation } = authApiService
