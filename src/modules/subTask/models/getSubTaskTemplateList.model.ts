import { TaskModel } from 'modules/task/models'

import { MaybeUndefined } from 'shared/interfaces/utils'
import { SupportGroupModel } from 'shared/models'

import { SubTaskTemplateModel } from './subTaskTemplate.model'

export type GetSubTaskTemplateListQueryArgs = MaybeUndefined<
  Partial<{
    type: TaskModel['type']
    supportGroup: SupportGroupModel['id']
  }>
>

export type GetSubTaskTemplateListSuccessResponse = Array<SubTaskTemplateModel>
