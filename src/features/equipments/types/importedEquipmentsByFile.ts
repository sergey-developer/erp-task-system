import { ImportedEquipmentByFileDTO } from '../api/dto'

export type ImportedEquipmentByFile = ImportedEquipmentByFileDTO & {
  rowId: number
}

export type ImportedEquipmentsByFile = ImportedEquipmentByFile[]
