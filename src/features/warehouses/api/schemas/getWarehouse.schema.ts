import { IdType } from 'shared/types/common'

import { WarehouseDetailDTO } from '../dto'

// todo: создать WarehouseRequestArgs и исп-ть
export type GetWarehouseRequest = IdType
export type GetWarehouseResponse = WarehouseDetailDTO
