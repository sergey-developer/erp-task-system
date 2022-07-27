import { WorkGroupListMemberModel } from './workGroupListMember.model'

export type WorkGroupListItemModel = {
  id: number
  name: string
  seniorEngineer: WorkGroupListMemberModel
  groupLead: WorkGroupListMemberModel
  members: Array<WorkGroupListMemberModel>
}
