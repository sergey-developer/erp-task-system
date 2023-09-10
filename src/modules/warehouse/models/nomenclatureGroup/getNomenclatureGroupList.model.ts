import { NomenclatureGroupListModel } from './nomenclatureGroupList.model'

export type GetNomenclatureGroupListQueryArgs = Partial<{
  search: string
}>

export type GetNomenclatureGroupListSuccessResponse = NomenclatureGroupListModel
