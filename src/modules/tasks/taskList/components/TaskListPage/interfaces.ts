import { FilterTagProps } from 'components/FilterTag'
import { FastFilterEnum } from 'modules/tasks/constants'

export type FilterListItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}
