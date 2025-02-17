import { within } from '@testing-library/react'

import { props } from '_tests_/features/tasks/components/CreateTaskModal/constants'
import { createTaskModalTestUtils } from '_tests_/features/tasks/components/CreateTaskModal/testUtils'
import userFixtures from '_tests_/fixtures/api/data/users'
import { render } from '_tests_/helpers'

import CreateTaskModal from './index'

describe('Модалка создания задачи заявки', () => {
  test('Заголовок отображается', () => {
    render(<CreateTaskModal {...props} />)
    const container = createTaskModalTestUtils.getContainer()
    const title = within(container).getByText('Создание заявки')
    expect(title).toBeInTheDocument()
  })

  describe('Соисполнители', () => {
    test('Можно установить несколько значений', async () => {
      const userListItem1 = userFixtures.user()
      const userListItem2 = userFixtures.user()
      const userListItem3 = userFixtures.user()

      const { user } = render(
        <CreateTaskModal {...props} users={[userListItem1, userListItem2, userListItem3]} />,
      )

      await createTaskModalTestUtils.setAssignee(user, userListItem1.fullName)
      await createTaskModalTestUtils.setCoExecutor(user, userListItem2.fullName)
      await createTaskModalTestUtils.setCoExecutor(user, userListItem3.fullName)

      expect(
        createTaskModalTestUtils.getSelectedCoExecutor(userListItem2.fullName),
      ).toBeInTheDocument()

      expect(
        createTaskModalTestUtils.getSelectedCoExecutor(userListItem3.fullName),
      ).toBeInTheDocument()
    })
  })

  describe('Наблюдатели', () => {
    test('Можно установить несколько значений', async () => {
      const userListItem1 = userFixtures.user()
      const userListItem2 = userFixtures.user()
      const userListItem3 = userFixtures.user()

      const { user } = render(
        <CreateTaskModal {...props} users={[userListItem1, userListItem2, userListItem3]} />,
      )

      await createTaskModalTestUtils.setObserver(user, userListItem2.fullName)
      await createTaskModalTestUtils.setObserver(user, userListItem3.fullName)

      expect(
        createTaskModalTestUtils.getSelectedObserver(userListItem2.fullName),
      ).toBeInTheDocument()

      expect(
        createTaskModalTestUtils.getSelectedObserver(userListItem3.fullName),
      ).toBeInTheDocument()
    })
  })
})
