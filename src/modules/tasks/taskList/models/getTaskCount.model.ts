import { FastFilterEnum } from 'modules/tasks/constants'

export type GetTaskCountResponseModel = Record<
  Lowercase<FastFilterEnum>,
  number
>
