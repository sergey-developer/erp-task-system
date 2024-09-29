import { validationMessages, validationSizes } from 'shared/constants/validation'

import { props } from '_tests_/features/tasks/components/ReworkSubTaskModal/constants'
import { reworkSubTaskModalTestUtils } from '_tests_/features/tasks/components/ReworkSubTaskModal/testUtils'
import { buttonTestUtils, fakeIdStr, fakeWord, render } from '_tests_/utils'

import ReworkSubTaskModal from './index'

describe('Модалка отправки запроса на доработку', () => {
  test('Отображается корректно', () => {
    render(<ReworkSubTaskModal {...props} />)
    expect(reworkSubTaskModalTestUtils.getContainer()).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    const recordId = fakeIdStr()
    render(<ReworkSubTaskModal {...props} recordId={recordId} />)

    expect(
      reworkSubTaskModalTestUtils.getChildByText(/возврат на доработку задания/i),
    ).toBeInTheDocument()

    expect(reworkSubTaskModalTestUtils.getChildByText(recordId)).toBeInTheDocument()
  })

  describe('Форма', () => {
    describe('Поле ввода причины возврата', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...props} />)

        const field = reworkSubTaskModalTestUtils.getReturnReasonField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<ReworkSubTaskModal {...props} isLoading />)
        expect(reworkSubTaskModalTestUtils.getReturnReasonField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<ReworkSubTaskModal {...props} />)

        const value = fakeWord()
        const field = await reworkSubTaskModalTestUtils.setReturnReason(user, value)

        expect(field).toHaveValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<ReworkSubTaskModal {...props} />)

          await reworkSubTaskModalTestUtils.setReturnReason(user, ' ')

          expect(
            await reworkSubTaskModalTestUtils.findReturnReasonFieldError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<ReworkSubTaskModal {...props} />)

          await reworkSubTaskModalTestUtils.setReturnReason(
            user,
            fakeWord({ length: validationSizes.string.middle + 1 }),
          )

          expect(
            await reworkSubTaskModalTestUtils.findReturnReasonFieldError(
              validationMessages.string.max.middle,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<ReworkSubTaskModal {...props} />)

          await reworkSubTaskModalTestUtils.clickSubmitButton(user)

          expect(
            await reworkSubTaskModalTestUtils.findReturnReasonFieldError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...props} />)

        const submitButton = reworkSubTaskModalTestUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<ReworkSubTaskModal {...props} isLoading />)

        const submitButton = reworkSubTaskModalTestUtils.getSubmitButton()
        await buttonTestUtils.expectLoadingStarted(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<ReworkSubTaskModal {...props} />)

        await reworkSubTaskModalTestUtils.setReturnReason(user, fakeWord())
        await reworkSubTaskModalTestUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })
    })

    describe('Кнопка отмены', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...props} />)

        const cancelButton = reworkSubTaskModalTestUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<ReworkSubTaskModal {...props} />)

        await reworkSubTaskModalTestUtils.clickCancelButton(user)
        expect(props.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
