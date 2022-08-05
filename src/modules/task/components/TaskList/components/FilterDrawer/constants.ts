import {
  ASSIGNEE_WORD,
  OBJECT_WORD,
  THEME_WORD,
} from 'modules/task/constants/words'
import { Keys, StringMap } from 'shared/interfaces/utils'

import { SearchQueries } from '../TaskListPage/interfaces'

export const searchQueriesDictionary: StringMap<Keys<SearchQueries>> = {
  searchByTitle: THEME_WORD,
  searchByName: OBJECT_WORD,
  searchByAssignee: ASSIGNEE_WORD,
}
