import { SmartSortEnum } from 'modules/tasks/constants'

export const DEFAULT_PAGE_LIMIT = 20

export const DATE_FILTER_FORMAT = 'YYYY[-]MM[-]DD'

export const SORTED_FIELDS = ['olaNextBreachTime', 'createdAt']

export const SMART_SORT_TO_FIELD_SORT_DIRECTIONS = {
  olaNextBreachTimeDescend: SmartSortEnum.ByOlaDesc,
  olaNextBreachTimeAscend: SmartSortEnum.ByOlaAsc,
  createdAtDescend: SmartSortEnum.ByCreatedDateDesc,
  createdAtAscend: SmartSortEnum.ByCreatedDateAsc,
}
