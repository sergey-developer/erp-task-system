import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getInventorizationReportErrMsg } from 'modules/reports/constants'
import { GetInventorizationReportQueryArgs } from 'modules/reports/models'
import { useLazyGetInventorizationReportQuery } from 'modules/reports/services/reportsApi.service'
import { GetInventorizationReportTransformedSuccessResponse } from 'modules/reports/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
