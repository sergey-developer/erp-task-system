import {
  GetTaskMonitoringQueryArgsModel,
  GetTaskMonitoringResponseModel,
} from 'modules/monitoring/models'
import { getTaskMonitoringUrl } from 'modules/monitoring/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

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
