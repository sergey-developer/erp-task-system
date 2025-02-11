import { TaskApiTagEnum } from 'features/task/constants/task'
import { UsersEndpointsEnum, UsersEndpointsTagsEnum } from 'features/users/api/constants'
import { UserDetailDTO } from 'features/users/api/dto'
import {
  makeGetUserActionsEndpoint,
  makeGetWarehouseMSIEndpoint,
  makeUpdateUserEndpoint,
  makeUpdateUserStatusEndpoint,
} from 'features/users/api/helpers'
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
} from 'features/users/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const usersEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersSuccessResponse, MaybeUndefined<GetUsersQueryArgs>>({
      query: (params) => ({
        url: UsersEndpointsEnum.GetUsers,
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
        url: makeUpdateUserEndpoint(userId),
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
              (user: UserDetailDTO) => {
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
          url: makeUpdateUserStatusEndpoint(userId),
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
                (user: UserDetailDTO) => {
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
        url: UsersEndpointsEnum.GetUserMe,
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserMeCode: build.query<GetUserMeCodeSuccessResponse, GetUserMeCodeQueryArgs>({
      query: () => ({
        url: UsersEndpointsEnum.GetUserMeCode,
        method: HttpMethodEnum.Get,
      }),
    }),

    getUsersGroups: build.query<
      GetUsersGroupsSuccessResponse,
      MaybeUndefined<GetUsersGroupsQueryArgs>
    >({
      query: (params) => ({
        url: UsersEndpointsEnum.GetUsersGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),

    getWarehouseMSI: build.query<GetWarehouseMSISuccessResponse, GetWarehouseMSIQueryArgs>({
      query: ({ userId }) => ({
        url: makeGetWarehouseMSIEndpoint(userId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserActions: build.query<GetUserActionsSuccessResponse, GetUserActionsQueryArgs>({
      providesTags: (result, error) => (error ? [] : [UsersEndpointsTagsEnum.UserActions]),
      query: ({ userId }) => ({
        url: makeGetUserActionsEndpoint(userId),
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
