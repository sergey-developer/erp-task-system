export type WorkGroupMemberModel = {
  id: number
  fullName: string
}

export type WorkGroupModel = {
  id: number
  name: string
  seniorEngineer: WorkGroupMemberModel
  groupLead: WorkGroupMemberModel
  members: Array<WorkGroupMemberModel>
}

export type GetWorkGroupListResponseModel = WorkGroupModel[]
