import { makeTaskMonitoringEndpoint } from 'features/monitoring/api/helpers'
import {
  GetTaskMonitoringQueryArgs,
  GetTaskMonitoringSuccessResponse,
} from 'features/monitoring/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const monitoringEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTaskMonitoring: build.query<GetTaskMonitoringSuccessResponse, GetTaskMonitoringQueryArgs>({
      query: (recordId) => ({
        url: makeTaskMonitoringEndpoint(recordId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskMonitoringQuery } = monitoringEndpoints
