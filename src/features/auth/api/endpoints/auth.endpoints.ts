import { AuthApiPathsEnum } from 'features/auth/api/constants'
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from 'features/auth/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const authEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (payload) => ({
        url: AuthApiPathsEnum.Login,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    logout: build.mutation<LogoutResponse, LogoutRequest>({
      query: (payload) => ({
        url: AuthApiPathsEnum.Logout,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    updatePassword: build.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: (payload) => ({
        url: AuthApiPathsEnum.UpdatePassword,
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useUpdatePasswordMutation } = authEndpoints
