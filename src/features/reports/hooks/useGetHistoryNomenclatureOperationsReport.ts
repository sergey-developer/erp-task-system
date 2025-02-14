import { getHistoryNomenclatureOperationsReportErrMsg } from 'features/reports/api/constants'
import { useGetHistoryNomenclatureOperationsReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetHistoryNomenclatureOperationsReportRequest } from 'features/reports/api/schemas'
import { GetHistoryNomenclatureOperationsReportTransformedResponse } from 'features/reports/api/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetHistoryNomenclatureOperationsReportResult = CustomUseQueryHookResult<
  GetHistoryNomenclatureOperationsReportRequest,
  GetHistoryNomenclatureOperationsReportTransformedResponse
>

type UseGetHistoryNomenclatureOperationsReportOptions = CustomUseQueryOptions<
  GetHistoryNomenclatureOperationsReportRequest,
  GetHistoryNomenclatureOperationsReportTransformedResponse
>

export const useGetHistoryNomenclatureOperationsReport = (
  args: GetHistoryNomenclatureOperationsReportRequest,
  options?: UseGetHistoryNomenclatureOperationsReportOptions,
): UseGetHistoryNomenclatureOperationsReportResult => {
  const state = useGetHistoryNomenclatureOperationsReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getHistoryNomenclatureOperationsReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
