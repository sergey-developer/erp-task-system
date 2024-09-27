import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getInventorizationEquipmentsTemplateErrMsg } from 'modules/warehouse/constants/inventorization'
import { GetInventorizationEquipmentsTemplateQueryArgs } from 'modules/warehouse/models'
import { useLazyGetInventorizationEquipmentsTemplateQuery } from 'modules/warehouse/services/inventorizationApi.service'
import { GetInventorizationEquipmentsTemplateTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetInventorizationEquipmentsTemplateResult = CustomUseLazyQueryHookResult<
  GetInventorizationEquipmentsTemplateQueryArgs,
  GetInventorizationEquipmentsTemplateTransformedSuccessResponse
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
