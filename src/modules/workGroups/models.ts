import { PaginatedListResponse } from 'shared/interfaces/api'

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
  PaginatedListResponse<WorkGroupModel>
