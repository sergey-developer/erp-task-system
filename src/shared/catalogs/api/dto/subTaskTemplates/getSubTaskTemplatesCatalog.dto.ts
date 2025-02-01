import { SupportGroupModel } from 'features/supportGroup/models'
import { TaskModel } from 'features/task/models'

import { MaybeUndefined } from 'shared/types/utils'

import { SubTaskTemplatesCatalogDTO } from './subTaskTemplatesCatalog.dto'

export type GetSubTaskTemplatesCatalogQueryArgs = MaybeUndefined<
  Partial<{
    type: TaskModel['type']
    supportGroup: SupportGroupModel['id']
  }>
>

export type GetSubTaskTemplatesCatalogSuccessResponse = SubTaskTemplatesCatalogDTO
