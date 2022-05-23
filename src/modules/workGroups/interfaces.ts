import { PaginatedListResponse } from 'shared/interfaces/api'

import { WorkGroupModel } from './models'

export type GetWorkGroupListResponse = PaginatedListResponse<WorkGroupModel>
