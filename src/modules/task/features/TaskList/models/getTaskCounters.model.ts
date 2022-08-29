import { FastFilterEnum } from 'modules/task/features/TaskList/constants/enums'

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
