import {
  ExtendedFilterFormFields,
  FastFilterEnum,
  SmartSearchQueries,
  SmartSortEnum,
} from 'modules/tasks/models'

export const DEFAULT_PAGE_LIMIT = 15

export const DEFAULT_SMART_SEARCH_FIELD: keyof SmartSearchQueries =
  'smartSearchDescription'

export const DEFAULT_FAST_FILTER: FastFilterEnum = FastFilterEnum.All

export const DATE_FILTER_FORMAT = 'YYYY[-]MM[-]DD'

export const SORTED_FIELDS = ['olaNextBreachTime', 'createdAt']

export const SMART_SORT_TO_FIELD_SORT_DIRECTIONS = {
  olaNextBreachTimeDescend: SmartSortEnum.ByOlaDesc,
  olaNextBreachTimeAscend: SmartSortEnum.ByOlaAsc,
  createdAtDescend: SmartSortEnum.ByCreatedDateDesc,
  createdAtAscend: SmartSortEnum.ByCreatedDateAsc,
}

export const initialExtendedFilterFormValues: ExtendedFilterFormFields = {
  creationDateRange: null,
  smartSearchField: DEFAULT_SMART_SEARCH_FIELD,
  smartSearchValue: '',
  status: [],
}
