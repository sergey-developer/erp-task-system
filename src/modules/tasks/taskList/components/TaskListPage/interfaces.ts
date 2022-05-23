import { FilterTagProps } from 'components/FilterTag'
import { FastFilterEnum } from 'modules/tasks/models'

export type FilterListItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export enum SORT_DIRECTIONS {
  ascend = 'ascend',
  descend = 'descend',
}
