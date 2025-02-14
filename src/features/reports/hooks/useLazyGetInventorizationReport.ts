import { getInventorizationReportErrMsg } from 'features/reports/api/constants'
import { useLazyGetInventorizationReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetInventorizationReportRequest } from 'features/reports/api/schemas'
import { GetInventorizationReportTransformedResponse } from 'features/reports/api/types'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInventorizationReportResult = CustomUseLazyQueryHookResult<
  GetInventorizationReportRequest,
  GetInventorizationReportTransformedResponse
>

export const useLazyGetInventorizationReport = (): UseGetInventorizationReportResult => {
  const [trigger, state] = useLazyGetInventorizationReportQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInventorizationReportErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
