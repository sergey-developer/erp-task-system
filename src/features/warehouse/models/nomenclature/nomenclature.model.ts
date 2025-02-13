import { MeasurementUnitsCatalogItemDTO, NomenclatureGroupModel } from 'features/warehouse/models'

import { CountryModel } from 'shared/catalogs/api/dto/countries'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type NomenclatureModel = {
  id: IdType
  title: string
  shortTitle: string
  vendorCode: string
  equipmentHasSerialNumber: boolean
  group: NomenclatureGroupModel
  measurementUnit: MeasurementUnitsCatalogItemDTO
  country: MaybeNull<CountryModel>
}
