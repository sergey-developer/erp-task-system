import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getHistoryNomenclatureOperationsReportErrMsg } from 'modules/reports/constants'
import { GetHistoryNomenclatureOperationsReportQueryArgs } from 'modules/reports/models'
import { useGetHistoryNomenclatureOperationsReportQuery } from 'modules/reports/services/reportsApi.service'
import { GetHistoryNomenclatureOperationsReportTransformedSuccessResponse } from 'modules/reports/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetHistoryNomenclatureOperationsReportResult = CustomUseQueryHookResult<
  GetHistoryNomenclatureOperationsReportQueryArgs,
  GetHistoryNomenclatureOperationsReportTransformedSuccessResponse
>

type UseGetHistoryNomenclatureOperationsReportOptions = CustomUseQueryOptions<
  GetHistoryNomenclatureOperationsReportQueryArgs,
  GetHistoryNomenclatureOperationsReportTransformedSuccessResponse
>

export const useGetHistoryNomenclatureOperationsReport = (
  args: GetHistoryNomenclatureOperationsReportQueryArgs,
  options?: UseGetHistoryNomenclatureOperationsReportOptions,
): UseGetHistoryNomenclatureOperationsReportResult => {
  const state = useGetHistoryNomenclatureOperationsReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getHistoryNomenclatureOperationsReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
