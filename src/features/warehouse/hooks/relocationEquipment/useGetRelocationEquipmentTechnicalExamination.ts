import { getRelocationEquipmentTechnicalExaminationErrMsg } from 'features/warehouse/constants/relocationEquipment'
import {
  GetRelocationEquipmentTechnicalExaminationRequest,
  GetRelocationEquipmentTechnicalExaminationResponse,
} from 'features/warehouse/models/relocationEquipment'
import { useGetRelocationEquipmentTechnicalExaminationQuery } from 'features/warehouse/services/relocationEquipmentApi.service'
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
        showErrorNotification(getRelocationEquipmentTechnicalExaminationErrMsg)
      }
    }
  }, [state.error])

  return state
}
