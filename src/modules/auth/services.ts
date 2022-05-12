import { api } from 'shared/services/api'

import {
  LoginApiArg,
  LoginApiResponse,
  UserRefreshCreateApiArg,
  UserRefreshCreateApiResponse,
} from './models'

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/user/auth`,
        method: 'POST',
        data: queryArg,
      }),
    }),
    userRefreshCreate: build.mutation<
      UserRefreshCreateApiResponse,
      UserRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/refresh`,
        method: 'POST',
        data: queryArg,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }

export const { useLoginMutation, useUserRefreshCreateMutation } = injectedRtkApi
