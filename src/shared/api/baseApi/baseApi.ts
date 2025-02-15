import { createApi } from '@reduxjs/toolkit/query/react'
import { RelocationEquipmentsEndpointsTagsEnum } from 'features/relocationEquipments/api/constants'
import { TasksEndpointsTagsEnum } from 'features/tasks/api/constants'
import { UsersEndpointsTagsEnum } from 'features/users/api/constants'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME_LIFE } from './constants'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  tagTypes: [
    TasksEndpointsTagsEnum.Task,
    TasksEndpointsTagsEnum.Tasks,
    RelocationEquipmentsEndpointsTagsEnum.RelocationEquipmentAttachments,
    UsersEndpointsTagsEnum.UserActions,
  ],
  endpoints: () => ({}),
})
