import { FilterTagProps } from 'components/FilterTag'

import { TaskListFiltersEnum } from './constants'

export type FilterListItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: TaskListFiltersEnum
}
