import {
  taskCountersFastFilterNamesDict,
  TasksFastFilterEnum,
  tasksFastFilterNamesDict,
} from 'modules/task/constants/task'
import { TaskCountersFastFilterType, TasksFastFilterType } from 'modules/task/models'

export type FastFilterOptionType<V> = {
  label: string
  value: V
}

export const taskCountersFastFilterOptions: FastFilterOptionType<TaskCountersFastFilterType>[] = [
  {
    value: TasksFastFilterEnum.AllLines,
    label: taskCountersFastFilterNamesDict[TasksFastFilterEnum.AllLines],
  },
  {
    value: TasksFastFilterEnum.FirstLine,
    label: taskCountersFastFilterNamesDict[TasksFastFilterEnum.FirstLine],
  },
  {
    value: TasksFastFilterEnum.SecondLine,
    label: taskCountersFastFilterNamesDict[TasksFastFilterEnum.SecondLine],
  },
]

export const tasksFastFilterOptions: FastFilterOptionType<TasksFastFilterType>[] = [
  {
    value: TasksFastFilterEnum.AllInLine,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.AllInLine],
  },
  {
    value: TasksFastFilterEnum.Mine,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.Mine],
  },
  {
    value: TasksFastFilterEnum.Free,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.Free],
  },
  {
    value: TasksFastFilterEnum.LessThreeHours,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.LessThreeHours],
  },
  {
    value: TasksFastFilterEnum.LessOneHour,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.LessOneHour],
  },
  {
    value: TasksFastFilterEnum.Overdue,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.Overdue],
  },
  {
    value: TasksFastFilterEnum.Returned,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.Returned],
  },
  {
    value: TasksFastFilterEnum.ReclassificationDenied,
    label: tasksFastFilterNamesDict[TasksFastFilterEnum.ReclassificationDenied],
  },
]
