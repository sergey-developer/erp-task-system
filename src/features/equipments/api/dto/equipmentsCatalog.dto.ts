import { EquipmentDetailDTO } from './equipment.dto'

export type EquipmentsCatalogItemDTO = Pick<
  EquipmentDetailDTO,
  'id' | 'title' | 'serialNumber' | 'inventoryNumber'
>

export type EquipmentsCatalogDTO = EquipmentsCatalogItemDTO[]
