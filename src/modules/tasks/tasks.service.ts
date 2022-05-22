import MethodEnums from 'shared/constants/http'
import { api } from 'shared/services/api'

import {
  GetTaskListApiArg,
  GetTaskListBaseApiResponse,
  GetTaskListTransformedApiResponse,
} from './taskList/models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    taskList: build.query<GetTaskListTransformedApiResponse, GetTaskListApiArg>(
      {
        query: (data) => ({
          url: '/tasks/view',
          method: MethodEnums.GET,
          params: data,
        }),
        // todo: вынести трансформацию ответа под ант пагинацию в общий модуль
        transformResponse: (
          response: GetTaskListBaseApiResponse,
          meta,
          arg,
        ) => {
          return {
            pagination: {
              current: arg.offset / arg.limit + 1,
              pageSize: arg.limit,
              total: response.count,
            },
            results: response.results,
          }
        },
      },
    ),
    getOneTask: build.query<
      GetTaskListTransformedApiResponse,
      GetTaskListApiArg
    >({
      query: (data) => ({
        url: '/tasks/view',
        method: MethodEnums.GET,
        params: data,
      }),
      // todo: вынести трансформацию ответа под ант пагинацию в общий модуль
      transformResponse: (response: GetTaskListBaseApiResponse, meta, arg) => {
        return {
          pagination: {
            current: arg.offset / arg.limit + 1,
            pageSize: arg.limit,
            total: response.count,
          },
          results: response.results,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useTaskListQuery } = tasksService
