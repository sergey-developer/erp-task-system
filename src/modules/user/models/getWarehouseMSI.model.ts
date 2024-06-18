import { UserRequestArgs } from 'modules/user/types'
import { WarehouseModel } from 'modules/warehouse/models'

export type GetWarehouseMSIQueryArgs = UserRequestArgs
export type GetWarehouseMSISuccessResponse = Pick<WarehouseModel, 'id' | 'title'>
