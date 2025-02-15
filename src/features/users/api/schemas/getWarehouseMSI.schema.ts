import { RequestWithUser } from 'features/users/api/types'
import { WarehouseDetailDTO } from 'features/warehouses/api/dto'

export type GetWarehouseMSIRequest = RequestWithUser
export type GetWarehouseMSIResponse = Pick<WarehouseDetailDTO, 'id' | 'title'>
