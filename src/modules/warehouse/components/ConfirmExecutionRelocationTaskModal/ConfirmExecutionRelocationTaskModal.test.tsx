import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { buttonTestUtils, render } from '_tests_/utils'

import ConfirmExecutionRelocationTaskModal, { ConfirmExecutionRelocationTaskModalProps } from './index'

const props: ConfirmExecutionRelocationTaskModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
}

const getContainer = () => screen.getByTestId('confirm-execution-relocation-task-modal')
const findContainer = () => screen.findByTestId('confirm-execution-relocation-task-modal')

// confirm button
const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), /Подтвердить выполнение/)
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Отменить')
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  findContainer,

  getConfirmButton,
  clickConfirmButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted: () => buttonTestUtils.expectLoadingStarted(getConfirmButton()),
  expectLoadingFinished: () => buttonTestUtils.expectLoadingFinished(getConfirmButton()),
}

describe('Модалка отмены заявки на перемещение', () => {
  test('Модалка отображается корректно', () => {
    render(<ConfirmExecutionRelocationTaskModal {...props} />)

    const container = getContainer()
    const title = within(container).getByText('Подтверждение выполнения')
    const description = within(container).getByText('Вы уверены, что хотите подтвердить выполнение заявки?')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается корректно', () => {
      render(<ConfirmExecutionRelocationTaskModal {...props} />)

      const button = testUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecutionRelocationTaskModal {...props} />)
      await testUtils.clickConfirmButton(user)
      expect(props.onConfirm).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ConfirmExecutionRelocationTaskModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecutionRelocationTaskModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
