import { Moment } from 'moment/moment'

import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'

import { FastFilterEnum } from '../../constants/common'

export type SearchQueries = Partial<{
  searchByAssignee: string
  searchByName: string
  searchByTitle: string
}>

export type ExtendedFilterQueries = {
  completeAtFrom?: string
  completeAtTo?: string
  status?: TaskStatusEnum[]
  filter?: FastFilterEnum
  isAssigned?: TaskExtraStatusEnum[]
  workGroupId?: number
} & SearchQueries

export type ExtendedFilterFormFields = {
  completeAt: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchQueries
  searchValue: string
  status: Array<TaskStatusEnum | TaskExtraStatusEnum | FastFilterEnum>
  workGroupId: MaybeUndefined<string>
}
