import { FastFilterEnum } from '../features/FastFilter/constants'

export type GetTaskCountersQueryArgs = null

export type GetTaskCountersSuccessResponse = Record<
  Lowercase<FastFilterEnum>,
  number
>
