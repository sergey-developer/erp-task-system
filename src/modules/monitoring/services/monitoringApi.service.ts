import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import {
  GetTaskMonitoringQueryArgsModel,
  GetTaskMonitoringResponseModel,
} from '../models'
import { getTaskMonitoringUrl } from '../utils/apiUrls'

const monitoringApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getTaskMonitoring: build.query<
      GetTaskMonitoringResponseModel,
      GetTaskMonitoringQueryArgsModel
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
