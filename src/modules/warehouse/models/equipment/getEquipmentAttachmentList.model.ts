import { AttachmentListItemModel } from 'modules/attachment/models'
import { EquipmentRequestArgs } from 'modules/warehouse/types'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentAttachmentListQueryArgs = EquipmentRequestArgs &
  Partial<Pick<PaginationParams, 'limit'>>

export type GetEquipmentAttachmentListSuccessResponse =
  PaginatedListSuccessResponse<AttachmentListItemModel>
