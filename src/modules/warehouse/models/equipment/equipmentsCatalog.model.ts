import { EquipmentModel } from 'modules/warehouse/models'

export type EquipmentCatalogListItemModel = Pick<
  EquipmentModel,
  'id' | 'title' | 'serialNumber' | 'inventoryNumber'
>

export type EquipmentsCatalogModel = EquipmentCatalogListItemModel[]
