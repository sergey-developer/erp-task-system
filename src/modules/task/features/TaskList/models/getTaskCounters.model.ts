import { FastFilterEnum } from 'modules/task/features/TaskList/constants/common'

export type GetTaskCountersQueryArgsModel = null

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
