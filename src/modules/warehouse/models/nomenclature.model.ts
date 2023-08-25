import {
  CountryModel,
  MeasurementUnitModel,
  NomenclatureGroupModel,
} from 'modules/warehouse/models'

import { MaybeNull } from 'shared/types/utils'

export type NomenclatureModel = {
  id: number
  title: string
  shortTitle: string
  vendorCode: string
  group: NomenclatureGroupModel
  measurementUnit: MeasurementUnitModel
  equipmentHasSerialNumber: boolean
  country: MaybeNull<CountryModel>
}
