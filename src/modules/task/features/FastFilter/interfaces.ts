import { GetTaskCountersSuccessResponse } from 'modules/task/models'

import { MaybeUndefined, Nullable } from 'shared/interfaces/utils'

import { FilterTagProps } from './FilterTag'
import { FastFilterEnum } from './constants'

export type FilterItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export type FastFilterProps = {
  data: MaybeUndefined<GetTaskCountersSuccessResponse>
  selectedFilter: Nullable<FastFilterEnum>
  isError: boolean
  isLoading: boolean
  disabled: boolean
  onChange: (value: FastFilterEnum) => void
}
