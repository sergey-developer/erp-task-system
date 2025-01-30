import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { checkInventorizationEquipmentsTemplateErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CheckInventorizationEquipmentsTemplateMutationArgs,
  CheckInventorizationEquipmentsTemplateSuccessResponse,
} from 'features/warehouse/models'
import { useCheckInventorizationEquipmentsTemplateMutation } from 'features/warehouse/services/inventorizationApi.service'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCheckInventorizationEquipmentsTemplateResult = CustomUseMutationResult<
  CheckInventorizationEquipmentsTemplateMutationArgs,
  CheckInventorizationEquipmentsTemplateSuccessResponse
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
