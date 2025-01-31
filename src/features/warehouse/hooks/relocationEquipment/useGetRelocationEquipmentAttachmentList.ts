import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationEquipmentAttachmentListErrMsg } from 'features/warehouse/constants/relocationEquipment'
import {
  GetRelocationEquipmentAttachmentListQueryArgs,
  GetRelocationEquipmentAttachmentListSuccessResponse,
} from 'features/warehouse/models/relocationEquipment'
import { useGetRelocationEquipmentAttachmentListQuery } from 'features/warehouse/services/relocationEquipmentApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
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
        showErrorNotification(getRelocationEquipmentAttachmentListErrMsg)
      }
    }
  }, [state.error])

  return state
}
