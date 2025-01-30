import { RelocationEquipmentTableProps } from 'features/warehouse/components/RelocationEquipmentTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const relocationEquipmentListItem = warehouseFixtures.relocationEquipmentListItem()

export const props: Readonly<RelocationEquipmentTableProps> = {
  dataSource: [relocationEquipmentListItem],
  loading: false,
  onClickImages: jest.fn(),
}

export enum TestIdsEnum {
  RelocationEquipmentTable = 'relocation-equipment-table',
}
