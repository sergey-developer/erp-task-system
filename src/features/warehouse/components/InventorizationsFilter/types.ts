import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/warehouse/constants/inventorization'

import { DrawerFilterProps } from 'components/Filters/DrawerFilter'

export type InventorizationsFilterFormFields = Partial<{
  types: InventorizationTypeEnum[]
  statuses: InventorizationStatusEnum[]
}>

export type InventorizationsFilterProps = Pick<DrawerFilterProps, 'open' | 'onClose'> & {
  values?: InventorizationsFilterFormFields
  initialValues: InventorizationsFilterFormFields

  onApply: (values: InventorizationsFilterFormFields) => void
}
