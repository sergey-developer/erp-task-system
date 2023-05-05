import { UserEndpointEnum } from 'modules/user/constants/api'
import {
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse,
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse,
  UpdateUserMutationArgs,
  UpdateUserSuccessResponse,
  UserModel,
} from 'modules/user/models'
import { updateUserUrl } from 'modules/user/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const userApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    updateUser: build.mutation<
      UpdateUserSuccessResponse,
      UpdateUserMutationArgs
    >({
      query: ({ userId, ...payload }) => ({
        url: updateUserUrl(userId),
        method: HttpMethodEnum.Patch,
        data: payload,
      }),
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled

          dispatch(
            baseApiService.util.updateQueryData(
              'getUserMe' as never,
              undefined as never,
              (user: UserModel) => {
                Object.assign(user, updatedUser)
              },
            ),
          )
        } catch {}
      },
    }),
    getUserMe: build.query<GetUserMeSuccessResponse, GetUserMeQueryArgs>({
      query: () => ({
        url: UserEndpointEnum.GetUserMe,
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserMeCode: build.query<
      GetUserMeCodeSuccessResponse,
      GetUserMeCodeQueryArgs
    >({
      query: () => ({
        url: UserEndpointEnum.GetUserMeCode,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserMeQuery,
  useGetUserMeCodeQuery,
  useUpdateUserMutation,
  endpoints: userApiEndpoints,
} = userApiService
