import { WorkGroupListItemModel } from './workGroupList.model'

export type GetWorkGroupListQueryArgs = Partial<{ taskId: number }>

export type GetWorkGroupListSuccessResponse = Array<WorkGroupListItemModel>
