import { UrgencyRateTypeListItemModel } from 'shared/catalogs/api/dto/urgencyRateTypes'
import { IdType } from 'shared/types/common'

import { InfrastructureOrderFormAttachmentModel } from './infrastructureOrderFormAttachment.model'
import { InfrastructureWorkModel } from './infrastructureWork.model'

export type InfrastructureOrderFormListItemModel = {
  id: IdType
  number: string
  urgencyRateType: UrgencyRateTypeListItemModel
  attachments: InfrastructureOrderFormAttachmentModel[]
  works: InfrastructureWorkModel[]
}

export type InfrastructureOrdersFormsModel = InfrastructureOrderFormListItemModel[]
