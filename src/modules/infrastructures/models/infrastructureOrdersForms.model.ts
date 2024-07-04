import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { InfrastructureOrderFormAttachmentModel } from './infrastructureOrderFormAttachment.model'
import { UrgencyRateTypeModel } from './urgencyRateType.model'

export type InfrastructureOrderFormListItemModel = {
  id: IdType
  number: string
  urgencyRateType: UrgencyRateTypeModel

  attachments: MaybeNull<InfrastructureOrderFormAttachmentModel[]>
}

export type InfrastructureOrdersFormsModel = InfrastructureOrderFormListItemModel[]
