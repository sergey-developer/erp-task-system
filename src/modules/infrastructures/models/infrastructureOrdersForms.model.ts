import { IdType } from 'shared/types/common'

import { InfrastructureOrderFormAttachmentModel } from './infrastructureOrderFormAttachment.model'
import { InfrastructureWorkModel } from './infrastructureWork.model'
import { UrgencyRateTypeModel } from './urgencyRateType.model'

export type InfrastructureOrderFormListItemModel = {
  id: IdType
  number: string
  urgencyRateType: UrgencyRateTypeModel
  attachments: InfrastructureOrderFormAttachmentModel[]
  works: InfrastructureWorkModel[]
}

export type InfrastructureOrdersFormsModel = InfrastructureOrderFormListItemModel[]
