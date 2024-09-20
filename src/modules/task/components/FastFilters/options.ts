import { FastFilterByLinesType, FastFilterType } from 'modules/task/components/FastFilters/types'
import {
  fastFilterByLinesNamesDict,
  fastFilterNamesDict,
  TasksFastFilterEnum,
} from 'modules/task/constants/task'

export type FastFilterOptionType<V> = {
  label: string
  value: V
  counterKey: string
}

export const fastFilterByLinesOptions: FastFilterOptionType<FastFilterByLinesType>[] = [
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

export const fastFilterOptions: FastFilterOptionType<FastFilterType>[] = [
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
