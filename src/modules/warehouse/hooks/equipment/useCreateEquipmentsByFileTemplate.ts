import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createEquipmentsByFileTemplateErrorMsg } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentsByFileTemplateMutationArgs,
  CreateEquipmentsByFileTemplateSuccessResponse,
} from 'modules/warehouse/models'
import { useCreateEquipmentsByFileTemplateMutation } from 'modules/warehouse/services/equipmentApi.service'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentsByFileTemplateResult = CustomUseMutationResult<
  CreateEquipmentsByFileTemplateMutationArgs,
  CreateEquipmentsByFileTemplateSuccessResponse
>

export const useCreateEquipmentsByFileTemplate = (): UseCreateEquipmentsByFileTemplateResult => {
  const [mutation, state] = useCreateEquipmentsByFileTemplateMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createEquipmentsByFileTemplateErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
