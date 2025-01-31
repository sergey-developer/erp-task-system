import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { CustomerListModel } from 'features/warehouse/models'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { LocationsCatalogModel } from 'shared/catalogs/api/dto/locations'
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
