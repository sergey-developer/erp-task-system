import { AttachmentDTO } from 'features/attachments/api/dto'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'

import { EquipmentRequestArgs } from '../types'

export type GetEquipmentAttachmentsRequest = EquipmentRequestArgs &
  Pick<PaginationRequestParams, 'limit'>

export type GetEquipmentAttachmentsResponse = PaginationResponse<AttachmentDTO>
