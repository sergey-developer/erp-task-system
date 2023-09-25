import { TaskStatusEnum } from 'modules/task/constants/task'

import taskFixtures from '_tests_/fixtures/task'

import { statusSorter } from './sorters'

describe('sorters', () => {
  test('status sorter', () => {
    const array = [
      taskFixtures.taskTableItem({ status: TaskStatusEnum.New }),
      taskFixtures.taskTableItem({ status: TaskStatusEnum.Completed }),
      taskFixtures.taskTableItem({ status: TaskStatusEnum.InProgress }),
      taskFixtures.taskTableItem({ status: TaskStatusEnum.Awaiting }),
      taskFixtures.taskTableItem({ status: TaskStatusEnum.Closed }),
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
