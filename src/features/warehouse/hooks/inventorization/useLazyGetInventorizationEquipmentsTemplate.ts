import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getInventorizationEquipmentsTemplateErrMsg } from 'features/warehouse/constants/inventorization'
import { GetInventorizationEquipmentsTemplateQueryArgs } from 'features/warehouse/models'
import { useLazyGetInventorizationEquipmentsTemplateQuery } from 'features/warehouse/services/inventorizationApi.service'
import { GetInventorizationEquipmentsTemplateTransformedSuccessResponse } from 'features/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/services/baseApi'
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
