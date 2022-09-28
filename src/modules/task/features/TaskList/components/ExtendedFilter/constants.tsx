import { CheckboxOptionType } from 'antd'
import React from 'react'

import {
  TaskExtraStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import {
  ASSIGNEE_WORD,
  OBJECT_WORD,
  THEME_WORD,
} from 'modules/task/constants/words'
import TaskStatus from 'modules/task/features/TaskStatus'
import { StringMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

import { ExtendedFilterFormFields, SearchQueries } from './interfaces'

export const DEFAULT_SEARCH_FIELD: keyof SearchQueries = 'searchByTitle'

export const initialExtendedFilterFormValues: ExtendedFilterFormFields = {
  olaNextBreachTimeRange: null,
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: '',
  status: [],
  workGroupId: undefined,
}

export const searchQueriesDict: StringMap<keyof SearchQueries> = {
  searchByName: OBJECT_WORD,
  searchByTitle: THEME_WORD,
  searchByAssignee: ASSIGNEE_WORD,
}

export const checkboxStatusOptions: Array<CheckboxOptionType> = [
  ...Object.values(TaskExtraStatusEnum).map((status) => ({
    label: <TaskStatus status={status} text={taskStatusDict[status]} />,
    value: status,
  })),
  ...Object.values(TaskStatusEnum)
    .filter(
      (status) =>
        !isEqual(status, TaskStatusEnum.New) &&
        !isEqual(status, TaskStatusEnum.Appointed),
    )
    .map((status) => ({
      label: <TaskStatus status={status} text={taskStatusDict[status]} />,
      value: status,
    })),
]
