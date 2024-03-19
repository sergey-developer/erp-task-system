import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createRelocationEquipmentTechnicalExaminationErrMsg } from 'modules/warehouse/constants/relocationEquipment'
import {
  CreateRelocationEquipmentTechnicalExaminationMutationArgs,
  CreateRelocationEquipmentTechnicalExaminationSuccessResponse,
} from 'modules/warehouse/models/relocationEquipment'
import { useCreateRelocationEquipmentTechnicalExaminationMutation } from 'modules/warehouse/services/relocationEquipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateRelocationEquipmentTechnicalExaminationResult = CustomUseMutationResult<
  CreateRelocationEquipmentTechnicalExaminationMutationArgs,
  CreateRelocationEquipmentTechnicalExaminationSuccessResponse
>

export const useCreateRelocationEquipmentTechnicalExamination =
  (): UseCreateRelocationEquipmentTechnicalExaminationResult => {
    const [mutation, state] = useCreateRelocationEquipmentTechnicalExaminationMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isBadRequestError(state.error) || isNotFoundError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createRelocationEquipmentTechnicalExaminationErrMsg)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
