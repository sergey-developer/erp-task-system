import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { CustomersModel } from 'features/warehouses/api/dto'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
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

  locations: LocationsCatalogDTO
  locationsIsLoading: boolean

  owners: CustomersModel
  ownersIsLoading: boolean

  onApply: (values: HistoryNomenclatureOperationsReportFilterFormFields) => void
}
