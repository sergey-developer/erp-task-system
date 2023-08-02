import { FastFilterEnum } from '../components/FastFilterList/constants'

export type GetTaskCountersQueryArgs = void

export type GetTaskCountersSuccessResponse = Record<
  Lowercase<FastFilterEnum>,
  number
>
