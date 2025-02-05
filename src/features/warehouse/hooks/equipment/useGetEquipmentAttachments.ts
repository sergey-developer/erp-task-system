import { getEquipmentAttachmentListErrMsg } from 'features/warehouse/constants/equipment'
import { GetEquipmentAttachmentListQueryArgs } from 'features/warehouse/models'
import { useGetEquipmentAttachmentListQuery } from 'features/warehouse/services/equipmentApi.service'
import { GetEquipmentAttachmentListTransformedSuccessResponse } from 'features/warehouse/types'
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
  GetEquipmentAttachmentListQueryArgs,
  GetEquipmentAttachmentListTransformedSuccessResponse
>

type UseGetEquipmentAttachmentListOptions = CustomUseQueryOptions<
  GetEquipmentAttachmentListQueryArgs,
  GetEquipmentAttachmentListTransformedSuccessResponse
>

export const useGetEquipmentAttachments = (
  args: GetEquipmentAttachmentListQueryArgs,
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
