import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils, render } from '_tests_/utils'

import CancelRelocationTaskModal, { CancelRelocationTaskModalProps } from './index'

const props: CancelRelocationTaskModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
}

const getContainer = () => screen.getByTestId('cancel-relocation-task-modal')
const findContainer = () => screen.findByTestId('cancel-relocation-task-modal')

// confirm button
const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), /Отменить заявку/)
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
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
    render(<CancelRelocationTaskModal {...props} />)

    const container = getContainer()
    const title = within(container).getByText('Отмена заявки')
    const description = within(container).getByText('Вы уверены, что хотите отменить заявку?')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается корректно', () => {
      render(<CancelRelocationTaskModal {...props} />)

      const button = testUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<CancelRelocationTaskModal {...props} />)
      await testUtils.clickConfirmButton(user)
      expect(props.onConfirm).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<CancelRelocationTaskModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<CancelRelocationTaskModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
