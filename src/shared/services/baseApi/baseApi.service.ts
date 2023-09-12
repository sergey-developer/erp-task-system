import { createApi } from '@reduxjs/toolkit/query/react'

import { TaskApiTagEnum } from 'modules/task/services/taskApiService'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME_LIFE } from './constants'

export const baseApiService = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  tagTypes: [TaskApiTagEnum.Task, TaskApiTagEnum.TaskList],
  endpoints: () => ({}),
})
