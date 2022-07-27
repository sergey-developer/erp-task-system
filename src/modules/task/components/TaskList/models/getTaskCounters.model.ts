import { FastFilterEnum } from 'modules/task/constants/enums'

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
