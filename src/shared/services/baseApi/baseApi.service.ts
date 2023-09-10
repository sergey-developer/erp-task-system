import { createApi } from '@reduxjs/toolkit/query/react'

import { TaskApiTagEnum } from 'modules/task/constants'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME_LIFE } from './constants'

export const baseApiService = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  /** Перенести в сервис task? */
  tagTypes: [TaskApiTagEnum.Task, TaskApiTagEnum.TaskList],
  endpoints: () => ({}),
})
