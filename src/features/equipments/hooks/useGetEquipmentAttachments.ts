import { getEquipmentAttachmentListErrMsg } from 'features/equipments/api/constants'
import { useGetEquipmentAttachmentListQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { GetEquipmentAttachmentsRequest } from 'features/warehouse/models'
import { GetEquipmentAttachmentListTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentAttachmentListResult = CustomUseQueryHookResult<
  GetEquipmentAttachmentsRequest,
  GetEquipmentAttachmentListTransformedResponse
>

type UseGetEquipmentAttachmentListOptions = CustomUseQueryOptions<
  GetEquipmentAttachmentsRequest,
  GetEquipmentAttachmentListTransformedResponse
>

export const useGetEquipmentAttachments = (
  args: GetEquipmentAttachmentsRequest,
  options?: UseGetEquipmentAttachmentListOptions,
): UseGetEquipmentAttachmentListResult => {
  const state = useGetEquipmentAttachmentListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentAttachmentListErrMsg)
      }
    }
  }, [state.error])

  return state
}
