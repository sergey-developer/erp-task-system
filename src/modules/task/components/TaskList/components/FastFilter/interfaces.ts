import { FastFilterEnum } from 'modules/task/components/TaskList/constants/enums'
import { GetTaskCountersResponseModel } from 'modules/task/components/TaskList/models'
import { MaybeUndefined, Nullable } from 'shared/interfaces/utils'

import { FilterTagProps } from './FilterTag'

export type FilterItem = Pick<FilterTagProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export type FastFilterProps = {
  data: MaybeUndefined<GetTaskCountersResponseModel>
  selectedFilter: Nullable<FastFilterEnum>
  isError: boolean
  isLoading: boolean
  disabled: boolean
  onChange: (value: FastFilterEnum) => void
}
