import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getHistoryNomenclatureOperationsReportErrMsg } from 'features/reports/constants'
import { GetHistoryNomenclatureOperationsReportQueryArgs } from 'features/reports/models'
import { useGetHistoryNomenclatureOperationsReportQuery } from 'features/reports/services/reportsApi.service'
import { GetHistoryNomenclatureOperationsReportTransformedSuccessResponse } from 'features/reports/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
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
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getHistoryNomenclatureOperationsReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
