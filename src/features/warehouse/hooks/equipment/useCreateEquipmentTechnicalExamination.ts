import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createEquipmentTechnicalExaminationErrMsg } from 'features/warehouse/constants/equipment'
import {
  CreateEquipmentTechnicalExaminationMutationArgs,
  CreateEquipmentTechnicalExaminationSuccessResponse,
} from 'features/warehouse/models'
import { useCreateEquipmentTechnicalExaminationMutation } from 'features/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentTechnicalExaminationResult = CustomUseMutationResult<
  CreateEquipmentTechnicalExaminationMutationArgs,
  CreateEquipmentTechnicalExaminationSuccessResponse
>

export const useCreateEquipmentTechnicalExamination =
  (): UseCreateEquipmentTechnicalExaminationResult => {
    const [mutation, state] = useCreateEquipmentTechnicalExaminationMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createEquipmentTechnicalExaminationErrMsg)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
