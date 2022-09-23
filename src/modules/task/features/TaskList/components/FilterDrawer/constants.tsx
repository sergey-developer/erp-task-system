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

import { SearchQueries } from '../TaskListPage/interfaces'

export const searchQueriesDictionary: StringMap<Keys<SearchQueries>> = {
  searchByTitle: THEME_WORD,
  searchByName: OBJECT_WORD,
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
