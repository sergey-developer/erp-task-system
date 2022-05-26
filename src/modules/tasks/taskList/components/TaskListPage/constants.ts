import { SorterResult } from 'antd/es/table/interface'

import { FastFilterEnum, SortEnum } from 'modules/tasks/constants'
import { Task } from 'modules/tasks/taskList/models'

import { ExtendedFilterFormFields, SearchQueries } from './interfaces'

export const DEFAULT_PAGE_LIMIT = 15

export const DEFAULT_SEARCH_FIELD: keyof SearchQueries = 'searchByTitle'

export const DEFAULT_FAST_FILTER: FastFilterEnum = FastFilterEnum.All

export const DATE_FILTER_FORMAT = 'YYYY[-]MM[-]DD'

export enum SORT_DIRECTIONS_ENUM {
  ascend = 'ascend',
  descend = 'descend',
}

export enum SORTED_FIELDS_ENUM {
  olaNextBreachTime = 'olaNextBreachTime',
  createdAt = 'createdAt',
}

export const SORTED_FIELDS = [
  SORTED_FIELDS_ENUM.olaNextBreachTime,
  SORTED_FIELDS_ENUM.createdAt,
]
export const SMART_SORT_TO_FIELD_SORT_DIRECTIONS = {
  olaNextBreachTimeDescend: SortEnum.ByOlaDesc,
  olaNextBreachTimeAscend: SortEnum.ByOlaAsc,
  createdAtDescend: SortEnum.ByCreatedDateDesc,
  createdAtAscend: SortEnum.ByCreatedDateAsc,
}

export const SMART_SORT_DIRECTIONS_TO_SORT_FIELDS: Record<
  SortEnum,
  SorterResult<Task>
> = {
  [SortEnum.ByOlaDesc]: {
    columnKey: SORTED_FIELDS_ENUM.olaNextBreachTime,
    order: SORT_DIRECTIONS_ENUM.descend,
  },
  [SortEnum.ByOlaAsc]: {
    columnKey: SORTED_FIELDS_ENUM.olaNextBreachTime,
    order: SORT_DIRECTIONS_ENUM.ascend,
  },
  [SortEnum.ByCreatedDateDesc]: {
    columnKey: SORTED_FIELDS_ENUM.createdAt,
    order: SORT_DIRECTIONS_ENUM.descend,
  },
  [SortEnum.ByCreatedDateAsc]: {
    columnKey: SORTED_FIELDS_ENUM.createdAt,
    order: SORT_DIRECTIONS_ENUM.ascend,
  },
}

export const initialExtendedFilterFormValues: ExtendedFilterFormFields = {
  creationDateRange: null,
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: '',
  status: [],
  workGroupId: '',
}
