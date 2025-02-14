import { AttachmentDTO } from 'features/attachments/api/dto'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'

import { RequestWithEquipment } from '../types'

export type GetEquipmentAttachmentsRequest = RequestWithEquipment &
  Pick<PaginationRequestParams, 'limit'>

export type GetEquipmentAttachmentsResponse = PaginationResponse<AttachmentDTO>
