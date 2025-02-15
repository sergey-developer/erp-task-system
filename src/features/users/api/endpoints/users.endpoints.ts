import { TasksEndpointsTagsEnum } from 'features/tasks/api/constants'
import { UsersApiPathsEnum, UsersEndpointsTagsEnum } from 'features/users/api/constants'
import { UserDetailDTO } from 'features/users/api/dto'
import {
  makeGetUserActionsApiPath,
  makeGetWarehouseMSIApiPath,
  makeUpdateUserApiPath,
  makeUpdateUserStatusApiPath,
} from 'features/users/api/helpers'
import {
  GetUserActionsRequest,
  GetUserActionsResponse,
  GetUserMeCodeRequest,
  GetUserMeCodeResponse,
  GetUserMeRequest,
  GetUserMeResponse,
  GetUsersGroupsRequest,
  GetUsersGroupsResponse,
  GetUsersRequest,
  GetUsersResponse,
  GetWarehouseMSIRequest,
  GetWarehouseMSIResponse,
  UpdateUserStatusRequest,
  UpdateUserStatusResponse,
  UpdateUserTimeZoneRequest,
  UpdateUserTimeZoneResponse,
} from 'features/users/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const usersEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersResponse, MaybeUndefined<GetUsersRequest>>({
      query: (params) => ({
        url: UsersApiPathsEnum.GetUsers,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    updateUserTimeZone: build.mutation<UpdateUserTimeZoneResponse, UpdateUserTimeZoneRequest>({
      invalidatesTags: (result, error) =>
        error ? [] : [TasksEndpointsTagsEnum.Tasks, TasksEndpointsTagsEnum.Task],
      query: ({ userId, ...payload }) => ({
        url: makeUpdateUserApiPath(userId),
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
    updateUserStatus: build.mutation<UpdateUserStatusResponse, UpdateUserStatusRequest>({
      query: ({ userId, ...payload }) => ({
        url: makeUpdateUserStatusApiPath(userId),
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
    }),

    getUserMe: build.query<GetUserMeResponse, GetUserMeRequest>({
      query: () => ({
        url: UsersApiPathsEnum.GetUserMe,
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserMeCode: build.query<GetUserMeCodeResponse, GetUserMeCodeRequest>({
      query: () => ({
        url: UsersApiPathsEnum.GetUserMeCode,
        method: HttpMethodEnum.Get,
      }),
    }),

    getUsersGroups: build.query<GetUsersGroupsResponse, MaybeUndefined<GetUsersGroupsRequest>>({
      query: (params) => ({
        url: UsersApiPathsEnum.GetUsersGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),

    getWarehouseMSI: build.query<GetWarehouseMSIResponse, GetWarehouseMSIRequest>({
      query: ({ userId }) => ({
        url: makeGetWarehouseMSIApiPath(userId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getUserActions: build.query<GetUserActionsResponse, GetUserActionsRequest>({
      providesTags: (result, error) => (error ? [] : [UsersEndpointsTagsEnum.UserActions]),
      query: ({ userId }) => ({
        url: makeGetUserActionsApiPath(userId),
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
