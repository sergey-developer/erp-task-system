import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import {
  GetAmountEquipmentSpentReportRequest,
  GetAmountEquipmentSpentReportResponse,
  GetAmountEquipmentSpentReportXlsxRequest,
  GetAmountEquipmentSpentReportXlsxResponse,
  GetEmployeesActionsReportRequest,
  GetEmployeesActionsReportResponse,
  GetEmployeesActionsReportXlsxRequest,
  GetEmployeesActionsReportXlsxResponse,
  GetHistoryNomenclatureOperationsReportRequest,
  GetHistoryNomenclatureOperationsReportResponse,
  GetHistoryNomenclatureOperationsReportXlsxRequest,
  GetInventorizationReportRequest,
  GetInventorizationReportResponse,
  GetMacroregionsMtsrReportRequest,
  GetMacroregionsMtsrReportResponse,
  GetSupportGroupsMtsrReportRequest,
  GetSupportGroupsMtsrReportResponse,
  GetUsersMtsrReportRequest,
  GetUsersMtsrReportResponse,
  GetWorkGroupsMtsrReportRequest,
  GetWorkGroupsMtsrReportResponse,
} from 'features/reports/api/schemas'
import {
  GetAmountEquipmentSpentReportTransformedResponse,
  GetAmountEquipmentSpentReportXlsxTransformedResponse,
  GetEmployeesActionsReportTransformedResponse,
  GetEmployeesActionsReportXlsxTransformedResponse,
  GetHistoryNomenclatureOperationsReportTransformedResponse,
  GetHistoryNomenclatureOperationsReportXlsxTransformedResponse,
  GetInventorizationReportTransformedResponse,
} from 'features/reports/api/types'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'

import {
  makeGetEmployeesActionsReportApiPath,
  makeGetInventorizationReportApiPath,
  makeHistoryNomenclatureOperationsReportApiPath,
} from '../helpers'

const reportsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeesActionsReport: build.query<
      GetEmployeesActionsReportTransformedResponse,
      GetEmployeesActionsReportRequest
    >({
      query: ({ employeeId, ...params }) => ({
        url: makeGetEmployeesActionsReportApiPath(employeeId),
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetEmployeesActionsReportResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
    getEmployeesActionsReportXlsx: build.query<
      GetEmployeesActionsReportXlsxTransformedResponse,
      GetEmployeesActionsReportXlsxRequest
    >({
      query: ({ employeeId, ...params }) => ({
        url: makeGetEmployeesActionsReportApiPath(employeeId),
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Xlsx },
        params,
      }),
      transformResponse: (value: GetEmployeesActionsReportXlsxResponse, meta) => ({
        value,
        meta,
      }),
    }),

    getAmountEquipmentSpentReport: build.query<
      GetAmountEquipmentSpentReportTransformedResponse,
      GetAmountEquipmentSpentReportRequest
    >({
      query: (params) => ({
        url: ReportsApiPathsEnum.GetAmountEquipmentSpentReport,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetAmountEquipmentSpentReportResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
    getAmountEquipmentSpentReportXlsx: build.query<
      GetAmountEquipmentSpentReportXlsxTransformedResponse,
      GetAmountEquipmentSpentReportXlsxRequest
    >({
      query: (params) => ({
        url: ReportsApiPathsEnum.GetAmountEquipmentSpentReport,
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Xlsx },
        params,
      }),
      transformResponse: (value: GetAmountEquipmentSpentReportXlsxResponse, meta) => ({
        value,
        meta,
      }),
    }),

    getHistoryNomenclatureOperationsReport: build.query<
      GetHistoryNomenclatureOperationsReportTransformedResponse,
      GetHistoryNomenclatureOperationsReportRequest
    >({
      query: ({ nomenclatureId, ...params }) => ({
        url: makeHistoryNomenclatureOperationsReportApiPath(nomenclatureId),
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetHistoryNomenclatureOperationsReportResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
    getHistoryNomenclatureOperationsReportXlsx: build.query<
      GetHistoryNomenclatureOperationsReportXlsxTransformedResponse,
      GetHistoryNomenclatureOperationsReportXlsxRequest
    >({
      query: ({ nomenclatureId, ...params }) => ({
        url: makeHistoryNomenclatureOperationsReportApiPath(nomenclatureId),
        method: HttpMethodEnum.Get,
        headers: { Accept: MimetypeEnum.Xlsx },
        params,
      }),
      transformResponse: (value: GetAmountEquipmentSpentReportXlsxResponse, meta) => ({
        value,
        meta,
      }),
    }),

    getMacroregionsMtsrReport: build.query<
      GetMacroregionsMtsrReportResponse,
      GetMacroregionsMtsrReportRequest
    >({
      query: (params) => ({
        url: ReportsApiPathsEnum.GetMacroregionsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getSupportGroupsMtsrReport: build.query<
      GetSupportGroupsMtsrReportResponse,
      GetSupportGroupsMtsrReportRequest
    >({
      query: (params) => ({
        url: ReportsApiPathsEnum.GetSupportGroupsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getWorkGroupsMtsrReport: build.query<
      GetWorkGroupsMtsrReportResponse,
      GetWorkGroupsMtsrReportRequest
    >({
      query: (params) => ({
        url: ReportsApiPathsEnum.GetWorkGroupsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getUsersMtsrReport: build.query<GetUsersMtsrReportResponse, GetUsersMtsrReportRequest>({
      query: (params) => ({
        url: ReportsApiPathsEnum.GetUsersMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),

    getInventorizationReport: build.query<
      GetInventorizationReportTransformedResponse,
      GetInventorizationReportRequest
    >({
      query: ({ inventorizationId }) => ({
        url: makeGetInventorizationReportApiPath({ inventorizationId }),
        method: HttpMethodEnum.Get,
      }),
      transformResponse: (value: GetInventorizationReportResponse, meta) => ({
        value,
        meta,
      }),
    }),
  }),
})

export const {
  useGetEmployeesActionsReportQuery,
  useLazyGetEmployeesActionsReportXlsxQuery,

  useGetAmountEquipmentSpentReportQuery,
  useLazyGetAmountEquipmentSpentReportXlsxQuery,

  useGetHistoryNomenclatureOperationsReportQuery,
  useLazyGetHistoryNomenclatureOperationsReportXlsxQuery,

  useGetMacroregionsMtsrReportQuery,
  useGetSupportGroupsMtsrReportQuery,
  useGetWorkGroupsMtsrReportQuery,
  useGetUsersMtsrReportQuery,

  useLazyGetInventorizationReportQuery,

  endpoints,
} = reportsEndpoints
