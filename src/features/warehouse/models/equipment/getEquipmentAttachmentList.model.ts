import { AttachmentDTO } from 'features/attachments/api/dto'
import { EquipmentRequestArgs } from 'features/warehouse/types'

import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'

export type GetEquipmentAttachmentListQueryArgs = EquipmentRequestArgs &
  Pick<PaginationParams, 'limit'>

export type GetEquipmentAttachmentListSuccessResponse = PaginationResponse<AttachmentDTO>
