import { FilterTagProps } from 'components/FilterTag'
import { TaskListFiltersEnum } from 'modules/tasks/models'

export type FilterListItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: TaskListFiltersEnum
}
