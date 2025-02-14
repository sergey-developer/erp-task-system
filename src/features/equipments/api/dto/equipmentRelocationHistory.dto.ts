import { AttachmentDetailDTO } from 'features/attachments/api/dto'
import { RelocationTaskStatusEnum } from 'features/relocationTasks/api/constants'
import { ExternalRelocationDetailDTO } from 'features/relocationTasks/api/dto'
import { UserDetailDTO } from 'features/users/api/dto'

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
  externalRelocation: MaybeNull<Pick<ExternalRelocationDetailDTO, 'number'>>
}

export type EquipmentRelocationHistoryDTO = EquipmentRelocationHistoryItemDTO[]
