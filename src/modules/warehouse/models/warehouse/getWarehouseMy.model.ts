import { WarehouseModel } from './warehouse.model'

export type GetWarehouseMyQueryArgs = void
export type GetWarehouseMySuccessResponse = Pick<WarehouseModel, 'id' | 'title'>
