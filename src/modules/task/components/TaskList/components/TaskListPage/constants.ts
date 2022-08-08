import { SorterResult } from 'antd/es/table/interface'

import { SortEnum } from 'modules/task/components/TaskList/constants/enums'
import { Keys } from 'shared/interfaces/utils'

import { TaskTableListItem } from '../TaskTable/interfaces'
import { ExtendedFilterFormFields, SearchQueries } from './interfaces'

export const DEFAULT_PAGE_LIMIT = 15

export const DEFAULT_SEARCH_FIELD: Keys<SearchQueries> = 'searchByTitle'

export const DATE_FILTER_FORMAT = 'YYYY[-]MM[-]DD'

export enum SortDirectionsEnum {
  ascend = 'ascend',
  descend = 'descend',
}

export enum SortedFieldsEnum {
  olaNextBreachTime = 'olaNextBreachTime',
  createdAt = 'createdAt',
}

export const SORTED_FIELDS = [
  SortedFieldsEnum.olaNextBreachTime,
  SortedFieldsEnum.createdAt,
]

export const SMART_SORT_TO_FIELD_SORT_DIRECTIONS = {
  olaNextBreachTimeDescend: SortEnum.ByOlaDesc,
  olaNextBreachTimeAscend: SortEnum.ByOlaAsc,
  createdAtDescend: SortEnum.ByCreatedDateDesc,
  createdAtAscend: SortEnum.ByCreatedDateAsc,
}

export const SMART_SORT_DIRECTIONS_TO_SORT_FIELDS: Record<
  SortEnum,
  SorterResult<TaskTableListItem>
> = {
  [SortEnum.ByOlaDesc]: {
    columnKey: SortedFieldsEnum.olaNextBreachTime,
    order: SortDirectionsEnum.descend,
  },
  [SortEnum.ByOlaAsc]: {
    columnKey: SortedFieldsEnum.olaNextBreachTime,
    order: SortDirectionsEnum.ascend,
  },
  [SortEnum.ByCreatedDateDesc]: {
    columnKey: SortedFieldsEnum.createdAt,
    order: SortDirectionsEnum.descend,
  },
  [SortEnum.ByCreatedDateAsc]: {
    columnKey: SortedFieldsEnum.createdAt,
    order: SortDirectionsEnum.ascend,
  },
}

export const initialExtendedFilterFormValues: ExtendedFilterFormFields = {
  creationDateRange: null,
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: '',
  status: [],
  workGroupId: undefined,
}
