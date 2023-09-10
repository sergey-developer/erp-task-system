import { NomenclatureModel } from './nomenclature.model'

export type NomenclatureListItemModel = Pick<
  NomenclatureModel,
  'id' | 'title' | 'vendorCode'
>

export type NomenclatureListModel = Array<NomenclatureListItemModel>
