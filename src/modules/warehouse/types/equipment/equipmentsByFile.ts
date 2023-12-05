import { EquipmentByFileModel } from 'modules/warehouse/models'

// todo: перенести в типы таблицы модалки
export type EquipmentByFile = EquipmentByFileModel & {
  rowId: number
}

export type EquipmentsByFile = EquipmentByFile[]
