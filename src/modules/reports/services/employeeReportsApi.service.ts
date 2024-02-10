import { getPaginatedList } from 'lib/antd/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { baseApiService } from 'shared/services/baseApi'

import {
  GetEmployeesActionsReportQueryArgs,
  GetEmployeesActionsReportSuccessResponse,
  GetEmployeesActionsReportXlsxQueryArgs,
  GetEmployeesActionsReportXlsxSuccessResponse,
} from '../models'
import { GetEmployeesActionsReportTransformedSuccessResponse } from '../types'
import { getEmployeesActionsReportUrl } from '../utils'

const employeeReportsApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getEmployeesActionsReport: build.query<
      GetEmployeesActionsReportTransformedSuccessResponse,
      GetEmployeesActionsReportQueryArgs
    >({
      query: ({ employeeId, ...params }) => ({
        url: getEmployeesActionsReportUrl(employeeId),
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetEmployeesActionsReportSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
    getEmployeesActionsReportXlsx: build.query<
      GetEmployeesActionsReportXlsxSuccessResponse,
      GetEmployeesActionsReportXlsxQueryArgs
    >({
      query: ({ employeeId, ...params }) => ({
        url: getEmployeesActionsReportUrl(employeeId),
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Xlsx },
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetEmployeesActionsReportQuery,
  useLazyGetEmployeesActionsReportXlsxQuery,
  endpoints,
} = employeeReportsApiService
