import { WorkgroupListMemberModel } from './workgroupListMember.model'

export type WorkgroupListItemModel = {
  id: number
  name: string
  seniorEngineer: WorkgroupListMemberModel
  groupLead: WorkgroupListMemberModel
  engineers: Array<WorkgroupListMemberModel>
  members: Array<WorkgroupListMemberModel>
}
