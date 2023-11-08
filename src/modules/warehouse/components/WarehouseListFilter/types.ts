import { EmptyFn } from 'shared/types/utils'

export type WarehouseListFilterFormFields = Partial<{
  title: string
  address: string
  legalEntity: number
  parent: number
}>

export type WarehouseListFilterProps = {
  visible: boolean
  onApply: (values: WarehouseListFilterFormFields) => void
  onClose: EmptyFn
  formValues?: WarehouseListFilterFormFields
}
