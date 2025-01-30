import { AttachmentListItemModel } from 'features/attachment/models'
import { EquipmentRequestArgs } from 'features/warehouse/types'

import { PaginationResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentAttachmentListQueryArgs = EquipmentRequestArgs &
  Pick<PaginationParams, 'limit'>

export type GetEquipmentAttachmentListSuccessResponse = PaginationResponse<AttachmentListItemModel>
