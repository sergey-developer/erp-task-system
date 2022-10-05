import { CheckboxOptionType } from 'antd'
import React from 'react'

import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import {
  taskExtraStatusDict,
  taskFilterStatusDict,
  taskStatusDict,
} from 'modules/task/constants/dictionary'
import {
  TaskExtraStatus,
  TaskFilterStatus,
  TaskStatus,
} from 'modules/task/features/TaskStatus'
import { StringMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import { FastFilterEnum } from '../../constants/common'
import { ExtendedFilterFormFields, SearchQueries } from './interfaces'

export const DEFAULT_SEARCH_FIELD: keyof SearchQueries = 'searchByTitle'

export const initialExtendedFilterFormValues: ExtendedFilterFormFields = {
  completeAt: null,
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: '',
  status: [],
  isAssigned: [],
  filter: undefined,
  workGroupId: undefined,
}

export const searchQueriesDict: StringMap<keyof SearchQueries> = {
  searchByName: 'Объект',
  searchByTitle: 'Тема',
  searchByAssignee: 'Исполнитель',
}

export const checkboxExtraStatusOptions: Array<CheckboxOptionType> =
  Object.values(TaskExtraStatusEnum).map((status) => ({
    label: (
      <TaskExtraStatus status={status} text={taskExtraStatusDict[status]} />
    ),
    value: status,
  }))

export const checkboxFilterStatusOptions: Array<CheckboxOptionType> = [
  {
    label: (
      <TaskFilterStatus
        status={FastFilterEnum.Overdue}
        text={taskFilterStatusDict[FastFilterEnum.Overdue]}
      />
    ),
    value: FastFilterEnum.Overdue,
  },
]

export const checkboxStatusOptions: Array<CheckboxOptionType> = Object.values(
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
