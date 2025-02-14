import { getRelocationEquipmentAttachmentListErrMsg } from 'features/warehouse/constants/relocationEquipment'
import {
  GetRelocationEquipmentAttachmentListRequest,
  GetRelocationEquipmentAttachmentListResponse,
} from 'features/warehouse/models/relocationEquipment'
import { useGetRelocationEquipmentAttachmentListQuery } from 'features/warehouse/services/relocationEquipmentApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentAttachmentListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentAttachmentListRequest,
  GetRelocationEquipmentAttachmentListResponse
>

type UseGetRelocationEquipmentAttachmentListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentAttachmentListRequest,
  GetRelocationEquipmentAttachmentListResponse
>

export const useGetRelocationEquipmentAttachments = (
  args: GetRelocationEquipmentAttachmentListRequest,
  options?: UseGetRelocationEquipmentAttachmentListOptions,
): UseGetRelocationEquipmentAttachmentListResult => {
  const state = useGetRelocationEquipmentAttachmentListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationEquipmentAttachmentListErrMsg)
      }
    }
  }, [state.error])

  return state
}
