import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { importEquipmentsByFileErrMsg } from 'modules/warehouse/constants/equipment'
import { ImportEquipmentsByFileMutationArgs } from 'modules/warehouse/models'
import { useImportEquipmentsByFileMutation } from 'modules/warehouse/services/equipmentApi.service'
import { ImportEquipmentsByFileTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseImportEquipmentsByFileResult = CustomUseMutationResult<
  ImportEquipmentsByFileMutationArgs,
  ImportEquipmentsByFileTransformedSuccessResponse
>

export const useImportEquipmentsByFile = (): UseImportEquipmentsByFileResult => {
  const [mutation, state] = useImportEquipmentsByFileMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(importEquipmentsByFileErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
