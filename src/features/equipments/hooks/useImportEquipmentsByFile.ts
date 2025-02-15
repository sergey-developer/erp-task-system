import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { importEquipmentsByFileErrorMessage } from '../api/constants'
import { useImportEquipmentsByFileMutation } from '../api/endpoints/equipments.endpoints'
import { ImportEquipmentsByFileRequest } from '../api/schemas'
import { ImportEquipmentsByFileTransformedResponse } from '../api/types'

type UseImportEquipmentsByFileResult = CustomUseMutationResult<
  ImportEquipmentsByFileRequest,
  ImportEquipmentsByFileTransformedResponse
>

export const useImportEquipmentsByFile = (): UseImportEquipmentsByFileResult => {
  const [mutation, state] = useImportEquipmentsByFileMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(importEquipmentsByFileErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
