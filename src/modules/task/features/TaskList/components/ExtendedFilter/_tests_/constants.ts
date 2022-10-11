import {
  taskExtraStatusDict,
  taskFilterStatusDict,
  taskStatusExtendedFilterDict,
} from 'modules/task/constants/dictionary'

import {
  initialExtendedFilterFormValues,
  searchQueriesDict,
} from '../constants'
import { ExtendedFilterProps } from '../index'

export const taskStatusExtendedFilterDictValues = Object.values(
  taskStatusExtendedFilterDict,
)
export const taskExtraStatusDictValues = Object.values(taskExtraStatusDict)
export const taskFilterStatusDictValues = Object.values(taskFilterStatusDict)
export const searchQueriesDictValues = Object.values(searchQueriesDict)

export const requiredProps: ExtendedFilterProps = {
  formValues: initialExtendedFilterFormValues,
  initialFormValues: initialExtendedFilterFormValues,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
}
