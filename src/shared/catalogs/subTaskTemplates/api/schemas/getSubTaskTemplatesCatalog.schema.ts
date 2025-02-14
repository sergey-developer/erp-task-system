import { TaskModel } from 'features/task/models'

import { SubTaskTemplatesCatalogDTO } from 'shared/catalogs/api/dto/subTaskTemplates'
import { SupportGroupDTO } from 'shared/supportGroups/api/dto'
import { MaybeUndefined } from 'shared/types/utils'

export type GetSubTaskTemplatesCatalogRequest = MaybeUndefined<
  Partial<{
    type: TaskModel['type']
    supportGroup: SupportGroupDTO['id']
  }>
>

export type GetSubTaskTemplatesCatalogResponse = SubTaskTemplatesCatalogDTO
