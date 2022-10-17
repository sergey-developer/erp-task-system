import { taskStatusDict } from 'modules/task/constants/dictionary'

import {
  initialExtendedFilterFormValues,
  searchFieldDict,
  taskAssignedDict,
  taskOverdueDict,
} from '../constants'
import { ExtendedFilterProps } from '../index'

export const taskStatusDictValues = Object.values(taskStatusDict)
export const taskOverdueDictValues = Object.values(taskOverdueDict)
export const taskAssignedDictValues = Object.values(taskAssignedDict)
export const searchFieldDictValues = Object.values(searchFieldDict)

export const requiredProps: ExtendedFilterProps = {
  formValues: initialExtendedFilterFormValues,
  initialFormValues: initialExtendedFilterFormValues,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
}
