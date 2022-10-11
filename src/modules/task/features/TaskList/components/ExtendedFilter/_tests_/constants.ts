import {
  initialExtendedFilterFormValues,
  searchQueriesDict,
  taskAssignedDict,
  taskOverdueDict,
  taskStatusExtendedFilterDict,
} from '../constants'
import { ExtendedFilterProps } from '../index'

export const taskStatusExtendedFilterDictValues = Object.values(
  taskStatusExtendedFilterDict,
)
export const taskOverdueDictValues = Object.values(taskOverdueDict)
export const taskAssignedDictValues = Object.values(taskAssignedDict)
export const searchQueriesDictValues = Object.values(searchQueriesDict)

export const requiredProps: ExtendedFilterProps = {
  formValues: initialExtendedFilterFormValues,
  initialFormValues: initialExtendedFilterFormValues,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
}
