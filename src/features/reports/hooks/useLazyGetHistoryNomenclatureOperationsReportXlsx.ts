import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getHistoryNomenclatureOperationsReportXlsxErrMsg } from 'features/reports/constants'
import { GetHistoryNomenclatureOperationsReportXlsxQueryArgs } from 'features/reports/models'
import { useLazyGetHistoryNomenclatureOperationsReportXlsxQuery } from 'features/reports/services/reportsApi.service'
import { GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse } from 'features/reports/types'

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
