import MethodEnums from 'shared/constants/http'
import { api } from 'shared/services/api'

import { GetTaskListApiArg, GetTaskListApiResponse } from './models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    taskList: build.query<GetTaskListApiResponse, GetTaskListApiArg>({
      query: (data) => ({
        url: '/tasks/view/',
        method: MethodEnums.GET,
        params: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useTaskListQuery } = tasksService
