import { CheckboxOptionType } from 'antd'
import React from 'react'

import { TaskStatusEnum } from 'modules/task/constants/common'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import TaskStatus from 'modules/task/features/TaskStatus'
import { StringMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import { ExtendedFilterFormFields, SearchQueries } from './interfaces'

export enum TaskAssignedEnum {
  Assigned = 'True',
  NotAssigned = 'False',
}

export enum TaskOverdueEnum {
  Overdue = 'True',
  NotOverdue = 'False',
}

export const DEFAULT_SEARCH_FIELD: keyof SearchQueries = 'searchByTitle'

export const initialExtendedFilterFormValues: Readonly<ExtendedFilterFormFields> =
  {
    completeAt: null,
    searchField: DEFAULT_SEARCH_FIELD,
    searchValue: '',
    status: [],
    isOverdue: [],
    isAssigned: [],
    workGroupId: undefined,
  }

export const searchQueriesDict: Readonly<StringMap<keyof SearchQueries>> = {
  searchByName: 'Объект',
  searchByTitle: 'Тема',
  searchByAssignee: 'Исполнитель',
}

export const taskAssignedDict: Readonly<StringMap<TaskAssignedEnum>> = {
  [TaskAssignedEnum.Assigned]: 'Есть',
  [TaskAssignedEnum.NotAssigned]: 'Нет',
}

export const taskOverdueDict: Readonly<StringMap<TaskOverdueEnum>> = {
  [TaskOverdueEnum.Overdue]: 'Да',
  [TaskOverdueEnum.NotOverdue]: 'Нет',
}

export const taskStatusExtendedFilterDict = { ...taskStatusDict }
delete taskStatusExtendedFilterDict.NEW

export const searchQueriesOptions: Array<CheckboxOptionType> = Object.keys(
  searchQueriesDict,
).map((searchQueryName) => ({
  label: searchQueriesDict[searchQueryName as keyof SearchQueries],
  value: searchQueryName,
}))

export const taskAssignedOptions: Array<CheckboxOptionType> = Object.values(
  TaskAssignedEnum,
).map((status) => ({
  label: taskAssignedDict[status],
  value: status,
}))

export const taskOverdueOptions: Array<CheckboxOptionType> = Object.values(
  TaskOverdueEnum,
).map((status) => ({
  label: taskOverdueDict[status],
  value: status,
}))

export const taskStatusOptions: Array<CheckboxOptionType> = Object.values(
  TaskStatusEnum,
)
  .filter(
    (status) =>
      !isEqual(status, TaskStatusEnum.New) &&
      !isEqual(status, TaskStatusEnum.Appointed),
  )
  .map((status) => ({
    label: <TaskStatus status={status} text={taskStatusDict[status]} />,
    value: status,
  }))
