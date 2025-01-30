import { AuthApiEnum } from 'features/auth/constants'
import {
  LoginMutationArgs,
  LoginSuccessResponse,
  LogoutMutationArgs,
  LogoutSuccessResponse,
  UpdatePasswordMutationArgs,
  UpdatePasswordSuccessResponse,
} from 'features/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

const authApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginSuccessResponse, LoginMutationArgs>({
      query: (payload) => ({
        url: AuthApiEnum.Login,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    logout: build.mutation<LogoutSuccessResponse, LogoutMutationArgs>({
      query: (payload) => ({
        url: AuthApiEnum.Logout,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    updatePassword: build.mutation<UpdatePasswordSuccessResponse, UpdatePasswordMutationArgs>({
      query: (payload) => ({
        url: AuthApiEnum.UpdatePassword,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
  }),

  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation, useUpdatePasswordMutation } = authApiService
