import { PaginatedListSuccessResponse } from 'shared/models'

import { SubTaskTemplateModel } from './subTaskTemplate.model'

export type GetSubTaskTemplateListQueryArgs = void

export type GetSubTaskTemplateListSuccessResponse =
  PaginatedListSuccessResponse<SubTaskTemplateModel>
