import { CheckboxOptionType } from 'antd'
import React from 'react'

import { TaskStatusEnum } from 'modules/task/constants/common'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import TaskStatus from 'modules/task/features/TaskStatus/index'
import { StringMap } from 'shared/interfaces/utils'

import { ExtendedFilterFormFields, SearchFields } from './interfaces'

export enum TaskAssignedEnum {
  Assigned = 'True',
  NotAssigned = 'False',
}

export enum TaskOverdueEnum {
  Overdue = 'True',
  NotOverdue = 'False',
}

export const DEFAULT_SEARCH_FIELD: keyof SearchFields = 'searchByTitle'

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

export const searchFieldDict: Readonly<StringMap<keyof SearchFields>> = {
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

export const searchFieldOptions: Array<CheckboxOptionType> = Object.keys(
  searchFieldDict,
).map((searchField) => ({
  label: searchFieldDict[searchField as keyof SearchFields],
  value: searchField,
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
).map((status) => ({
  label: <TaskStatus status={status} text={taskStatusDict[status]} />,
  value: status,
}))
