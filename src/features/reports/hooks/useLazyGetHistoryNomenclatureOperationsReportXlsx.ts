import { getHistoryNomenclatureOperationsReportXlsxErrorMessage } from 'features/reports/api/constants'
import { useLazyGetHistoryNomenclatureOperationsReportXlsxQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetHistoryNomenclatureOperationsReportXlsxRequest } from 'features/reports/api/schemas'
import { GetHistoryNomenclatureOperationsReportXlsxTransformedResponse } from 'features/reports/api/types'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetHistoryNomenclatureOperationsReportXlsxResult = CustomUseLazyQueryHookResult<
  GetHistoryNomenclatureOperationsReportXlsxRequest,
  GetHistoryNomenclatureOperationsReportXlsxTransformedResponse
>

export const useLazyGetHistoryNomenclatureOperationsReportXlsx =
  (): UseGetHistoryNomenclatureOperationsReportXlsxResult => {
    const [trigger, state] = useLazyGetHistoryNomenclatureOperationsReportXlsxQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(getHistoryNomenclatureOperationsReportXlsxErrorMessage)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
