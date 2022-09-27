import React from 'react'

import { taskStatusDict } from 'modules/task/constants/dictionary'
import { TaskStatusEnum } from 'modules/task/constants/enums'
import {
  ASSIGNEE_WORD,
  OBJECT_WORD,
  THEME_WORD,
} from 'modules/task/constants/words'
import TaskStatus from 'modules/task/features/TaskStatus'
import { Keys, StringMap } from 'shared/interfaces/utils'

import { ExtendedFilterFormFields, SearchQueries } from './interfaces'

export const DEFAULT_SEARCH_FIELD: Keys<SearchQueries> = 'searchByTitle'

export const initialExtendedFilterFormValues: ExtendedFilterFormFields = {
  olaNextBreachTimeRange: null,
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: '',
  status: [],
  workGroupId: undefined,
}

export const searchQueriesDict: StringMap<Keys<SearchQueries>> = {
  searchByName: OBJECT_WORD,
  searchByTitle: THEME_WORD,
  searchByAssignee: ASSIGNEE_WORD,
}

export const checkboxStatusOptions = Object.values(TaskStatusEnum).map(
  (taskStatus) => ({
    label: (
      <TaskStatus status={taskStatus} value={taskStatusDict[taskStatus]} />
    ),
    value: taskStatus,
  }),
)
