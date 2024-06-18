import { FastFilterEnum } from 'modules/task/constants/task'
import { TaskCountersModel } from 'modules/task/models'
import { MatchedUserPermissions } from 'modules/user/utils'

import { Nullable } from 'shared/types/utils'

import { FastFilterListItemProps } from './FastFilterListItem'
import { FastFilterConfig } from './config'

export type FastFilterItem = Pick<FastFilterListItemProps, 'text' | 'amount'> & {
  value: FastFilterEnum
}

export type FastFiltersProps = {
  config: FastFilterConfig[]
  selectedFilter: Nullable<FastFilterEnum>
  isShowCounters: boolean
  isLoading: boolean
  disabled: boolean
  onChange: (value: FastFilterEnum) => void
  permissions: MatchedUserPermissions
  counters?: TaskCountersModel
}
