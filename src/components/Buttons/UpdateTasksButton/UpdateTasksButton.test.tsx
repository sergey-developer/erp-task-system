import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, menuTestUtils, render } from '_tests_/utils'

import UpdateTasksButton, { UpdateTasksButtonProps } from './index'

const props: UpdateTasksButtonProps = {
  disabled: false,
  onClick: jest.fn(),
  onAutoUpdate: jest.fn(),
}

const getUpdateTasksButton = (container?: HTMLElement) =>
  container
    ? buttonTestUtils.getButtonIn(container, /Обновить заявки/)
    : screen.getByRole('button', { name: /Обновить заявки/ })

const clickUpdateTasksButton = async (user: UserEvent, container?: HTMLElement) => {
  const button = getUpdateTasksButton(container)
  await user.click(button)
}

const getDownButton = (container?: HTMLElement) =>
  container
    ? buttonTestUtils.getButtonIn(container, 'down')
    : screen.getByRole('button', { name: 'down' })

const clickDownButton = async (user: UserEvent, container?: HTMLElement) => {
  const button = getDownButton(container)
  await user.click(button)
}

const getAutoUpdateItem = () => menuTestUtils.getMenuItem('Автообновление')
const clickAutoUpdateItem = async (user: UserEvent) => {
  const item = getAutoUpdateItem()
  await user.click(item)
}

export const testUtils = {
  getUpdateTasksButton,
  clickUpdateTasksButton,

  getDownButton,
  clickDownButton,

  getAutoUpdateItem,
  clickAutoUpdateItem,
}

describe('Кнопка обновления заявок', () => {
  test('Отображается', () => {
    render(<UpdateTasksButton {...props} />)

    const updateTasksButton = testUtils.getUpdateTasksButton()
    const downButton = testUtils.getDownButton()

    expect(updateTasksButton).toBeInTheDocument()
    expect(updateTasksButton).toBeEnabled()
    expect(downButton).toBeInTheDocument()
    expect(downButton).toBeEnabled()
  })

  test('При клике вызывается обработчик', async () => {
    const { user } = render(<UpdateTasksButton {...props} />)
    await testUtils.clickUpdateTasksButton(user)
    expect(props.onClick).toBeCalledTimes(1)
  })

  describe('Автообновление', () => {
    test('Отображается', async () => {
      const { user } = render(<UpdateTasksButton {...props} />)

      await testUtils.clickDownButton(user)
      const item = testUtils.getAutoUpdateItem()

      expect(item).toBeInTheDocument()
      menuTestUtils.expectMenuItemNotDisabled(item)
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<UpdateTasksButton {...props} />)

      await testUtils.clickDownButton(user)
      await testUtils.clickAutoUpdateItem(user)

      expect(props.onAutoUpdate).toBeCalledTimes(1)
    })
  })
})
