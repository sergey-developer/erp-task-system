import { FastFilterEnum } from '../features/TaskList/components/FastFilter/constants'

export type GetTaskCountersQueryArgsModel = null

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
