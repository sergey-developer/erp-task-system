import { LocationTypeEnum } from 'shared/catalogs/locations/constants'

export const checkLocationTypeIsWarehouse = (type: LocationTypeEnum): boolean =>
  type === LocationTypeEnum.Warehouse
