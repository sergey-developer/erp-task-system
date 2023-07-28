import { TaskApiTagEnum } from 'modules/task/constants'
import { UserApiEnum } from 'modules/user/constants/api'
import {
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse,
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse,
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
  UpdateUserStatusMutationArgs,
  UpdateUserStatusSuccessResponse,
  UpdateUserTimeZoneMutationArgs,
  UpdateUserTimeZoneSuccessResponse,
  UserModel,
} from 'modules/user/models'
import { updateUserStatusUrl, updateUserUrl } from 'modules/user/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const userApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    updateUserTimeZone: build.mutation<
      UpdateUserTimeZoneSuccessResponse,
      UpdateUserTimeZoneMutationArgs
    >({
      query: ({ userId, ...payload }) => ({
        url: updateUserUrl(userId),
        method: HttpMethodEnum.Patch,
        data: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [TaskApiTagEnum.TaskList, TaskApiTagEnum.Task],
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
        url: UserApiEnum.GetUserMe,
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserMeCode: build.query<
      GetUserMeCodeSuccessResponse,
      GetUserMeCodeQueryArgs
    >({
      query: () => ({
        url: UserApiEnum.GetUserMeCode,
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserStatusList: build.query<
      GetUserStatusListSuccessResponse,
      GetUserStatusListQueryArgs
    >({
      query: () => ({
        url: UserApiEnum.GetUserStatusList,
        method: HttpMethodEnum.Get,
      }),
    }),
    updateUserStatus: build.mutation<
      UpdateUserStatusSuccessResponse,
      UpdateUserStatusMutationArgs
    >({
      query: ({ userId, ...payload }) => ({
        url: updateUserStatusUrl(userId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            baseApiService.util.updateQueryData(
              'getUserMe' as never,
              undefined as never,
              (user: UserModel) => {
                Object.assign(user, {
                  status: { ...user.status, id: payload.status },
                })
              },
            ),
          )
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserMeQuery,
  useGetUserMeCodeQuery,
  useGetUserStatusListQuery,
  useUpdateUserTimeZoneMutation,
  useUpdateUserStatusMutation,
  endpoints: userApiEndpoints,
} = userApiService
