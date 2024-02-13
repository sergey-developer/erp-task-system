import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getHistoryNomenclatureOperationsReportXlsxErrMsg } from 'modules/reports/constants'
import {
  GetHistoryNomenclatureOperationsReportXlsxQueryArgs,
  GetHistoryNomenclatureOperationsReportXlsxSuccessResponse,
} from 'modules/reports/models'
import { useLazyGetHistoryNomenclatureOperationsReportXlsxQuery } from 'modules/reports/services/reportsApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetHistoryNomenclatureOperationsReportXlsxResult = CustomUseLazyQueryHookResult<
  GetHistoryNomenclatureOperationsReportXlsxQueryArgs,
  GetHistoryNomenclatureOperationsReportXlsxSuccessResponse
>

export const useLazyGetHistoryNomenclatureOperationsReportXlsx =
  (): UseGetHistoryNomenclatureOperationsReportXlsxResult => {
    const [trigger, state] = useLazyGetHistoryNomenclatureOperationsReportXlsxQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(getHistoryNomenclatureOperationsReportXlsxErrMsg)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
