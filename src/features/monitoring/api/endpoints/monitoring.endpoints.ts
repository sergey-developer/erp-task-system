import { makeTaskMonitoringEndpoint } from 'features/monitoring/api/helpers'
import {
  GetTaskMonitoringRequest,
  GetTaskMonitoringResponse,
} from 'features/monitoring/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const monitoringEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTaskMonitoring: build.query<GetTaskMonitoringResponse, GetTaskMonitoringRequest>({
      query: (recordId) => ({
        url: makeTaskMonitoringEndpoint(recordId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetTaskMonitoringQuery } = monitoringEndpoints
