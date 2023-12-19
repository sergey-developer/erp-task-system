import { SupportGroupListModel } from 'modules/supportGroup/models'
import { CustomerListModel } from 'modules/warehouse/models'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { MacroregionListModel } from 'shared/models/macroregion'
import { IdType } from 'shared/types/common'

export type FiscalAccumulatorTasksFilterFormFields = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type FiscalAccumulatorTasksFilterProps = Required<
  Pick<DrawerFilterProps, 'open' | 'onClose'>
> & {
  values: FiscalAccumulatorTasksFilterFormFields
  initialValues: FiscalAccumulatorTasksFilterFormFields

  customers: CustomerListModel
  customersIsLoading: boolean
  onChangeCustomers: (value: IdType[]) => void

  macroregions: MacroregionListModel
  macroregionsIsLoading: boolean
  onChangeMacroregions: (value: IdType[]) => void

  supportGroups: SupportGroupListModel
  supportGroupsIsLoading: boolean

  onSubmit: (values: FiscalAccumulatorTasksFilterFormFields) => void
}
