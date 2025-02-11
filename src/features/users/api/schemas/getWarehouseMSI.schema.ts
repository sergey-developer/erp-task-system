import { UserRequestArgs } from 'features/users/api/types'
import { WarehouseModel } from 'features/warehouse/models'

export type GetWarehouseMSIQueryArgs = UserRequestArgs
export type GetWarehouseMSISuccessResponse = Pick<WarehouseModel, 'id' | 'title'>
