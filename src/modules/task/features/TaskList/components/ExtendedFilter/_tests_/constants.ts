import {
  taskExtraStatusDict,
  taskFilterStatusDict,
  taskStatusDict,
} from 'modules/task/constants/dictionary'

import { searchQueriesDict } from '../constants'

export const taskStatusExtendedFilterDict = { ...taskStatusDict }
delete taskStatusExtendedFilterDict.NEW

export const taskStatusDictValues = Object.values(taskStatusExtendedFilterDict)
export const taskExtraStatusDictValues = Object.values(taskExtraStatusDict)
export const taskFilterStatusDictValues = Object.values(taskFilterStatusDict)
export const searchQueriesDictValues = Object.values(searchQueriesDict)
