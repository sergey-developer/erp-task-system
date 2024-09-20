import { props } from '_tests_/features/tasks/UpdateTasksButton/constants'
import { updateTasksButtonTestUtils } from '_tests_/features/tasks/UpdateTasksButton/testUtils'
import { menuTestUtils, render } from '_tests_/utils'

import UpdateTasksButton from './index'

describe('Кнопка обновления заявок', () => {
  test('Отображается', () => {
    render(<UpdateTasksButton {...props} />)

    const updateTasksButton = updateTasksButtonTestUtils.getUpdateTasksButton()
    const downButton = updateTasksButtonTestUtils.getDownButton()

    expect(updateTasksButton).toBeInTheDocument()
    expect(updateTasksButton).toBeEnabled()
    expect(downButton).toBeInTheDocument()
    expect(downButton).toBeEnabled()
  })

  test('При клике вызывается обработчик', async () => {
    const { user } = render(<UpdateTasksButton {...props} />)
    await updateTasksButtonTestUtils.clickUpdateTasksButton(user)
    expect(props.onClick).toBeCalledTimes(1)
  })

  describe('Автообновление', () => {
    test('Отображается', async () => {
      const { user } = render(<UpdateTasksButton {...props} />)

      await updateTasksButtonTestUtils.openDropdown(user)
      const item = updateTasksButtonTestUtils.getAutoUpdateItem()

      expect(item).toBeInTheDocument()
      menuTestUtils.expectMenuItemNotDisabled(item)
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<UpdateTasksButton {...props} />)

      await updateTasksButtonTestUtils.openDropdown(user)
      await updateTasksButtonTestUtils.clickAutoUpdateItem(user)

      expect(props.onAutoUpdate).toBeCalledTimes(1)
    })
  })
})
