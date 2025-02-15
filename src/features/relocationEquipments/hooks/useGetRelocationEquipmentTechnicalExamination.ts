import { getRelocationEquipmentTechnicalExaminationErrorMessage } from 'features/relocationEquipments/api/constants'
import { useGetRelocationEquipmentTechnicalExaminationQuery } from 'features/relocationEquipments/api/endpoints/relocationEquipments.endpoints'
import {
  GetRelocationEquipmentTechnicalExaminationRequest,
  GetRelocationEquipmentTechnicalExaminationResponse,
} from 'features/relocationEquipments/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentTechnicalExaminationResult = CustomUseQueryHookResult<
  GetRelocationEquipmentTechnicalExaminationRequest,
  GetRelocationEquipmentTechnicalExaminationResponse
>

type UseGetRelocationEquipmentTechnicalExaminationOptions = CustomUseQueryOptions<
  GetRelocationEquipmentTechnicalExaminationRequest,
  GetRelocationEquipmentTechnicalExaminationResponse
>

export const useGetRelocationEquipmentTechnicalExamination = (
  args: GetRelocationEquipmentTechnicalExaminationRequest,
  options?: UseGetRelocationEquipmentTechnicalExaminationOptions,
): UseGetRelocationEquipmentTechnicalExaminationResult => {
  const state = useGetRelocationEquipmentTechnicalExaminationQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationEquipmentTechnicalExaminationErrorMessage)
      }
    }
  }, [state.error])

  return state
}
