export type WarehouseListFilterFormFields = Partial<{
  title: string
  address: string
  legalEntity: number
  parent: number
}>

export type WarehouseListFilterProps = {
  visible: boolean
  formValues: WarehouseListFilterFormFields
  onApply: (values: WarehouseListFilterFormFields) => void
  onClose: () => void
}
