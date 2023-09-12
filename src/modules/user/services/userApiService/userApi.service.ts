import { TaskApiTagEnum } from 'modules/task/services/taskApiService'
import { UserApiEnum } from 'modules/user/services/userApiService'
import {
  GetUserListQueryArgs,
  GetUserListSuccessResponse,
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse,
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse,
  UpdateUserStatusMutationArgs,
  UpdateUserStatusSuccessResponse,
  UpdateUserTimeZoneMutationArgs,
  UpdateUserTimeZoneSuccessResponse,
  UserModel,
} from 'modules/user/models'
import { updateUserStatusUrl, updateUserUrl } from 'modules/user/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const userApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getUserList: build.query<GetUserListSuccessResponse, GetUserListQueryArgs>({
      query: (params) => ({
        url: UserApiEnum.GetUserList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
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
    getUserMeCode: build.query<GetUserMeCodeSuccessResponse, GetUserMeCodeQueryArgs>({
      query: () => ({
        url: UserApiEnum.GetUserMeCode,
        method: HttpMethodEnum.Get,
      }),
    }),
    updateUserStatus: build.mutation<UpdateUserStatusSuccessResponse, UpdateUserStatusMutationArgs>(
      {
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
      },
    ),
  }),
  overrideExisting: false,
})

export const {
  useGetUserMeQuery,
  useGetUserMeCodeQuery,
  useGetUserListQuery,
  useUpdateUserTimeZoneMutation,
  useUpdateUserStatusMutation,
  endpoints,
} = userApiService
