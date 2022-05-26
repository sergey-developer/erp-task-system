import { LoginApiArg, LoginApiResponse } from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const authService = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: '/user/auth',
        method: HttpMethodEnum.POST,
        data: queryArg,
      }),
    }),
  }),

  overrideExisting: false,
})

export { authService }

export const { useLoginMutation } = authService
