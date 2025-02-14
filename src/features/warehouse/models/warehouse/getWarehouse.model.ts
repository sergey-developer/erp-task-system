import { WarehouseModel } from './warehouse.model'

// todo: создать WarehouseRequestArgs и исп-ть
export type GetWarehouseRequest = WarehouseModel['id']
export type GetWarehouseResponse = WarehouseModel
