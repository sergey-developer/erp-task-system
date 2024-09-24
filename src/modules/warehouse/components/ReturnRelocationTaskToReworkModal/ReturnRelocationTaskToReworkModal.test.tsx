import { within } from '@testing-library/react'

import { validationMessages } from 'shared/constants/validation'

import { props } from '_tests_/features/warehouse/ReturnRelocationTaskToReworkModal/constants'
import { fakeWord, render } from '_tests_/utils'

import ReturnRelocationTaskToReworkModal from './index'

describe('Модалка возврата заявки на перемещение на доработку', () => {
  test('Заголовок отображается корректно', () => {
    render(<ReturnRelocationTaskToReworkModal {...props} />)
    const title = within(returnRelocationTaskToReworkModalTestUtils.getContainer()).getByText(
      'Возврат на доработку',
    )
    expect(title).toBeInTheDocument()
  })

  describe('Поле причины возврата', () => {
    test('Отображается корректно', () => {
      render(<ReturnRelocationTaskToReworkModal {...props} />)

      const field = returnRelocationTaskToReworkModalTestUtils.getReasonField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)

        await returnRelocationTaskToReworkModalTestUtils.setReason(user, ' ')

        const error = await returnRelocationTaskToReworkModalTestUtils.findReasonError(
          validationMessages.canNotBeEmpty,
        )
        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)

        await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)

        const error = await returnRelocationTaskToReworkModalTestUtils.findReasonError(
          validationMessages.required,
        )
        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<ReturnRelocationTaskToReworkModal {...props} />)

      const button = returnRelocationTaskToReworkModalTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно если обязательные поля заполнены', async () => {
      const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)

      await returnRelocationTaskToReworkModalTestUtils.setReason(user, fakeWord())
      await returnRelocationTaskToReworkModalTestUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ReturnRelocationTaskToReworkModal {...props} />)

      const button = returnRelocationTaskToReworkModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)
      await returnRelocationTaskToReworkModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
