import {
  LoginMutationArgsModel,
  LoginResponseModel,
  LogoutMutationArgsModel,
} from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const authService = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponseModel, LoginMutationArgsModel>({
      query: (queryArg) => ({
        url: '/user/auth',
        method: HttpMethodEnum.POST,
        data: queryArg,
      }),
    }),
    logout: build.mutation<unknown, LogoutMutationArgsModel>({
      query: (queryArg) => ({
        url: '/user/logout',
        method: HttpMethodEnum.POST,
        data: queryArg,
      }),
    }),
  }),

  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation } = authService
export default authService
