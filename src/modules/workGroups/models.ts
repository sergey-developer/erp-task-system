import { PaginatedListResponseModel } from 'shared/interfaces/models'

export type WorkGroupMemberModel = {
  id: number
  fullName: string
}

export type WorkGroupModel = {
  id: number
  name: string
  members: Array<WorkGroupMemberModel>
}

export type GetWorkGroupListResponseModel =
  PaginatedListResponseModel<WorkGroupModel>
