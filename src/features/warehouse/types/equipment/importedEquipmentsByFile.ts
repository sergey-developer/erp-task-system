import { ImportedEquipmentByFileModel } from 'features/warehouse/models'

export type ImportedEquipmentByFile = ImportedEquipmentByFileModel & {
  rowId: number
}

export type ImportedEquipmentsByFile = ImportedEquipmentByFile[]
