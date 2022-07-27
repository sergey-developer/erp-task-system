import {
  ASSIGNEE_WORD,
  OBJECT_WORD,
  THEME_WORD,
} from 'modules/task/constants/words'

import { SearchQueries } from '../TaskListPage/interfaces'

export const searchQueriesDictionary: Record<keyof SearchQueries, string> = {
  searchByTitle: THEME_WORD,
  searchByName: OBJECT_WORD,
  searchByAssignee: ASSIGNEE_WORD,
}
