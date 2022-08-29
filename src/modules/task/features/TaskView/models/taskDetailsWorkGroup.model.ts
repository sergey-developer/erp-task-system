import { WorkGroupListItemModel } from 'modules/workGroup/features/WorkGroupList/models'

export type TaskDetailsWorkGroupModel = Pick<
  WorkGroupListItemModel,
  'id' | 'name'
>
