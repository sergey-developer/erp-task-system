import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT, CONFIRM_TEXT } from 'shared/constants/common'

import { buttonTestUtils, fakeIdStr, render } from '_tests_/utils'

import ConfirmExecuteTaskModal, { ConfirmExecuteTaskModalProps } from './index'

const props: Readonly<ConfirmExecuteTaskModalProps> = {
  open: true,
  recordId: fakeIdStr(),
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
}

const getContainer = () => screen.getByTestId('confirm-execute-task-modal')
const findContainer = () => screen.findByTestId('confirm-execute-task-modal')

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// submit button
const getConfirmButton = () => buttonTestUtils.getButtonIn(getContainer(), CONFIRM_TEXT)
const clickConfirmButton = async (user: UserEvent) => {
  const button = getConfirmButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  findContainer,

  getCancelButton,
  clickCancelButton,

  getConfirmButton,
  clickConfirmButton,
}

describe('Модалка подтверждения выполнения заявки', () => {
  test('Заголовок и текст отображается', () => {
    render(<ConfirmExecuteTaskModal {...props} />)

    const container = testUtils.getContainer()
    const text =
      'По заявке отсутствуют перемещения. Вы уверены, что хотите перейти к её выполнению?'

    expect(within(container).getByText('Решение по заявке')).toBeInTheDocument()
    expect(within(container).getByText(props.recordId)).toBeInTheDocument()
    expect(within(container).getByText(text)).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskModal {...props} />)

      const button = testUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskModal {...props} />)
      await testUtils.clickConfirmButton(user)
      expect(props.onConfirm).toBeCalledTimes(1)
    })
  })
})
