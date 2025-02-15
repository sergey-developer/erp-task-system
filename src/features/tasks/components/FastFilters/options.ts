import { TasksFastFilterEnum } from 'features/tasks/api/constants'
import { fastFilterByLinesNamesDict, fastFilterNamesDict } from 'features/tasks/constants'
import { TaskFastFilterByLinesType, TasksFastFilterType } from 'features/tasks/types'

export type FastFilterOptionType<V> = {
  label: string
  value: V
  counterKey: string
}

export const fastFilterByLinesOptions: FastFilterOptionType<TaskFastFilterByLinesType>[] = [
  {
    value: TasksFastFilterEnum.AllLines,
    label: fastFilterByLinesNamesDict[TasksFastFilterEnum.AllLines],
    counterKey: 'allLines',
  },
  {
    value: TasksFastFilterEnum.FirstLine,
    label: fastFilterByLinesNamesDict[TasksFastFilterEnum.FirstLine],
    counterKey: 'firstLine',
  },
  {
    value: TasksFastFilterEnum.SecondLine,
    label: fastFilterByLinesNamesDict[TasksFastFilterEnum.SecondLine],
    counterKey: 'secondLine',
  },
]

export const fastFilterOptions: FastFilterOptionType<TasksFastFilterType>[] = [
  {
    value: TasksFastFilterEnum.AllLines,
    label: fastFilterNamesDict[TasksFastFilterEnum.AllLines],
    counterKey: 'allInLine',
  },
  {
    value: TasksFastFilterEnum.Mine,
    label: fastFilterNamesDict[TasksFastFilterEnum.Mine],
    counterKey: 'mine',
  },
  {
    value: TasksFastFilterEnum.Free,
    label: fastFilterNamesDict[TasksFastFilterEnum.Free],
    counterKey: 'free',
  },
  {
    value: TasksFastFilterEnum.LessThreeHours,
    label: fastFilterNamesDict[TasksFastFilterEnum.LessThreeHours],
    counterKey: 'less3Hours',
  },
  {
    value: TasksFastFilterEnum.LessOneHour,
    label: fastFilterNamesDict[TasksFastFilterEnum.LessOneHour],
    counterKey: 'less1Hour',
  },
  {
    value: TasksFastFilterEnum.Overdue,
    label: fastFilterNamesDict[TasksFastFilterEnum.Overdue],
    counterKey: 'overdue',
  },
  {
    value: TasksFastFilterEnum.Returned,
    label: fastFilterNamesDict[TasksFastFilterEnum.Returned],
    counterKey: 'returned',
  },
  {
    value: TasksFastFilterEnum.ReclassificationDenied,
    label: fastFilterNamesDict[TasksFastFilterEnum.ReclassificationDenied],
    counterKey: 'reclassificationDenied',
  },
]
