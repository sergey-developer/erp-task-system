import { FileToSend } from 'shared/types/file'

import { EquipmentsByFileModel } from './equipmentsByFile.model'

export type CreateEquipmentsByFileMutationArgs = { file: FileToSend }
export type CreateEquipmentsByFileSuccessResponse = EquipmentsByFileModel
