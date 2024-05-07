import { EquipmentCategoryModel } from 'modules/warehouse/models'

export type EquipmentCategoryListItemModel = Pick<EquipmentCategoryModel, 'id' | 'title' | 'code'>
export type EquipmentCategoriesModel = EquipmentCategoryListItemModel[]
