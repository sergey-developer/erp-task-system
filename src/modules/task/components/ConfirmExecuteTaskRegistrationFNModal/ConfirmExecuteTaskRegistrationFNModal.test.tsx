import { within } from '@testing-library/react'

import { props } from '_tests_/features/tasks/ConfirmExecuteTaskRegistrationFNModal/constants'
import { render } from '_tests_/utils'

import ConfirmExecuteTaskRegistrationFNModal from './index'
import { confirmExecuteTaskRegistrationFNModalTestUtils } from '_tests_/features/tasks/ConfirmExecuteTaskRegistrationFNModal/testUtils'

describe('Модалка подтверждения выполнения заявки', () => {
  test('Заголовок и текст отображается', () => {
    render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)

    const container = confirmExecuteTaskRegistrationFNModalTestUtils.getContainer()
    const text =
      'По заявке был направлен запрос на регистрацию ФН, но карточка еще не получена. Вы уверены, что хотите выполнить заявку?'

    expect(within(container).getByText('Регистрация ФН')).toBeInTheDocument()
    expect(within(container).getByText(text)).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)

      const button = confirmExecuteTaskRegistrationFNModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)
      await confirmExecuteTaskRegistrationFNModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)

      const button = confirmExecuteTaskRegistrationFNModalTestUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskRegistrationFNModal {...props} />)
      await confirmExecuteTaskRegistrationFNModalTestUtils.clickConfirmButton(user)
      expect(props.onOk).toBeCalledTimes(1)
    })
  })
})
