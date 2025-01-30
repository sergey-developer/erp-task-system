import { RelocationTasksProps } from 'features/task/components/RelocationTasks/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()

export const props: RelocationTasksProps = {
  data: [relocationTaskListItem],
  onClick: jest.fn(),
  onCreateAttachment: jest.fn(),
}

export enum TestIdsEnum {
  RelocationTasks = 'relocation-tasks',
}
