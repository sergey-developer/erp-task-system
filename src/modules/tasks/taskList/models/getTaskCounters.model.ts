import { FastFilterEnum } from 'modules/tasks/constants/enums'

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
