import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

import {
  GetTaskListApiArg,
  GetTaskListBaseApiResponse,
  GetTaskListTransformedApiResponse,
} from './taskList/models'
import {
  GetTaskByIdQueryArgsModel,
  GetTaskByIdResponseModel,
} from './taskView/models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    taskList: build.query<GetTaskListTransformedApiResponse, GetTaskListApiArg>(
      {
        query: (data) => ({
          url: '/tasks/view',
          method: HttpMethodEnum.GET,
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
    getTaskById: build.query<
      GetTaskByIdResponseModel,
      GetTaskByIdQueryArgsModel
    >({
      query: (id) => ({
        url: `/tasks/view/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useTaskListQuery, useGetTaskByIdQuery } = tasksService
