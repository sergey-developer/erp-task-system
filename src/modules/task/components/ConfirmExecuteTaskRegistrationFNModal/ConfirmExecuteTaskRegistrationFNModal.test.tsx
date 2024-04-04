import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT, CONFIRM_TEXT } from 'shared/constants/common'

import { buttonTestUtils, render } from '_tests_/utils'

import ConfirmExecuteTaskRegistrationFNModal, {
  ConfirmExecuteTaskRegistrationFNModalProps,
} from './index'

const props: Readonly<ConfirmExecuteTaskRegistrationFNModalProps> = {
  open: true,
  onCancel: jest.fn(),
  onOk: jest.fn(),
}

const getContainer = () => screen.getByTestId('confirm-execute-task-registration-fn-modal')
const findContainer = () => screen.findByTestId('confirm-execute-task-registration-fn-modal')

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
    render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)

    const container = testUtils.getContainer()
    const text =
      'По заявке был направлен запрос на регистрацию ФН, но карточка еще не получена. Вы уверены, что хотите выполнить заявку?'

    expect(within(container).getByText('Регистрация ФН')).toBeInTheDocument()
    expect(within(container).getByText(text)).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)

      const button = testUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)
      await testUtils.clickConfirmButton(user)
      expect(props.onOk).toBeCalledTimes(1)
    })
  })
})
