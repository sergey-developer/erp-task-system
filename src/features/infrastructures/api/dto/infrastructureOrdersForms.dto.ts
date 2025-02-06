import { UrgencyRateTypeCatalogItemDTO } from 'shared/catalogs/urgencyRateTypes/api/dto'
import { IdType } from 'shared/types/common'

import { InfrastructureOrderFormAttachmentDTO } from './infrastructureOrderFormAttachment.dto'
import { InfrastructureWorkDTO } from './infrastructureWork.dto'

export type InfrastructureOrderFormDTO = {
  id: IdType
  number: string
  urgencyRateType: UrgencyRateTypeCatalogItemDTO
  attachments: InfrastructureOrderFormAttachmentDTO[]
  works: InfrastructureWorkDTO[]
}

export type InfrastructureOrdersFormsDTO = InfrastructureOrderFormDTO[]
