import { WarehouseDetailDTO } from './warehouseDetail.dto'

export type WarehouseDTO = Pick<
  WarehouseDetailDTO,
  'id' | 'title' | 'parent' | 'legalEntity' | 'address'
>

export type WarehousesDTO = WarehouseDTO[]
