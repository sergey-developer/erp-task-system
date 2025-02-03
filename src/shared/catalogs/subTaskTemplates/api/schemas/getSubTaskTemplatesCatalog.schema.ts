import { SupportGroupModel } from 'features/supportGroup/models'
import { TaskModel } from 'features/task/models'

import { SubTaskTemplatesCatalogDTO } from 'shared/catalogs/api/dto/subTaskTemplates'
import { MaybeUndefined } from 'shared/types/utils'

export type GetSubTaskTemplatesCatalogQueryArgs = MaybeUndefined<
  Partial<{
    type: TaskModel['type']
    supportGroup: SupportGroupModel['id']
  }>
>

export type GetSubTaskTemplatesCatalogSuccessResponse = SubTaskTemplatesCatalogDTO
