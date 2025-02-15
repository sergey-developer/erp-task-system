import { TasksFastFilterEnum } from '../api/constants'

export type TasksFastFilterType = TasksFastFilterEnum

export type TaskFastFilterByLinesType =
  | TasksFastFilterEnum.AllLines
  | TasksFastFilterEnum.FirstLine
  | TasksFastFilterEnum.SecondLine
