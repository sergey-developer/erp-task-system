import { CountryCatalogItemDTO } from 'shared/catalogs/countries/api/dto'
import { MeasurementUnitsCatalogItemDTO } from 'shared/catalogs/measurementUnits/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { NomenclaturesGroupDTO } from './nomenclaturesGroups.model'

export type NomenclatureDetailDTO = {
  id: IdType
  title: string
  shortTitle: string
  vendorCode: string
  equipmentHasSerialNumber: boolean
  group: NomenclaturesGroupDTO
  measurementUnit: MeasurementUnitsCatalogItemDTO
  country: MaybeNull<CountryCatalogItemDTO>
}
