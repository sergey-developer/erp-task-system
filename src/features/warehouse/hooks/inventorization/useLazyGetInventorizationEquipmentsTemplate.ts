import { getInventorizationEquipmentsTemplateErrMsg } from 'features/warehouse/constants/inventorization'
import { GetInventorizationEquipmentsTemplateRequest } from 'features/warehouse/models'
import { useLazyGetInventorizationEquipmentsTemplateQuery } from 'features/warehouse/services/inventorizationApi.service'
import { GetInventorizationEquipmentsTemplateTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetInventorizationEquipmentsTemplateResult = CustomUseLazyQueryHookResult<
  GetInventorizationEquipmentsTemplateRequest,
  GetInventorizationEquipmentsTemplateTransformedResponse
>

export const useLazyGetInventorizationEquipmentsTemplate =
  (): UseLazyGetInventorizationEquipmentsTemplateResult => {
    const [trigger, state] = useLazyGetInventorizationEquipmentsTemplateQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isForbiddenError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(getInventorizationEquipmentsTemplateErrMsg)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
