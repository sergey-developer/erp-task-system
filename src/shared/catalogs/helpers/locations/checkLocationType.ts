import { LocationTypeEnum } from 'shared/catalogs/constants'

export const checkLocationTypeIsWarehouse = (type: LocationTypeEnum): boolean =>
  type === LocationTypeEnum.Warehouse
