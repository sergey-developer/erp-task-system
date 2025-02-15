import { EmptyFn } from 'shared/types/utils'

export type WarehousesFilterFormFields = Partial<{
  title: string
  address: string
  legalEntity: number
  parent: number
}>

export type WarehousesFilterProps = {
  visible: boolean
  onApply: (values: WarehousesFilterFormFields) => void
  onClose: EmptyFn
  formValues?: WarehousesFilterFormFields
}
