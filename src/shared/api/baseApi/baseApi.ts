import { createApi } from '@reduxjs/toolkit/query/react'
import { TaskApiTagEnum } from 'features/task/constants/task'
import { UsersEndpointsTagsEnum } from 'features/users/api/constants'
import { RelocationEquipmentApiTagEnum } from 'features/warehouse/constants/relocationEquipment'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME_LIFE } from './constants'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  tagTypes: [
    TaskApiTagEnum.Task,
    TaskApiTagEnum.Tasks,
    RelocationEquipmentApiTagEnum.RelocationEquipmentAttachments,
    UsersEndpointsTagsEnum.UserActions,
  ],
  endpoints: () => ({}),
})
