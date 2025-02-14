import { createRelocationEquipmentTechnicalExaminationErrorMessage } from 'features/warehouse/constants/relocationEquipment'
import {
  CreateRelocationEquipmentTechnicalExaminationRequest,
  CreateRelocationEquipmentTechnicalExaminationResponse,
} from 'features/warehouse/models/relocationEquipment'
import { useCreateRelocationEquipmentTechnicalExaminationMutation } from 'features/warehouse/services/relocationEquipmentApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateRelocationEquipmentTechnicalExaminationResult = CustomUseMutationResult<
  CreateRelocationEquipmentTechnicalExaminationRequest,
  CreateRelocationEquipmentTechnicalExaminationResponse
>

export const useCreateRelocationEquipmentTechnicalExamination =
  (): UseCreateRelocationEquipmentTechnicalExaminationResult => {
    const [mutation, state] = useCreateRelocationEquipmentTechnicalExaminationMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isBadRequestError(state.error) || isNotFoundError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createRelocationEquipmentTechnicalExaminationErrorMessage)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
