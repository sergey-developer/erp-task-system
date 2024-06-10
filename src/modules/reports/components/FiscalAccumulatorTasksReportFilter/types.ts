import { SupportGroupListModel } from 'modules/supportGroup/models'
import { CustomerListModel } from 'modules/warehouse/models'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { MacroregionsModel } from 'shared/models/macroregion'
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

  customers: CustomerListModel
  customersIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregions: MacroregionsModel
  macroregionsIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroups: SupportGroupListModel
  supportGroupsIsLoading: boolean

  onSubmit: (values: FiscalAccumulatorTasksReportFilterFormFields) => void
}
