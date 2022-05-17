import MethodEnums from 'shared/constants/http'
import { api } from 'shared/services/api'

import { TasksListApiResponse } from './models'

const tasksService = api.injectEndpoints({
  endpoints: (build) => ({
    tasksList: build.query<TasksListApiResponse, { page?: number }>({
      query: ({ page }) => ({
        url: `https://jsonplaceholder.typicode.com/posts?page=${page}`,
        method: MethodEnums.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export { tasksService }

export const { useTasksListQuery } = tasksService
