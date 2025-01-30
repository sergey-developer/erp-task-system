import {
  GetTaskMonitoringQueryArgs,
  GetTaskMonitoringSuccessResponse,
} from 'features/monitoring/models'
import { getTaskMonitoringUrl } from 'features/monitoring/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

const monitoringApiService = baseApiService.injectEndpoints({
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
