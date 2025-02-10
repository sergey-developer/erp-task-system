import { getHistoryNomenclatureOperationsReportXlsxErrMsg } from 'features/reports/api/constants'
import { useLazyGetHistoryNomenclatureOperationsReportXlsxQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetHistoryNomenclatureOperationsReportXlsxQueryArgs } from 'features/reports/api/schemas'
import { GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse } from 'features/reports/api/types'
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
  GetHistoryNomenclatureOperationsReportXlsxQueryArgs,
  GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse
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
