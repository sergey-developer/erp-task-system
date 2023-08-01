import { GetTaskCountersSuccessResponse } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants/roles'

import { MaybeUndefined, Nullable } from 'shared/interfaces/utils'

import { FastFilterListItemProps } from './FastFilterListItem'
import { FastFilterEnum } from './constants'

export type FastFilterItem = Pick<
  FastFilterListItemProps,
  'text' | 'amount'
> & {
  value: FastFilterEnum
}

export type FastFilterListProps = {
  data: MaybeUndefined<GetTaskCountersSuccessResponse>
  selectedFilter: Nullable<FastFilterEnum>
  isShowCounters: boolean
  isLoading: boolean
  disabled: boolean
  onChange: (value: FastFilterEnum) => void
  userRole?: UserRoleEnum
}
