import { SupportGroupModel } from 'features/supportGroup/models'
import { TaskModel } from 'features/task/models'

import { MaybeUndefined } from 'shared/types/utils'

import { SubTaskTemplateListModel } from './subTaskTemplateList.model'

export type GetSubTaskTemplateListQueryArgs = MaybeUndefined<
  Partial<{
    type: TaskModel['type']
    supportGroup: SupportGroupModel['id']
  }>
>

export type GetSubTaskTemplateListSuccessResponse = SubTaskTemplateListModel
