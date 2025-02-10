import { TaskApiTagEnum } from 'features/task/constants/task'
import { UserApiEnum, UsersApiTagEnum } from 'features/user/api/constants'
import {
  GetUserActionsQueryArgs,
  GetUserActionsSuccessResponse,
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
} from 'features/user/api/dto'
import {
  getUserActionsUrl,
  getWarehouseMSIUrl,
  updateUserStatusUrl,
  updateUserUrl,
} from 'features/user/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const usersEndpoints = baseApi.injectEndpoints({
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
        error ? [] : [TaskApiTagEnum.Tasks, TaskApiTagEnum.Task],
      query: ({ userId, ...payload }) => ({
        url: updateUserUrl(userId),
        method: HttpMethodEnum.Patch,
        data: payload,
      }),
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        try {
          const { data: updatedUser } = await queryFulfilled

          dispatch(
            baseApi.util.updateQueryData(
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
              baseApi.util.updateQueryData(
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

    getUsersGroups: build.query<
      GetUsersGroupsSuccessResponse,
      MaybeUndefined<GetUsersGroupsQueryArgs>
    >({
      query: (params) => ({
        url: UserApiEnum.GetUsersGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),

    getWarehouseMSI: build.query<GetWarehouseMSISuccessResponse, GetWarehouseMSIQueryArgs>({
      query: ({ userId }) => ({
        url: getWarehouseMSIUrl(userId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserActions: build.query<GetUserActionsSuccessResponse, GetUserActionsQueryArgs>({
      providesTags: (result, error) => (error ? [] : [UsersApiTagEnum.UserActions]),
      query: ({ userId }) => ({
        url: getUserActionsUrl(userId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const {
  useGetUserMeQuery,
  useGetUserMeCodeQuery,

  useGetUsersQuery,
  useUpdateUserTimeZoneMutation,
  useUpdateUserStatusMutation,

  useGetUsersGroupsQuery,

  useGetWarehouseMSIQuery,
  useGetUserActionsQuery,
  endpoints,
} = usersEndpoints
