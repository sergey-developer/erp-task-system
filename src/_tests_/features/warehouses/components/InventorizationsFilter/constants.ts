import { InventorizationsFilterProps } from 'features/inventorizations/components/InventorizationsFilter/types'

export const props: Readonly<InventorizationsFilterProps> = {
  open: true,

  values: {},
  initialValues: {},

  onClose: jest.fn(),
  onApply: jest.fn(),
}

export enum TestIdsEnum {
  InventorizationsFilter = 'inventorizations-filter',
  StatusBlock = 'status-block',
  TypeBlock = 'type-block',
}
