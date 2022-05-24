import { HttpMethodEnums } from 'shared/constants/http'
import { api } from 'shared/services/api'

import {
  GetTaskListApiArg,
  GetTaskListBaseApiResponse,
  GetTaskListTransformedApiResponse,
} from './taskList/models'
import {
  GetOneTaskByIdQueryArgsModel,
  GetOneTaskByIdResponseModel,
} from './taskView/models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    taskList: build.query<GetTaskListTransformedApiResponse, GetTaskListApiArg>(
      {
        query: (data) => ({
          url: '/tasks/view',
          method: HttpMethodEnums.GET,
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
    getOneTaskById: build.query<
      GetOneTaskByIdResponseModel,
      GetOneTaskByIdQueryArgsModel
    >({
      query: (id) => ({
        url: `/tasks/view/${id}`,
        method: HttpMethodEnums.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useTaskListQuery, useGetOneTaskByIdQuery } = tasksService
