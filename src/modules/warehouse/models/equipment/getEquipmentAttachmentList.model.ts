import { AttachmentListItemModel } from 'modules/attachment/models'
import { BaseEquipmentRequestArgs } from 'modules/warehouse/types'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentAttachmentListQueryArgs = BaseEquipmentRequestArgs &
  Partial<Pick<PaginationParams, 'limit'>>

export type GetEquipmentAttachmentListSuccessResponse =
  PaginatedListSuccessResponse<AttachmentListItemModel>
