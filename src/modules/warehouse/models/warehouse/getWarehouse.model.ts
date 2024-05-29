import { WarehouseModel } from './warehouse.model'

// todo: создать WarehouseRequestArgs и исп-ть
export type GetWarehouseQueryArgs = WarehouseModel['id']
export type GetWarehouseSuccessResponse = WarehouseModel
