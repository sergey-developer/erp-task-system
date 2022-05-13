import { MethodEnums } from 'shared/constants/http'
import { api } from 'shared/services/api'

import {
  LoginApiArg,
  LoginApiResponse,
  UserRefreshCreateApiArg,
  UserRefreshCreateApiResponse,
} from './models'

const authService = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/user/auth`,
        method: MethodEnums.POST,
        data: queryArg,
      }),
    }),
    userRefreshCreate: build.mutation<
      UserRefreshCreateApiResponse,
      UserRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/user/refresh`,
        method: MethodEnums.POST,
        data: queryArg,
      }),
    }),
  }),
  overrideExisting: false,
})

export { authService }

export const { useLoginMutation, useUserRefreshCreateMutation } = authService
