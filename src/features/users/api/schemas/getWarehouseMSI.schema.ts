import { RequestWithUser } from 'features/users/api/types'
import { WarehouseModel } from 'features/warehouse/models'

export type GetWarehouseMSIRequest = RequestWithUser
export type GetWarehouseMSIResponse = Pick<WarehouseModel, 'id' | 'title'>
