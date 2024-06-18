import { EquipmentsFilterFormFields } from 'modules/warehouse/components/EquipmentFilter/types'
import { GetEquipmentNomenclaturesQueryArgs } from 'modules/warehouse/models'
import { EquipmentsFilterParams } from 'modules/warehouse/types'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { isFalse, isTrue } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

export const equipmentsFilterToParams = ({
  createdAt,
  zeroQuantity,
  ...values
}: EquipmentsFilterFormFields): EquipmentsFilterParams &
  Pick<GetEquipmentNomenclaturesQueryArgs, 'locationTypes'> => ({
  ...values,
  createdAtFrom: createdAt?.[0] ? formatDate(createdAt[0], DATE_FILTER_FORMAT) : undefined,
  createdAtTo: createdAt?.[1] ? formatDate(createdAt[1], DATE_FILTER_FORMAT) : undefined,
  quantityGt: isTrue(zeroQuantity) ? undefined : isFalse(zeroQuantity) ? 0 : undefined,
  locationTypes: values.locations?.length
    ? undefined
    : [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter],
})
