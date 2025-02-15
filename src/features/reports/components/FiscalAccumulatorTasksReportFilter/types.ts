import { CustomersModel } from 'features/warehouses/api/dto'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { MacroregionsCatalogDTO } from 'shared/catalogs/api/dto/macroregions'
import { SupportGroupListModel } from 'shared/supportGroups/api/dto'
import { IdType } from 'shared/types/common'

export type FiscalAccumulatorTasksReportFilterFormFields = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type FiscalAccumulatorTasksReportFilterProps = Required<
  Pick<DrawerFilterProps, 'open' | 'onClose'>
> & {
  values: FiscalAccumulatorTasksReportFilterFormFields
  initialValues: FiscalAccumulatorTasksReportFilterFormFields

  customers: CustomersModel
  customersIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregions: MacroregionsCatalogDTO
  macroregionsIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroups: SupportGroupListModel
  supportGroupsIsLoading: boolean

  onSubmit: (values: FiscalAccumulatorTasksReportFilterFormFields) => void
}
