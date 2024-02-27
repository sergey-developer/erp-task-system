import { AttachmentListItemModel } from 'modules/attachment/models'
import { BaseEquipmentRequestArgs } from 'modules/warehouse/types'

import { PaginationResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentAttachmentListQueryArgs = BaseEquipmentRequestArgs &
  Pick<PaginationParams, 'limit'>

export type GetEquipmentAttachmentListSuccessResponse = PaginationResponse<AttachmentListItemModel>
