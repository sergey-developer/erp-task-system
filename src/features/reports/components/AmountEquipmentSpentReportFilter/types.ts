import { EquipmentCategoriesDTO } from 'features/warehouse/models'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { IdType } from 'shared/types/common'

export type AmountEquipmentSpentReportFilterFormFields = Partial<{
  categories: IdType[]
}>

export type AmountEquipmentSpentReportFilterProps = Pick<DrawerFilterProps, 'open' | 'onClose'> & {
  values?: AmountEquipmentSpentReportFilterFormFields
  initialValues: AmountEquipmentSpentReportFilterFormFields

  categories: EquipmentCategoriesDTO
  categoriesIsLoading: boolean

  onApply: (values: AmountEquipmentSpentReportFilterFormFields) => void
}
