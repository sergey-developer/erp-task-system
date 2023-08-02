import { SupportGroupModel } from 'modules/supportGroup/models'
import { TaskModel } from 'modules/task/models'

import { MaybeUndefined } from 'shared/types/utils'

import { SubTaskTemplateModel } from './subTaskTemplate.model'

export type GetSubTaskTemplateListQueryArgs = MaybeUndefined<
  Partial<{
    type: TaskModel['type']
    supportGroup: SupportGroupModel['id']
  }>
>

export type GetSubTaskTemplateListSuccessResponse = Array<SubTaskTemplateModel>
