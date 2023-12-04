import { FileToSend } from 'shared/types/file'

import { EquipmentsByFileTemplateModel } from './equipmentsByFileTemplate.model'

export type CreateEquipmentsByFileTemplateMutationArgs = { file: FileToSend }
export type CreateEquipmentsByFileTemplateSuccessResponse = EquipmentsByFileTemplateModel
