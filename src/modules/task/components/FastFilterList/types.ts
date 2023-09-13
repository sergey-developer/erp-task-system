import { FastFilterEnum } from 'modules/task/constants/task'
import { TaskCountersModel } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants'

import { Nullable } from 'shared/types/utils'

import { FastFilterListItemProps } from './FastFilterListItem'

export type FastFilterItem = Pick<FastFilterListItemProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export type FastFilterListProps = {
  data?: TaskCountersModel
  selectedFilter: Nullable<FastFilterEnum>
  isShowCounters: boolean
  isLoading: boolean
  disabled: boolean
  onChange: (value: FastFilterEnum) => void
  userRole?: UserRoleEnum
}
