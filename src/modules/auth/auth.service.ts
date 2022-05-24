import MethodEnums from 'shared/constants/http'
import { api } from 'shared/services/api'

import { GetTaskListBaseApiResponse } from '../tasks/models'
import { LoginApiArg, LoginApiResponse } from './models'

const authService = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: '/user/auth',
        method: MethodEnums.POST,
        data: queryArg,
      }),
    }),
  }),

  overrideExisting: false,
})

export { authService }

export const { useLoginMutation } = authService
