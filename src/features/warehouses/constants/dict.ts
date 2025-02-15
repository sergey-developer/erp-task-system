import { WarehouseTypeEnum } from '../api/constants'

export const warehouseTypeDict: Record<WarehouseTypeEnum, string> = {
  [WarehouseTypeEnum.Main]: 'Основной склад',
  [WarehouseTypeEnum.Msi]: 'Склад МСИ',
  [WarehouseTypeEnum.Repair]: 'Склад ремонта',
}
