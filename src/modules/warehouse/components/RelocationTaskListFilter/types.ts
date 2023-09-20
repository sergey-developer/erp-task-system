import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'

export type RelocationTaskListFilterFormFields = Partial<{
  status: RelocationTaskStatusEnum[]
}>

export type RelocationTaskListFilterProps = {
  visible: boolean

  values?: RelocationTaskListFilterFormFields
  initialValues: RelocationTaskListFilterFormFields

  onApply: (values: RelocationTaskListFilterFormFields) => void
  onClose: () => void
}
