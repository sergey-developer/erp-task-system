import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import {
  LoginMutationArgs,
  LoginSuccessResponse,
  LogoutMutationArgs,
  LogoutSuccessResponse,
} from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const authApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginSuccessResponse, LoginMutationArgs>({
      query: (queryArg) => ({
        url: AuthEndpointsEnum.Login,
        method: HttpMethodEnum.Post,
        data: queryArg,
      }),
    }),
    logout: build.mutation<LogoutSuccessResponse, LogoutMutationArgs>({
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
