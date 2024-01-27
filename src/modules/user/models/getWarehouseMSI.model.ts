import { BaseUserRequestArgs } from 'modules/user/types'
import { WarehouseModel } from 'modules/warehouse/models'

export type GetWarehouseMSIQueryArgs = BaseUserRequestArgs & Partial<{ id: number }>
export type GetWarehouseMSISuccessResponse = Pick<WarehouseModel, 'id' | 'title'>
