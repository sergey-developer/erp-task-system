import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { WorkTypeActionsEnum } from '../constants'

export type WorkTypeDetailDTO = {
  id: IdType
  title: string
  actions: MaybeNull<WorkTypeActionsEnum[]>
}
