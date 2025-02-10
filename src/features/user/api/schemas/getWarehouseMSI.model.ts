import { UserRequestArgs } from 'features/user/types'
import { WarehouseModel } from 'features/warehouse/models'

export type GetWarehouseMSIQueryArgs = UserRequestArgs
export type GetWarehouseMSISuccessResponse = Pick<WarehouseModel, 'id' | 'title'>
