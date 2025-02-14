import { getEquipmentAttachmentsErrorMessage } from 'features/equipments/api/constants'
import { useGetEquipmentAttachmentsQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentAttachmentsRequest } from '../api/schemas'
import { GetEquipmentAttachmentsTransformedResponse } from '../api/types'

type UseGetEquipmentAttachmentListResult = CustomUseQueryHookResult<
  GetEquipmentAttachmentsRequest,
  GetEquipmentAttachmentsTransformedResponse
>

type UseGetEquipmentAttachmentListOptions = CustomUseQueryOptions<
  GetEquipmentAttachmentsRequest,
  GetEquipmentAttachmentsTransformedResponse
>

export const useGetEquipmentAttachments = (
  args: GetEquipmentAttachmentsRequest,
  options?: UseGetEquipmentAttachmentListOptions,
): UseGetEquipmentAttachmentListResult => {
  const state = useGetEquipmentAttachmentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentAttachmentsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
