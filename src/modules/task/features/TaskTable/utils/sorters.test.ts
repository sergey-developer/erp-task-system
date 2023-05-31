import { TaskStatusEnum } from 'modules/task/constants/common'

import taskFixtures from 'fixtures/task'

import { statusSorter } from './sorters'

describe('sorters', () => {
  test('status sorter', () => {
    const array = [
      taskFixtures.fakeTaskTableItem({ status: TaskStatusEnum.New }),
      taskFixtures.fakeTaskTableItem({ status: TaskStatusEnum.Completed }),
      taskFixtures.fakeTaskTableItem({ status: TaskStatusEnum.InProgress }),
      taskFixtures.fakeTaskTableItem({ status: TaskStatusEnum.Awaiting }),
      taskFixtures.fakeTaskTableItem({ status: TaskStatusEnum.Closed }),
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
