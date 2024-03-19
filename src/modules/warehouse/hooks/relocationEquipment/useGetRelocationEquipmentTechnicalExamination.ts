import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationEquipmentTechnicalExaminationErrMsg } from 'modules/warehouse/constants/relocationEquipment'
import {
  GetRelocationEquipmentTechnicalExaminationQueryArgs,
  GetRelocationEquipmentTechnicalExaminationSuccessResponse,
} from 'modules/warehouse/models/relocationEquipment'
import { useGetRelocationEquipmentTechnicalExaminationQuery } from 'modules/warehouse/services/relocationEquipmentApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentTechnicalExaminationResult = CustomUseQueryHookResult<
  GetRelocationEquipmentTechnicalExaminationQueryArgs,
  GetRelocationEquipmentTechnicalExaminationSuccessResponse
>

type UseGetRelocationEquipmentTechnicalExaminationOptions = CustomUseQueryOptions<
  GetRelocationEquipmentTechnicalExaminationQueryArgs,
  GetRelocationEquipmentTechnicalExaminationSuccessResponse
>

export const useGetRelocationEquipmentTechnicalExamination = (
  args: GetRelocationEquipmentTechnicalExaminationQueryArgs,
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
