import { RelocationTasksProps } from 'features/tasks/components/RelocationTasks/types'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const relocationTaskListItem = warehousesFixtures.relocationTaskListItem()

export const props: RelocationTasksProps = {
  data: [relocationTaskListItem],
  onClick: jest.fn(),
  onCreateAttachment: jest.fn(),
}

export enum TestIdsEnum {
  RelocationTasks = 'relocation-tasks',
}
