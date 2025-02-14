import { useLazyGetInventorizationEquipmentsTemplateQuery } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInventorizationEquipmentsTemplateErrorMessage } from '../api/constants'
import { GetInventorizationEquipmentsTemplateRequest } from '../api/schemas'
import { GetInventorizationEquipmentsTemplateTransformedResponse } from '../api/types'

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
          showErrorNotification(getInventorizationEquipmentsTemplateErrorMessage)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
