import { MeasurementUnitModel, NomenclatureGroupModel } from 'modules/warehouse/models'

import { CountryModel } from 'shared/models/country'
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
