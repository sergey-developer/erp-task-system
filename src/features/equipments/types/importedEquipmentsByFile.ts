import { ImportedEquipmentByFileDTO } from 'features/warehouse/models'

export type ImportedEquipmentByFile = ImportedEquipmentByFileDTO & {
  rowId: number
}

export type ImportedEquipmentsByFile = ImportedEquipmentByFile[]
