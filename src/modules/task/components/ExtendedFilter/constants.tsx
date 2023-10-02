import { CheckboxOptionType } from 'antd'
import isEqual from 'lodash/isEqual'
import { FieldNames } from 'rc-select/lib/Select'
import React from 'react'

import {
  badgeByTaskExtendedStatus,
  iconByTaskExtendedStatus,
} from 'modules/task/components/TaskStatus/constants'
import TaskStatus from 'modules/task/components/TaskStatus/index'
import {
  TaskExtendedStatusEnum,
  taskExtendedStatusDict,
  TaskAssignedEnum,
  TaskOverdueEnum,
} from 'modules/task/constants/task'
import { SearchFields } from 'modules/task/models'

import { StringMap } from 'shared/types/utils'

import { ExtendedFilterFormFields } from './types'

export const DEFAULT_SEARCH_FIELD: keyof SearchFields = 'searchByTitle'

export const initialExtendedFilterFormValues: Readonly<ExtendedFilterFormFields> = {
  completeAt: [],
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: '',
  status: [],
  isOverdue: [],
  isAssigned: [],
  workGroupId: undefined,
  manager: undefined,
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

export const searchFieldOptions: CheckboxOptionType[] = Object.keys(searchFieldDict).map(
  (searchField) => ({
    label: searchFieldDict[searchField as keyof SearchFields],
    value: searchField,
  }),
)

export const taskAssignedOptions: CheckboxOptionType[] = Object.values(TaskAssignedEnum).map(
  (status) => ({
    label: taskAssignedDict[status],
    value: status,
  }),
)

export const taskOverdueOptions: CheckboxOptionType[] = Object.values(TaskOverdueEnum).map(
  (status) => ({
    label: taskOverdueDict[status],
    value: status,
  }),
)

export const taskExtendedStatusOptions: CheckboxOptionType[] = Object.values(TaskExtendedStatusEnum)
  .filter((status) => !isEqual(status, TaskExtendedStatusEnum.FirstLineReturned))
  .map((status) => ({
    label: (
      <TaskStatus
        status={status}
        icon={iconByTaskExtendedStatus[status]}
        badge={badgeByTaskExtendedStatus[status]}
        text={taskExtendedStatusDict[status]}
      />
    ),
    value: status,
  }))

export const managerSelectFieldNames: Readonly<FieldNames> = {
  label: 'fullName',
  value: 'id',
}
