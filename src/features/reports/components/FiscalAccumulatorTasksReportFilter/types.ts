import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'
import { MacroregionsCatalogDTO } from 'shared/catalogs/macroregions/api/dto'
import { SupportGroupsDTO } from 'shared/supportGroups/api/dto'
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

  customers: CustomersCatalogDTO
  customersIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregions: MacroregionsCatalogDTO
  macroregionsIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroups: SupportGroupsDTO
  supportGroupsIsLoading: boolean

  onSubmit: (values: FiscalAccumulatorTasksReportFilterFormFields) => void
}
