import { WorkGroupListItemModel } from 'modules/workGroup/components/WorkGroupList/models'

export type TaskDetailsWorkGroupModel = Pick<
  WorkGroupListItemModel,
  'id' | 'name'
>
