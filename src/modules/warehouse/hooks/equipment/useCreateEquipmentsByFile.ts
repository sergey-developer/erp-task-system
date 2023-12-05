import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createEquipmentsByFileErrorMsg } from 'modules/warehouse/constants/equipment'
import { CreateEquipmentsByFileMutationArgs } from 'modules/warehouse/models'
import { useCreateEquipmentsByFileMutation } from 'modules/warehouse/services/equipmentApi.service'
import { CreateEquipmentsByFileTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentsByFileResult = CustomUseMutationResult<
  CreateEquipmentsByFileMutationArgs,
  CreateEquipmentsByFileTransformedSuccessResponse
>

export const useCreateEquipmentsByFile = (): UseCreateEquipmentsByFileResult => {
  const [mutation, state] = useCreateEquipmentsByFileMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createEquipmentsByFileErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
