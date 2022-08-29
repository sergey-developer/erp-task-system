import { WorkgroupListItemModel } from 'modules/workgroup/features/WorkgroupList/models'

export type TaskDetailsWorkGroupModel = Pick<
  WorkgroupListItemModel,
  'id' | 'name'
>
