import { TaskDetailDTO } from 'features/tasks/api/dto'

import { SubTaskTemplatesCatalogDTO } from 'shared/catalogs/subTaskTemplates/api/dto'
import { SupportGroupDTO } from 'shared/supportGroups/api/dto'
import { MaybeUndefined } from 'shared/types/utils'

export type GetSubTaskTemplatesCatalogRequest = MaybeUndefined<
  Partial<{
    type: TaskDetailDTO['type']
    supportGroup: SupportGroupDTO['id']
  }>
>

export type GetSubTaskTemplatesCatalogResponse = SubTaskTemplatesCatalogDTO
