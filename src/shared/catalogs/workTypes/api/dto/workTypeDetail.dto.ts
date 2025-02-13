import { WorkTypeActionsEnum } from 'features/warehouse/constants/workType/enum'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type WorkTypeDetailDTO = {
  id: IdType
  title: string
  actions: MaybeNull<WorkTypeActionsEnum[]>
}
