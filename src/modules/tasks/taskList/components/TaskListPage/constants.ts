import { FastFilterEnum, SmartSortEnum } from 'modules/tasks/constants'

import { ExtendedFilterFormFields, SmartSearchQueries } from './interfaces'

export const DEFAULT_PAGE_LIMIT = 15

export const DEFAULT_SMART_SEARCH_FIELD: keyof SmartSearchQueries =
  'smartSearchDescription'

export const DEFAULT_FAST_FILTER: FastFilterEnum = FastFilterEnum.All

export const DATE_FILTER_FORMAT = 'YYYY[-]MM[-]DD'

export enum SORTED_FIELDS_ENUM {
  olaNextBreachTime = 'olaNextBreachTime',
  createdAt = 'createdAt',
}

export const SORTED_FIELDS = [
  SORTED_FIELDS_ENUM.olaNextBreachTime,
  SORTED_FIELDS_ENUM.createdAt,
]
export const SMART_SORT_TO_FIELD_SORT_DIRECTIONS = {
  olaNextBreachTimeDescend: SmartSortEnum.ByOlaDesc,
  olaNextBreachTimeAscend: SmartSortEnum.ByOlaAsc,
  createdAtDescend: SmartSortEnum.ByCreatedDateDesc,
  createdAtAscend: SmartSortEnum.ByCreatedDateAsc,
}

export const SMART_SORT_DIRECTIONS_TO_SORT_FIELDS: Record<
  SmartSortEnum,
  SorterResult<Task>
> = {
  [SmartSortEnum.ByOlaDesc]: {
    columnKey: SORTED_FIELDS_ENUM.olaNextBreachTime,
    order: SORT_DIRECTIONS.descend,
  },
  [SmartSortEnum.ByOlaAsc]: {
    columnKey: SORTED_FIELDS_ENUM.olaNextBreachTime,
    order: SORT_DIRECTIONS.ascend,
  },
  [SmartSortEnum.ByCreatedDateDesc]: {
    columnKey: SORTED_FIELDS_ENUM.createdAt,
    order: SORT_DIRECTIONS.descend,
  },
  [SmartSortEnum.ByCreatedDateAsc]: {
    columnKey: SORTED_FIELDS_ENUM.createdAt,
    order: SORT_DIRECTIONS.ascend,
  },
}

export const initialExtendedFilterFormValues: ExtendedFilterFormFields = {
  creationDateRange: null,
  smartSearchField: DEFAULT_SMART_SEARCH_FIELD,
  smartSearchValue: '',
  status: [],
}
