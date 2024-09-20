import { within } from '@testing-library/react'

import { props } from '_tests_/features/warehouse/ConfirmExecutionRelocationTaskModal/constants'
import { confirmExecutionRelocationTaskModalTestUtils } from '_tests_/features/warehouse/ConfirmExecutionRelocationTaskModal/testUtils'
import { render } from '_tests_/utils'

import ConfirmExecutionRelocationTaskModal from './index'

describe('Модалка отмены заявки на перемещение', () => {
  test('Модалка отображается корректно', () => {
    render(<ConfirmExecutionRelocationTaskModal {...props} />)

    const container = confirmExecutionRelocationTaskModalTestUtils.getContainer()
    const title = within(container).getByText('Подтверждение выполнения')
    const description = within(container).getByText(
      'Вы уверены, что хотите подтвердить выполнение заявки?',
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается корректно', () => {
      render(<ConfirmExecutionRelocationTaskModal {...props} />)

      const button = confirmExecutionRelocationTaskModalTestUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecutionRelocationTaskModal {...props} />)
      await confirmExecutionRelocationTaskModalTestUtils.clickConfirmButton(user)
      expect(props.onConfirm).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ConfirmExecutionRelocationTaskModal {...props} />)

      const button = confirmExecutionRelocationTaskModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecutionRelocationTaskModal {...props} />)
      await confirmExecutionRelocationTaskModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
