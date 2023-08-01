import { AuthEndpointsEnum } from 'modules/auth/constants'
import {
  LoginMutationArgs,
  LoginSuccessResponse,
  LogoutMutationArgs,
  LogoutSuccessResponse,
  UpdatePasswordMutationArgs,
  UpdatePasswordSuccessResponse,
} from 'modules/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const authApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginSuccessResponse, LoginMutationArgs>({
      query: (payload) => ({
        url: AuthEndpointsEnum.Login,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    logout: build.mutation<LogoutSuccessResponse, LogoutMutationArgs>({
      query: (payload) => ({
        url: AuthEndpointsEnum.Logout,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    updatePassword: build.mutation<
      UpdatePasswordSuccessResponse,
      UpdatePasswordMutationArgs
    >({
      query: (payload) => ({
        url: AuthEndpointsEnum.UpdatePassword,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
  }),

  overrideExisting: false,
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useUpdatePasswordMutation,
} = authApiService
