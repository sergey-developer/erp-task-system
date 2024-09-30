import { within } from '@testing-library/react'

import { props } from '_tests_/features/warehouse/components/ConfirmMoveRelocationTaskDraftToWorkModal/constants'
import { ConfirmMoveRelocationTaskDraftToWorkModalTestUtils as testUtils } from '_tests_/features/warehouse/components/ConfirmMoveRelocationTaskDraftToWorkModal/testUtils'
import { render } from '_tests_/utils'

import ConfirmMoveRelocationTaskDraftToWorkModal from './index'

describe('Модалка подтверждения перевода черновика заявки на перемещение в работу', () => {
  test('Заголовок и описание отображается', () => {
    render(<ConfirmMoveRelocationTaskDraftToWorkModal {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText('Перевести черновик в работу')
    const description1 = within(container).getByText(
      'Вы уверены, что хотите перевести черновик в работу?',
    )
    const description2 = within(container).getByText('Заявку на перемещение нельзя будет удалить')

    expect(title).toBeInTheDocument()
    expect(description1).toBeInTheDocument()
    expect(description2).toBeInTheDocument()
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается и активна', () => {
      render(<ConfirmMoveRelocationTaskDraftToWorkModal {...props} />)

      const button = testUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmMoveRelocationTaskDraftToWorkModal {...props} />)
      await testUtils.clickConfirmButton(user)
      expect(props.onConfirm).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается и активна', () => {
      render(<ConfirmMoveRelocationTaskDraftToWorkModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmMoveRelocationTaskDraftToWorkModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
