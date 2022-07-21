import { FastFilterEnum } from 'modules/tasks/constants'

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
