import { MeasurementUnitModel, NomenclatureGroupModel } from 'features/warehouse/models'

import { CountryModel } from 'shared/catalogs/models/countries'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type NomenclatureModel = {
  id: IdType
  title: string
  shortTitle: string
  vendorCode: string
  equipmentHasSerialNumber: boolean
  group: NomenclatureGroupModel
  measurementUnit: MeasurementUnitModel
  country: MaybeNull<CountryModel>
}
