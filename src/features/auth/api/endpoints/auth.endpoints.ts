import {
  LoginMutationArgs,
  LoginSuccessResponse,
  LogoutMutationArgs,
  LogoutSuccessResponse,
  UpdatePasswordMutationArgs,
  UpdatePasswordSuccessResponse,
} from 'features/auth/api/schemas'
import { AuthEndpointsEnum } from 'features/auth/constants'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const authEndpoints = baseApi.injectEndpoints({
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
    updatePassword: build.mutation<UpdatePasswordSuccessResponse, UpdatePasswordMutationArgs>({
      query: (payload) => ({
        url: AuthEndpointsEnum.UpdatePassword,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useUpdatePasswordMutation } = authEndpoints
