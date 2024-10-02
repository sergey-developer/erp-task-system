import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { CustomerListModel } from 'modules/warehouse/models'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { IdType } from 'shared/types/common'

export type HistoryNomenclatureOperationsReportFilterFormFields = Partial<{
  conditions: EquipmentConditionEnum[]
  locations: IdType[]
  owners: IdType[]
}>

export type HistoryNomenclatureOperationsReportFilterProps = Pick<
  DrawerFilterProps,
  'open' | 'onClose'
> & {
  values?: HistoryNomenclatureOperationsReportFilterFormFields
  initialValues: HistoryNomenclatureOperationsReportFilterFormFields

  locations: LocationsCatalogModel
  locationsIsLoading: boolean

  owners: CustomerListModel
  ownersIsLoading: boolean

  onApply: (values: HistoryNomenclatureOperationsReportFilterFormFields) => void
}
