import { FastFilterEnum } from 'modules/task/components/TaskList/constants/enums'

export type GetTaskCountersResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
