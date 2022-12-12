import { PaginatedListResponseModel } from 'shared/models'

import { SubTaskTemplateModel } from './subTaskTemplate.model'

export type GetSubTaskTemplateListQueryArgsModel = void

export type GetSubTaskTemplateListResponseModel =
  PaginatedListResponseModel<SubTaskTemplateModel>
