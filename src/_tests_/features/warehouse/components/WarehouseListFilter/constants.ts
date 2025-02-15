import { WarehousesFilterProps } from 'features/warehouses/components/WarehousesFilter/types'

export const props: Readonly<WarehousesFilterProps> = {
  visible: true,
  formValues: {},
  onApply: jest.fn(),
  onClose: jest.fn(),
}

export enum TestIdsEnum {
  WarehousesFilter = 'warehouse-list-filter',
  TitleFilter = 'title-filter',
  LegalEntityFilter = 'legal-entity-filter',
  LegalEntitySelect = 'legal-entity-select',
  AddressFilter = 'address-filter',
  ParentFilter = 'parent-filter',
  ParentSelect = 'parent-select',
}
