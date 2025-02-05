import { NomenclatureGroupModel } from './nomenclatureGroup.model'

export type NomenclatureGroupListItemModel = Pick<NomenclatureGroupModel, 'id' | 'title'>

export type NomenclatureGroupsModel = NomenclatureGroupListItemModel[]
