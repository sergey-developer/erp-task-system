import {
  TaskCountersFastFilterEnum,
  taskCountersFastFilterNamesDict,
  TasksFastFilterEnum,
  tasksFastFilterNamesDict,
} from 'modules/task/constants/task'

export type FastFilterOptionType<V> = {
  label: string
  value: V
}

export const taskCountersFastFilterOptions: FastFilterOptionType<TaskCountersFastFilterEnum>[] = [
  {
    value: TaskCountersFastFilterEnum.AllLines,
    label: taskCountersFastFilterNamesDict[TaskCountersFastFilterEnum.AllLines],
  },
  {
    value: TaskCountersFastFilterEnum.FirstLine,
    label: taskCountersFastFilterNamesDict[TaskCountersFastFilterEnum.FirstLine],
  },
  {
    value: TaskCountersFastFilterEnum.SecondLine,
    label: taskCountersFastFilterNamesDict[TaskCountersFastFilterEnum.SecondLine],
  },
]

export const tasksFastFilterOptions: FastFilterOptionType<TasksFastFilterEnum>[] = [
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
