import { FastFilterEnum } from 'modules/task/features/TaskList/constants/common'
import { GetTaskCountersResponseModel } from 'modules/task/features/TaskList/models'
import { MaybeUndefined, Nullable } from 'shared/interfaces/utils'

import { FastFilterItemProps } from './FastFilterItem'

export type FilterItem = Pick<FastFilterItemProps, 'text' | 'amount'> & {
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
