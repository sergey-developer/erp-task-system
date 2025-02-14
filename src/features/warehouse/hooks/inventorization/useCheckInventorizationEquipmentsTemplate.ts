import { checkInventorizationEquipmentsTemplateErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CheckInventorizationEquipmentsTemplateRequest,
  CheckInventorizationEquipmentsTemplateResponse,
} from 'features/warehouse/models'
import { useCheckInventorizationEquipmentsTemplateMutation } from 'features/warehouse/services/inventorizationApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCheckInventorizationEquipmentsTemplateResult = CustomUseMutationResult<
  CheckInventorizationEquipmentsTemplateRequest,
  CheckInventorizationEquipmentsTemplateResponse
>

export const useCheckInventorizationEquipmentsTemplate =
  (): UseCheckInventorizationEquipmentsTemplateResult => {
    const [mutation, state] = useCheckInventorizationEquipmentsTemplateMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isBadRequestError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(checkInventorizationEquipmentsTemplateErrMsg)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
