import { InventorizationModel } from 'modules/warehouse/models'

export const mapInventorizationWarehousesTitles = (
  warehouses: InventorizationModel['warehouses'],
): string => warehouses.map((w) => w.title).join(', ')
