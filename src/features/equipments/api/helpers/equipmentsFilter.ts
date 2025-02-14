import { EquipmentsFilterFormFields } from 'features/equipments/components/EquipmentFilter/types'

import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { isFalse, isTrue } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { GetEquipmentNomenclaturesRequest } from '../schemas'
import { EquipmentsFilterRequestParams } from '../types'

export const equipmentsFilterToRequestParams = ({
  createdAt,
  zeroQuantity,
  ...values
}: EquipmentsFilterFormFields): EquipmentsFilterRequestParams &
  Pick<GetEquipmentNomenclaturesRequest, 'locationTypes'> => ({
  ...values,
  createdAtFrom: createdAt?.[0] ? formatDate(createdAt[0], DATE_FILTER_FORMAT) : undefined,
  createdAtTo: createdAt?.[1] ? formatDate(createdAt[1], DATE_FILTER_FORMAT) : undefined,
  quantityGt: isTrue(zeroQuantity) ? undefined : isFalse(zeroQuantity) ? 0 : undefined,
  locationTypes: values.locations?.length
    ? undefined
    : [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter],
})
