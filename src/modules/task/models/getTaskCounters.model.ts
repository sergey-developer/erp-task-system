import { FastFilterEnum } from '../features/FastFilterList/constants'

export type GetTaskCountersQueryArgs = null

export type GetTaskCountersSuccessResponse = Record<
  Lowercase<FastFilterEnum>,
  number
>
