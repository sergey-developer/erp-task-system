import { getInventorizationReportErrMsg } from 'features/reports/api/constants'
import { useLazyGetInventorizationReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetInventorizationReportQueryArgs } from 'features/reports/api/schemas'
import { GetInventorizationReportTransformedSuccessResponse } from 'features/reports/api/types'
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
  GetInventorizationReportQueryArgs,
  GetInventorizationReportTransformedSuccessResponse
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
