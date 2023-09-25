import { CreateEquipmentMutationArgs, EquipmentListItemModel } from 'modules/warehouse/models'
import { BaseEquipmentRequestArgs } from 'modules/warehouse/types'

export type UpdateEquipmentMutationArgs = BaseEquipmentRequestArgs & CreateEquipmentMutationArgs

export type UpdateEquipmentSuccessResponse = EquipmentListItemModel

export type UpdateEquipmentBadRequestErrorResponse = Partial<UpdateEquipmentMutationArgs>
