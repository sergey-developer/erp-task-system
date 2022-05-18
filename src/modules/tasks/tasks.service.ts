import MethodEnums from 'shared/constants/http'
import { api } from 'shared/services/api'

import { GetTasksListApiArg, GetTasksListApiResponse } from './models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    tasksList: build.query<GetTasksListApiResponse, GetTasksListApiArg>({
      query: (data) => ({
        url: `/tasks/view/`,
        method: MethodEnums.GET,
        params: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useTasksListQuery } = tasksService
