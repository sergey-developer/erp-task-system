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
  equipmentHasSerialNumber: boolean
  group: NomenclatureGroupModel
  measurementUnit: MeasurementUnitModel
  country: MaybeNull<CountryModel>
}
