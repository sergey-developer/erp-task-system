import { createEquipmentTechnicalExaminationErrorMessage } from 'features/equipments/api/constants'
import { useCreateEquipmentTechnicalExaminationMutation } from 'features/equipments/api/endpoints/equipments.endpoints'
import {
  CreateEquipmentTechnicalExaminationRequest,
  CreateEquipmentTechnicalExaminationResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentTechnicalExaminationResult = CustomUseMutationResult<
  CreateEquipmentTechnicalExaminationRequest,
  CreateEquipmentTechnicalExaminationResponse
>

export const useCreateEquipmentTechnicalExamination =
  (): UseCreateEquipmentTechnicalExaminationResult => {
    const [mutation, state] = useCreateEquipmentTechnicalExaminationMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createEquipmentTechnicalExaminationErrorMessage)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
