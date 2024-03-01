import { getPaginatedList } from 'lib/antd/utils'

import { ReportsApiEnum } from 'modules/reports/constants'
import {
  GetAmountEquipmentSpentReportQueryArgs,
  GetAmountEquipmentSpentReportSuccessResponse,
  GetAmountEquipmentSpentReportXlsxQueryArgs,
  GetAmountEquipmentSpentReportXlsxSuccessResponse,
  GetEmployeesActionsReportQueryArgs,
  GetEmployeesActionsReportSuccessResponse,
  GetEmployeesActionsReportXlsxQueryArgs,
  GetEmployeesActionsReportXlsxSuccessResponse,
  GetHistoryNomenclatureOperationsReportQueryArgs,
  GetHistoryNomenclatureOperationsReportSuccessResponse,
  GetHistoryNomenclatureOperationsReportXlsxQueryArgs,
} from 'modules/reports/models'
import {
  GetAmountEquipmentSpentReportTransformedSuccessResponse,
  GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse,
  GetEmployeesActionsReportTransformedSuccessResponse,
  GetEmployeesActionsReportXlsxTransformedSuccessResponse,
  GetHistoryNomenclatureOperationsReportTransformedSuccessResponse,
  GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse,
} from 'modules/reports/types'
import {
  getEmployeesActionsReportUrl,
  getHistoryNomenclatureOperationsReportUrl,
} from 'modules/reports/utils'

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
      GetEmployeesActionsReportXlsxTransformedSuccessResponse,
      GetEmployeesActionsReportXlsxQueryArgs
    >({
      query: ({ employeeId, ...params }) => ({
        url: getEmployeesActionsReportUrl(employeeId),
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Xlsx },
        params,
      }),
      transformResponse: (value: GetEmployeesActionsReportXlsxSuccessResponse, meta) => ({
        value,
        meta,
      }),
    }),

    getAmountEquipmentSpentReport: build.query<
      GetAmountEquipmentSpentReportTransformedSuccessResponse,
      GetAmountEquipmentSpentReportQueryArgs
    >({
      query: (params) => ({
        url: ReportsApiEnum.GetAmountEquipmentSpentReport,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetAmountEquipmentSpentReportSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
    getAmountEquipmentSpentReportXlsx: build.query<
      GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse,
      GetAmountEquipmentSpentReportXlsxQueryArgs
    >({
      query: (params) => ({
        url: ReportsApiEnum.GetAmountEquipmentSpentReport,
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Xlsx },
        params,
      }),
      transformResponse: (value: GetAmountEquipmentSpentReportXlsxSuccessResponse, meta) => ({
        value,
        meta,
      }),
    }),

    getHistoryNomenclatureOperationsReport: build.query<
      GetHistoryNomenclatureOperationsReportTransformedSuccessResponse,
      GetHistoryNomenclatureOperationsReportQueryArgs
    >({
      query: ({ nomenclatureId, ...params }) => ({
        url: getHistoryNomenclatureOperationsReportUrl(nomenclatureId),
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
      GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse,
      GetHistoryNomenclatureOperationsReportXlsxQueryArgs
    >({
      query: ({ nomenclatureId, ...params }) => ({
        url: getHistoryNomenclatureOperationsReportUrl(nomenclatureId),
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Xlsx },
        params,
      }),
      transformResponse: (value: GetAmountEquipmentSpentReportXlsxSuccessResponse, meta) => ({
        value,
        meta,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetEmployeesActionsReportQuery,
  useLazyGetEmployeesActionsReportXlsxQuery,

  useGetAmountEquipmentSpentReportQuery,
  useLazyGetAmountEquipmentSpentReportXlsxQuery,

  useGetHistoryNomenclatureOperationsReportQuery,
  useLazyGetHistoryNomenclatureOperationsReportXlsxQuery,

  endpoints,
} = reportsApiService
