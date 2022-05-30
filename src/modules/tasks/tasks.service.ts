import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

import { GetTaskListTransformedResponse } from './taskList/interfaces'
import {
  GetTaskListQueryArgsModel,
  GetTaskListResponseModel,
} from './taskList/models'
import {
  GetTaskByIdQueryArgsModel,
  GetTaskByIdResponseModel,
} from './taskView/models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    getTaskList: build.query<
      GetTaskListTransformedResponse,
      GetTaskListQueryArgsModel
    >({
      query: (data) => ({
        url: '/tasks',
        method: HttpMethodEnum.GET,
        params: data,
      }),
      // todo: вынести трансформацию ответа под ант пагинацию в общий модуль
      transformResponse: (response: GetTaskListResponseModel, meta, arg) => {
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
    getTaskById: build.query<
      GetTaskByIdResponseModel,
      GetTaskByIdQueryArgsModel
    >({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useGetTaskListQuery, useGetTaskByIdQuery } = tasksService
