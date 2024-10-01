import { validationMessages, validationSizes } from 'shared/constants/validation'

import { props } from '_tests_/features/tasks/components/CancelSubTaskModal/constants'
import { cancelSubTaskModalTestUtils } from '_tests_/features/tasks/components/CancelSubTaskModal/testUtils'
import { buttonTestUtils, fakeIdStr, fakeWord, render } from '_tests_/utils'

import CancelSubTaskModal from './index'

describe('Модальное окно отправки запроса на доработку', () => {
  test('Отображается корректно', () => {
    render(<CancelSubTaskModal {...props} />)
    expect(cancelSubTaskModalTestUtils.getContainer()).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    const recordId = fakeIdStr()
    render(<CancelSubTaskModal {...props} recordId={recordId} />)

    expect(cancelSubTaskModalTestUtils.getChildByText(/отмена задания/i)).toBeInTheDocument()
    expect(cancelSubTaskModalTestUtils.getChildByText(recordId)).toBeInTheDocument()
  })

  describe('Форма перевода заявки', () => {
    describe('Поле ввода причины отмены', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...props} />)

        const field = cancelSubTaskModalTestUtils.getCancelReasonField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<CancelSubTaskModal {...props} isLoading />)
        expect(cancelSubTaskModalTestUtils.getCancelReasonField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<CancelSubTaskModal {...props} />)

        const value = fakeWord()
        const field = await cancelSubTaskModalTestUtils.setCancelReason(user, value)

        expect(field).toHaveValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<CancelSubTaskModal {...props} />)

          await cancelSubTaskModalTestUtils.setCancelReason(user, ' ')

          expect(
            await cancelSubTaskModalTestUtils.findCancelReasonFieldError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<CancelSubTaskModal {...props} />)

          await cancelSubTaskModalTestUtils.setCancelReason(
            user,
            fakeWord({ length: validationSizes.string.middle + 1 }),
          )

          expect(
            await cancelSubTaskModalTestUtils.findCancelReasonFieldError(
              validationMessages.string.max.middle,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<CancelSubTaskModal {...props} />)

          await cancelSubTaskModalTestUtils.clickSubmitButton(user)

          expect(
            await cancelSubTaskModalTestUtils.findCancelReasonFieldError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...props} />)

        const submitButton = cancelSubTaskModalTestUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<CancelSubTaskModal {...props} isLoading />)

        const submitButton = cancelSubTaskModalTestUtils.getSubmitButton()
        await buttonTestUtils.expectLoadingStarted(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<CancelSubTaskModal {...props} />)

        await cancelSubTaskModalTestUtils.setCancelReason(user, fakeWord())
        await cancelSubTaskModalTestUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })
    })

    describe('Кнопка отмены', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...props} />)

        const cancelButton = cancelSubTaskModalTestUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<CancelSubTaskModal {...props} />)

        await cancelSubTaskModalTestUtils.clickCancelButton(user)
        expect(props.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
