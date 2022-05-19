import MethodEnums from 'shared/constants/http'
import { api } from 'shared/services/api'

import {
  GetTaskListApiArg,
  GetTaskListBaseApiResponse,
  GetTaskListTransformedApiResponse,
} from './models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    taskList: build.query<GetTaskListTransformedApiResponse, GetTaskListApiArg>(
      {
        query: (data) => ({
          url: '/tasks/view/',
          method: MethodEnums.GET,
          params: data,
        }),
        transformResponse: (
          response: GetTaskListBaseApiResponse,
          meta,
          arg,
        ) => {
          console.group('transforming response')
          console.log('response', response)
          console.log('meta', meta)
          console.log('arg', arg)
          console.groupEnd()
          return {
            pagination: {
              current: arg.offset / arg.limit,
              pageSize: arg.limit,
              total: response.count,
            },
            results: response.results,
          }
        },
      },
    ),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useTaskListQuery } = tasksService
