import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { UserDetailDTO } from 'features/users/api/dto'
import { RelocationTaskStatusEnum } from 'features/warehouse/constants/relocationTask'
import { ExternalRelocationModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentRelocationHistoryAttachmentDTO = Pick<
  AttachmentDetailDTO,
  'id' | 'name' | 'size' | 'url'
> & {
  createdAt: string
  createdBy: Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName'>
}

export type EquipmentRelocationHistoryItemDTO = {
  id: IdType
  createdAt: string
  relocateFrom: string
  relocateTo: string
  createdBy: string
  status: RelocationTaskStatusEnum

  completedAt: MaybeNull<string>
  documents: MaybeNull<EquipmentRelocationHistoryAttachmentDTO[]>
  externalRelocation: MaybeNull<Pick<ExternalRelocationModel, 'number'>>
}

export type EquipmentRelocationHistoryDTO = EquipmentRelocationHistoryItemDTO[]
