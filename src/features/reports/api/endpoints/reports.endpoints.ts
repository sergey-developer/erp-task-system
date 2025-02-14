import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import {
  makeGetEmployeesActionsReportEndpoint,
  makeGetInventorizationReportEndpoint,
  makeHistoryNomenclatureOperationsReportEndpoint,
} from 'features/reports/api/helpers'
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

const reportsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeesActionsReport: build.query<
      GetEmployeesActionsReportTransformedResponse,
      GetEmployeesActionsReportRequest
    >({
      query: ({ employeeId, ...params }) => ({
        url: makeGetEmployeesActionsReportEndpoint(employeeId),
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
        url: makeGetEmployeesActionsReportEndpoint(employeeId),
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
        url: ReportsEndpointsEnum.GetAmountEquipmentSpentReport,
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
        url: ReportsEndpointsEnum.GetAmountEquipmentSpentReport,
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
        url: makeHistoryNomenclatureOperationsReportEndpoint(nomenclatureId),
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (
        response: GetHistoryNomenclatureOperationsReportResponse,
        meta,
        arg,
      ) => getPaginatedList(response, arg),
    }),
    getHistoryNomenclatureOperationsReportXlsx: build.query<
      GetHistoryNomenclatureOperationsReportXlsxTransformedResponse,
      GetHistoryNomenclatureOperationsReportXlsxRequest
    >({
      query: ({ nomenclatureId, ...params }) => ({
        url: makeHistoryNomenclatureOperationsReportEndpoint(nomenclatureId),
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
        url: ReportsEndpointsEnum.GetMacroregionsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getSupportGroupsMtsrReport: build.query<
      GetSupportGroupsMtsrReportResponse,
      GetSupportGroupsMtsrReportRequest
    >({
      query: (params) => ({
        url: ReportsEndpointsEnum.GetSupportGroupsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getWorkGroupsMtsrReport: build.query<
      GetWorkGroupsMtsrReportResponse,
      GetWorkGroupsMtsrReportRequest
    >({
      query: (params) => ({
        url: ReportsEndpointsEnum.GetWorkGroupsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getUsersMtsrReport: build.query<GetUsersMtsrReportResponse, GetUsersMtsrReportRequest>(
      {
        query: (params) => ({
          url: ReportsEndpointsEnum.GetUsersMtsrReport,
          method: HttpMethodEnum.Get,
          params,
        }),
      },
    ),

    getInventorizationReport: build.query<
      GetInventorizationReportTransformedResponse,
      GetInventorizationReportRequest
    >({
      query: ({ inventorizationId }) => ({
        url: makeGetInventorizationReportEndpoint({ inventorizationId }),
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
