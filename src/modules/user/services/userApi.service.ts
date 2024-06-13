import { TaskApiTagEnum } from 'modules/task/constants/task'
import { UserApiEnum } from 'modules/user/constants'
import {
  GetUserMeCodeQueryArgs,
  GetUserMeCodeSuccessResponse,
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse,
  GetUsersGroupsQueryArgs,
  GetUsersGroupsSuccessResponse,
  GetUsersQueryArgs,
  GetUsersSuccessResponse,
  GetWarehouseMSIQueryArgs,
  GetWarehouseMSISuccessResponse,
  UpdateUserStatusMutationArgs,
  UpdateUserStatusSuccessResponse,
  UpdateUserTimeZoneMutationArgs,
  UpdateUserTimeZoneSuccessResponse,
  UserModel,
} from 'modules/user/models'
import { getWarehouseMSIUrl, updateUserStatusUrl, updateUserUrl } from 'modules/user/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const userApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersSuccessResponse, MaybeUndefined<GetUsersQueryArgs>>({
      query: (params) => ({
        url: UserApiEnum.GetUsers,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    updateUserTimeZone: build.mutation<
      UpdateUserTimeZoneSuccessResponse,
      UpdateUserTimeZoneMutationArgs
    >({
      invalidatesTags: (result, error) =>
        error ? [] : [TaskApiTagEnum.TaskList, TaskApiTagEnum.Task],
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
    updateUserStatus: build.mutation<UpdateUserStatusSuccessResponse, UpdateUserStatusMutationArgs>(
      {
        query: ({ userId, ...payload }) => ({
          url: updateUserStatusUrl(userId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApiService.util.updateQueryData(
                'getUserMe' as never,
                undefined as never,
                (user: UserModel) => {
                  Object.assign(user, { status: data })
                },
              ),
            )
          } catch {}
        },
      },
    ),

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

    getUsersGroups: build.query<GetUsersGroupsSuccessResponse, GetUsersGroupsQueryArgs>({
      query: () => ({
        url: UserApiEnum.GetUsersGroups,
        method: HttpMethodEnum.Get,
      }),
    }),

    getWarehouseMSI: build.query<GetWarehouseMSISuccessResponse, GetWarehouseMSIQueryArgs>({
      query: ({ userId }) => ({
        url: getWarehouseMSIUrl(userId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserMeQuery,
  useGetUserMeCodeQuery,

  useGetUsersQuery,
  useUpdateUserTimeZoneMutation,
  useUpdateUserStatusMutation,

  useGetUsersGroupsQuery,

  useGetWarehouseMSIQuery,
  endpoints,
} = userApiService
