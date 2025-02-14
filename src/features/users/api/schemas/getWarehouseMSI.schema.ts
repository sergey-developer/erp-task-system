import { UserRequestArgs } from 'features/users/api/types'
import { WarehouseModel } from 'features/warehouse/models'

export type GetWarehouseMSIRequest = UserRequestArgs
export type GetWarehouseMSIResponse = Pick<WarehouseModel, 'id' | 'title'>
