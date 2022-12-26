import { FastFilterEnum } from '../features/FastFilter/constants'

export type GetTaskCountersQueryArgsModel = null

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
