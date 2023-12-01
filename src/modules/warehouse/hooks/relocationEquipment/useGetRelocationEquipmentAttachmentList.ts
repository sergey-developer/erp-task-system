import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationEquipmentAttachmentListErrorMsg } from 'modules/warehouse/constants/relocationEquipment'
import {
  GetRelocationEquipmentAttachmentListQueryArgs,
  GetRelocationEquipmentAttachmentListSuccessResponse,
} from 'modules/warehouse/models/relocationEquipment'
import { useGetRelocationEquipmentAttachmentListQuery } from 'modules/warehouse/services/relocationEquipmentApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentAttachmentListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentAttachmentListQueryArgs,
  GetRelocationEquipmentAttachmentListSuccessResponse
>

type UseGetRelocationEquipmentAttachmentListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentAttachmentListQueryArgs,
  GetRelocationEquipmentAttachmentListSuccessResponse
>

export const useGetRelocationEquipmentAttachmentList = (
  args: GetRelocationEquipmentAttachmentListQueryArgs,
  options?: UseGetRelocationEquipmentAttachmentListOptions,
): UseGetRelocationEquipmentAttachmentListResult => {
  const state = useGetRelocationEquipmentAttachmentListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getRelocationEquipmentAttachmentListErrorMsg)
      }
    }
  }, [state.error])

  return state
}
