type WorkGroupListMemberModel = {
  id: number
  fullName: string
}

export type WorkGroupListItemModel = {
  id: number
  name: string
  seniorEngineer: WorkGroupListMemberModel
  groupLead: WorkGroupListMemberModel
  members: Array<WorkGroupListMemberModel>
}
