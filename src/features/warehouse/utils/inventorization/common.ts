import { InventorizationDetailDTO } from 'features/warehouse/models'

export const mapInventorizationWarehousesTitles = (
  warehouses: InventorizationDetailDTO['warehouses'],
): string => warehouses.map((w) => w.title).join(', ')
