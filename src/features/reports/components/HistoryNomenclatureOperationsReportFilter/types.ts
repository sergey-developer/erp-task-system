import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

import { CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'
import { LocationsCatalogDTO } from 'shared/catalogs/locations/api/dto'
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

  owners: CustomersCatalogDTO
  ownersIsLoading: boolean

  onApply: (values: HistoryNomenclatureOperationsReportFilterFormFields) => void
}
