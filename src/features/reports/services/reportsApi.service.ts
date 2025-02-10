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
  GetInventorizationReportQueryArgs,
  GetInventorizationReportSuccessResponse,
  GetMacroregionsMtsrReportQueryArgs,
  GetMacroregionsMtsrReportSuccessResponse,
  GetSupportGroupsMtsrReportQueryArgs,
  GetSupportGroupsMtsrReportSuccessResponse,
  GetUsersMtsrReportQueryArgs,
  GetUsersMtsrReportSuccessResponse,
  GetWorkGroupsMtsrReportQueryArgs,
  GetWorkGroupsMtsrReportSuccessResponse,
} from 'features/reports/api/dto'
import {
  GetAmountEquipmentSpentReportTransformedSuccessResponse,
  GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse,
  GetEmployeesActionsReportTransformedSuccessResponse,
  GetEmployeesActionsReportXlsxTransformedSuccessResponse,
  GetHistoryNomenclatureOperationsReportTransformedSuccessResponse,
  GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse,
  GetInventorizationReportTransformedSuccessResponse,
} from 'features/reports/api/types'
import { ReportsApiEnum } from 'features/reports/constants'
import {
  getEmployeesActionsReportUrl,
  getHistoryNomenclatureOperationsReportUrl,
  makeGetInventorizationReportUrl,
} from 'features/reports/utils'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MimetypeEnum } from 'shared/constants/mimetype'

const reportsApiService = baseApi.injectEndpoints({
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

    getMacroregionsMtsrReport: build.query<
      GetMacroregionsMtsrReportSuccessResponse,
      GetMacroregionsMtsrReportQueryArgs
    >({
      query: (params) => ({
        url: ReportsApiEnum.GetMacroregionsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getSupportGroupsMtsrReport: build.query<
      GetSupportGroupsMtsrReportSuccessResponse,
      GetSupportGroupsMtsrReportQueryArgs
    >({
      query: (params) => ({
        url: ReportsApiEnum.GetSupportGroupsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getWorkGroupsMtsrReport: build.query<
      GetWorkGroupsMtsrReportSuccessResponse,
      GetWorkGroupsMtsrReportQueryArgs
    >({
      query: (params) => ({
        url: ReportsApiEnum.GetWorkGroupsMtsrReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    getUsersMtsrReport: build.query<GetUsersMtsrReportSuccessResponse, GetUsersMtsrReportQueryArgs>(
      {
        query: (params) => ({
          url: ReportsApiEnum.GetUsersMtsrReport,
          method: HttpMethodEnum.Get,
          params,
        }),
      },
    ),

    getInventorizationReport: build.query<
      GetInventorizationReportTransformedSuccessResponse,
      GetInventorizationReportQueryArgs
    >({
      query: ({ inventorizationId }) => ({
        url: makeGetInventorizationReportUrl({ inventorizationId }),
        method: HttpMethodEnum.Get,
      }),
      transformResponse: (value: GetInventorizationReportSuccessResponse, meta) => ({
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

  useGetMacroregionsMtsrReportQuery,
  useGetSupportGroupsMtsrReportQuery,
  useGetWorkGroupsMtsrReportQuery,
  useGetUsersMtsrReportQuery,

  useLazyGetInventorizationReportQuery,

  endpoints,
} = reportsApiService
