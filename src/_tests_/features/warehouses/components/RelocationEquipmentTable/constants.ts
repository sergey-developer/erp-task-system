import { RelocationEquipmentTableProps } from 'features/relocationEquipments/components/RelocationEquipmentTable/types'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const relocationEquipmentListItem = warehousesFixtures.relocationEquipmentListItem()

export const props: Readonly<RelocationEquipmentTableProps> = {
  dataSource: [relocationEquipmentListItem],
  loading: false,
  onClickImages: jest.fn(),
}

export enum TestIdsEnum {
  RelocationEquipmentTable = 'relocation-equipment-table',
}
