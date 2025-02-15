import { getRelocationEquipmentAttachmentsErrorMessage } from 'features/relocationEquipments/api/constants'
import {
  GetRelocationEquipmentAttachmentsRequest,
  GetRelocationEquipmentAttachmentsResponse,
} from 'features/relocationEquipments/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { useGetRelocationEquipmentAttachmentsQuery } from '../api/endpoints/relocationEquipments.endpoints'

type UseGetRelocationEquipmentAttachmentsResult = CustomUseQueryHookResult<
  GetRelocationEquipmentAttachmentsRequest,
  GetRelocationEquipmentAttachmentsResponse
>

type UseGetRelocationEquipmentAttachmentsOptions = CustomUseQueryOptions<
  GetRelocationEquipmentAttachmentsRequest,
  GetRelocationEquipmentAttachmentsResponse
>

export const useGetRelocationEquipmentAttachments = (
  args: GetRelocationEquipmentAttachmentsRequest,
  options?: UseGetRelocationEquipmentAttachmentsOptions,
): UseGetRelocationEquipmentAttachmentsResult => {
  const state = useGetRelocationEquipmentAttachmentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationEquipmentAttachmentsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
