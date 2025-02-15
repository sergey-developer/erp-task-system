import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'

export const checkLocationTypeIsWarehouse = (type: LocationTypeEnum): boolean =>
  type === LocationTypeEnum.Warehouse
