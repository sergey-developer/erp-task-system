import { IdType } from 'shared/types/common'
import { ExtendSortKey, SortParams } from 'shared/types/sort'

import { TechnicalExaminationsDTO } from '../dto'

export type GetTechnicalExaminationsSortKey = 'created_at'
export type GetTechnicalExaminationsSortValue = ExtendSortKey<GetTechnicalExaminationsSortKey>

export type GetTechnicalExaminationsRequest = SortParams<GetTechnicalExaminationsSortValue> &
  Partial<{
    equipments: IdType[]
  }>

export type GetTechnicalExaminationsResponse = TechnicalExaminationsDTO
