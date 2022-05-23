import { PaginatedListResponse } from 'shared/interfaces/api'

export type WorkGroupModel = {
  id: number
  name: string
}

export type GetWorkGroupListResponseModel =
  PaginatedListResponse<WorkGroupModel>
