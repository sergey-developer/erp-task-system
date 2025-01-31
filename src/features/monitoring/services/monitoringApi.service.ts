import {
  GetTaskMonitoringQueryArgs,
  GetTaskMonitoringSuccessResponse,
} from 'features/monitoring/models'
import { getTaskMonitoringUrl } from 'features/monitoring/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApi } from 'shared/api/baseApi'

const monitoringApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTaskMonitoring: build.query<GetTaskMonitoringSuccessResponse, GetTaskMonitoringQueryArgs>({
      query: (recordId) => ({
        url: getTaskMonitoringUrl(recordId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskMonitoringQuery } = monitoringApiService
