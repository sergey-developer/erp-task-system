import { WarehouseListFilterProps } from 'modules/warehouse/components/WarehouseListFilter/types'

export const props: Readonly<WarehouseListFilterProps> = {
  visible: true,
  formValues: {},
  onApply: jest.fn(),
  onClose: jest.fn(),
}

export enum TestIdsEnum {
  WarehouseListFilter = 'warehouse-list-filter',
  TitleFilter = 'title-filter',
  LegalEntityFilter = 'legal-entity-filter',
  LegalEntitySelect = 'legal-entity-select',
  AddressFilter = 'address-filter',
  ParentFilter = 'parent-filter',
  ParentSelect = 'parent-select',
}
