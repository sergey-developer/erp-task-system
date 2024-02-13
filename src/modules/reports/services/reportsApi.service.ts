import { getPaginatedList } from 'lib/antd/utils'

import { ReportsApiEnum } from 'modules/reports/constants'
import {
  GetEmployeesActionsReportQueryArgs,
  GetEmployeesActionsReportSuccessResponse,
  GetEmployeesActionsReportXlsxQueryArgs,
  GetEmployeesActionsReportXlsxSuccessResponse,
  GetHistoryNomenclatureOperationsReportQueryArgs,
  GetHistoryNomenclatureOperationsReportSuccessResponse,
  GetHistoryNomenclatureOperationsReportXlsxQueryArgs,
  GetHistoryNomenclatureOperationsReportXlsxSuccessResponse,
} from 'modules/reports/models'
import {
  GetEmployeesActionsReportTransformedSuccessResponse,
  GetHistoryNomenclatureOperationsReportTransformedSuccessResponse,
} from 'modules/reports/types'
import { getEmployeesActionsReportUrl } from 'modules/reports/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { baseApiService } from 'shared/services/baseApi'

const reportsApiService = baseApiService.injectEndpoints({
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

    getHistoryNomenclatureOperationsReport: build.query<
      GetHistoryNomenclatureOperationsReportTransformedSuccessResponse,
      GetHistoryNomenclatureOperationsReportQueryArgs
    >({
      query: (params) => ({
        url: ReportsApiEnum.GetHistoryNomenclatureOperationsReport,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (
        response: GetHistoryNomenclatureOperationsReportSuccessResponse,
        meta,
        arg,
      ) => getPaginatedList(response, arg),
    }),
    getHistoryNomenclatureOperationsReportXlsx: build.query<
      GetHistoryNomenclatureOperationsReportXlsxSuccessResponse,
      GetHistoryNomenclatureOperationsReportXlsxQueryArgs
    >({
      query: (params) => ({
        url: ReportsApiEnum.GetHistoryNomenclatureOperationsReport,
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

  useGetHistoryNomenclatureOperationsReportQuery,
  useLazyGetHistoryNomenclatureOperationsReportXlsxQuery,

  endpoints,
} = reportsApiService
