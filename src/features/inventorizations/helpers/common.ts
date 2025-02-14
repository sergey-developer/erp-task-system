import { InventorizationDetailDTO } from '../api/dto'

export const mapInventorizationWarehousesTitles = (
  warehouses: InventorizationDetailDTO['warehouses'],
): string => warehouses.map((w) => w.title).join(', ')
