import { LocationTypeEnum } from 'shared/constants/catalogs'

export const checkLocationTypeIsWarehouse = (type: LocationTypeEnum): boolean =>
  type === LocationTypeEnum.Warehouse
