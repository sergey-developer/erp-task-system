import { CheckboxOptionType } from 'antd'
import { TasksSearchFields } from 'features/tasks/api/schemas'
import {
  badgeByTaskExtendedStatus,
  iconByTaskExtendedStatus,
} from 'features/tasks/components/TaskStatus/constants'
import TaskStatus from 'features/tasks/components/TaskStatus/index'
import {
  TaskExtendedStatusEnum,
  TaskAssignedEnum,
  TaskOverdueEnum,
} from 'features/tasks/api/constants'
import {
  taskExtendedStatusDict,
} from 'features/tasks/constants'
import isEqual from 'lodash/isEqual'
import React from 'react'

import { StringMap } from 'shared/types/utils'

export const DEFAULT_SEARCH_FIELD: keyof TasksSearchFields = 'searchByTitle'

export const searchFieldDict: Readonly<StringMap<keyof TasksSearchFields>> = {
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
    label: searchFieldDict[searchField as keyof TasksSearchFields],
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
