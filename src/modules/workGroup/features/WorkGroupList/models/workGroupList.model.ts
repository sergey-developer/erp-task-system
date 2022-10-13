import { WorkGroupListMemberModel } from './workGroupListMember.model'

export type WorkGroupListItemModel = {
  id: number
  name: string
  seniorEngineer: WorkGroupListMemberModel
  groupLead: WorkGroupListMemberModel
  engineers: Array<WorkGroupListMemberModel>
  members: Array<WorkGroupListMemberModel>
}
