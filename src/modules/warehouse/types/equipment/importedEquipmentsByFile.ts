import { ImportedEquipmentByFileModel } from 'modules/warehouse/models'

export type ImportedEquipmentByFile = ImportedEquipmentByFileModel & {
  rowId: number
}

export type ImportedEquipmentsByFile = ImportedEquipmentByFile[]
