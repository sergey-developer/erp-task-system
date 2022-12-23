import taskFixtures from 'fixtures/task'
import { TaskStatusEnum } from 'modules/task/constants/common'

import { statusSorter } from './sorters'

describe('sorters', () => {
  test('status sorter', () => {
    const array = [
      taskFixtures.getTaskTableItem({ status: TaskStatusEnum.New }),
      taskFixtures.getTaskTableItem({ status: TaskStatusEnum.Completed }),
      taskFixtures.getTaskTableItem({ status: TaskStatusEnum.InProgress }),
      taskFixtures.getTaskTableItem({ status: TaskStatusEnum.Awaiting }),
      taskFixtures.getTaskTableItem({ status: TaskStatusEnum.Closed }),
    ]

    const sortedArray = [...array].sort(statusSorter)

    expect(array).not.toStrictEqual(sortedArray)
    expect(sortedArray[0].status).toBe(TaskStatusEnum.Awaiting)
    expect(sortedArray[1].status).toBe(TaskStatusEnum.InProgress)
    expect(sortedArray[2].status).toBe(TaskStatusEnum.Completed)
    expect(sortedArray[3].status).toBe(TaskStatusEnum.Closed)
    expect(sortedArray[4].status).toBe(TaskStatusEnum.New)
  })
})
