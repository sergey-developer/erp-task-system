import { RelocationEquipmentRequestArgs } from 'features/warehouse/types'

import { RelocationEquipmentAttachmentsModel } from './relocationEquipmentAttachments.model'

export type GetRelocationEquipmentAttachmentListQueryArgs = RelocationEquipmentRequestArgs

export type GetRelocationEquipmentAttachmentListSuccessResponse =
  RelocationEquipmentAttachmentsModel
