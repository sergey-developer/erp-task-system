import {
  GetTaskMonitoringQueryArgs,
  GetTaskMonitoringSuccessResponse,
} from 'modules/monitoring/models'
import { getTaskMonitoringUrl } from 'modules/monitoring/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const monitoringApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getTaskMonitoring: build.query<
      GetTaskMonitoringSuccessResponse,
      GetTaskMonitoringQueryArgs
    >({
      query: (recordId) => ({
        url: getTaskMonitoringUrl(recordId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskMonitoringQuery } = monitoringApiService
