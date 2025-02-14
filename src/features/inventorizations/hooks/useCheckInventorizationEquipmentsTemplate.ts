import { useCheckInventorizationEquipmentsTemplateMutation } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { checkInventorizationEquipmentsTemplateErrMsg } from '../api/constants'
import {
  CheckInventorizationEquipmentsTemplateRequest,
  CheckInventorizationEquipmentsTemplateResponse,
} from '../api/schemas'

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
