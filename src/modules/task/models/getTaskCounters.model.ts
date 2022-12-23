import { FastFilterEnum } from '../features/TaskList/FastFilter/constants'

export type GetTaskCountersQueryArgsModel = null

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
