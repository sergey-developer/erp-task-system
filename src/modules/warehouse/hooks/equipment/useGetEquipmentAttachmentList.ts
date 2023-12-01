import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentAttachmentListErrorMsg } from 'modules/warehouse/constants/equipment'
import { GetEquipmentAttachmentListQueryArgs } from 'modules/warehouse/models'
import { useGetEquipmentAttachmentListQuery } from 'modules/warehouse/services/equipmentApi.service'
import { GetEquipmentAttachmentListTransformedSuccessResponse } from 'modules/warehouse/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentAttachmentListResult = CustomUseQueryHookResult<
  GetEquipmentAttachmentListQueryArgs,
  GetEquipmentAttachmentListTransformedSuccessResponse
>

type UseGetEquipmentAttachmentListOptions = CustomUseQueryOptions<
  GetEquipmentAttachmentListQueryArgs,
  GetEquipmentAttachmentListTransformedSuccessResponse
>

export const useGetEquipmentAttachmentList = (
  args: GetEquipmentAttachmentListQueryArgs,
  options?: UseGetEquipmentAttachmentListOptions,
): UseGetEquipmentAttachmentListResult => {
  const state = useGetEquipmentAttachmentListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentAttachmentListErrorMsg)
      }
    }
  }, [state.error])

  return state
}
