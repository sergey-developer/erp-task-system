import { FileToSend } from 'shared/types/file'

import { ImportedEquipmentsByFileModel } from './importedEquipmentsByFile.model'

export type ImportEquipmentsByFileMutationArgs = { file: FileToSend }
export type ImportEquipmentsByFileSuccessResponse = ImportedEquipmentsByFileModel
