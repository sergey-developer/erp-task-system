import { within } from '@testing-library/react'

import { props } from '_tests_/features/warehouse/components/CancelRelocationTaskModal/constants'
import { cancelRelocationTaskModalTestUtils } from '_tests_/features/warehouse/components/CancelRelocationTaskModal/testUtils'
import { render } from '_tests_/utils'

import CancelRelocationTaskModal from './index'

describe('Модалка отмены заявки на перемещение', () => {
  test('Модалка отображается корректно', () => {
    render(<CancelRelocationTaskModal {...props} />)

    const container = cancelRelocationTaskModalTestUtils.getContainer()
    const title = within(container).getByText('Отмена заявки')
    const description = within(container).getByText('Вы уверены, что хотите отменить заявку?')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается корректно', () => {
      render(<CancelRelocationTaskModal {...props} />)

      const button = cancelRelocationTaskModalTestUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<CancelRelocationTaskModal {...props} />)
      await cancelRelocationTaskModalTestUtils.clickConfirmButton(user)
      expect(props.onConfirm).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<CancelRelocationTaskModal {...props} />)

      const button = cancelRelocationTaskModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<CancelRelocationTaskModal {...props} />)
      await cancelRelocationTaskModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
