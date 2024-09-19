import { ReclassificationReasonEnum } from 'modules/task/constants/taskReclassificationRequest'

import { validationMessages } from 'shared/constants/validation'

import { props, reasonValues } from '_tests_/features/tasks/RequestTaskReclassificationModal/constants'
import { requestTaskReclassificationModalTestUtils } from '_tests_/features/tasks/RequestTaskReclassificationModal/testUtils'
import { fakeWord, render } from '_tests_/utils'

import RequestTaskReclassificationModal from './index'

describe('Модалка запроса о переклассификации заявки', () => {
  test('Заголовок отображается', () => {
    render(<RequestTaskReclassificationModal {...props} />)

    expect(requestTaskReclassificationModalTestUtils.getChildByText('Запрос о переклассификации заявки')).toBeInTheDocument()
    expect(requestTaskReclassificationModalTestUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...props} />)
      const button = requestTaskReclassificationModalTestUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskReclassificationModal {...props} />)

      await requestTaskReclassificationModalTestUtils.clickCloseButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...props} />)

      const button = requestTaskReclassificationModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskReclassificationModal {...props} />)

      await requestTaskReclassificationModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...props} />)

      const button = requestTaskReclassificationModalTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<RequestTaskReclassificationModal {...props} isLoading />)
      await requestTaskReclassificationModalTestUtils.expectLoadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        for await (const reason of Object.values(ReclassificationReasonEnum)) {
          await requestTaskReclassificationModalTestUtils.setReclassificationReason(user, reason)
        }
        await requestTaskReclassificationModalTestUtils.setComment(user, fakeWord())
        await requestTaskReclassificationModalTestUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        await requestTaskReclassificationModalTestUtils.clickSubmitButton(user)
        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    describe('Поле причины переклассификации', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskReclassificationModal {...props} />)
        expect(requestTaskReclassificationModalTestUtils.getReclassificationReasonTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskReclassificationModal {...props} />)

        reasonValues.forEach((reason) => {
          const field = requestTaskReclassificationModalTestUtils.getReclassificationReasonField(reason)
          expect(field).toBeInTheDocument()
          expect(field).toBeEnabled()
          expect(field.value).toBe(reason)
          expect(field).not.toBeChecked()
        })
      })

      test('Можно выбрать любую доступную причину', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        for await (const reason of Object.values(ReclassificationReasonEnum)) {
          const field = await requestTaskReclassificationModalTestUtils.setReclassificationReason(user, reason)
          expect(field).toBeChecked()
        }
      })

      test('Не активно во время загрузки', () => {
        render(<RequestTaskReclassificationModal {...props} isLoading />)

        reasonValues.forEach((reason) => {
          const field = requestTaskReclassificationModalTestUtils.getReclassificationReasonField(reason)
          expect(field).toBeDisabled()
        })
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskReclassificationModal {...props} />)

          await requestTaskReclassificationModalTestUtils.clickSubmitButton(user)

          expect(
            await requestTaskReclassificationModalTestUtils.findReclassificationReasonError(validationMessages.required),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле комментария', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskReclassificationModal {...props} />)
        expect(requestTaskReclassificationModalTestUtils.getCommentTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskReclassificationModal {...props} />)

        const field = requestTaskReclassificationModalTestUtils.getCommentField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно заполнить', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        const value = fakeWord()
        const field = await requestTaskReclassificationModalTestUtils.setComment(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<RequestTaskReclassificationModal {...props} isLoading />)
        expect(requestTaskReclassificationModalTestUtils.getCommentField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<RequestTaskReclassificationModal {...props} />)

          await requestTaskReclassificationModalTestUtils.setComment(user, ' ')

          expect(
            await requestTaskReclassificationModalTestUtils.findCommentError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskReclassificationModal {...props} />)

          await requestTaskReclassificationModalTestUtils.clickSubmitButton(user)

          expect(await requestTaskReclassificationModalTestUtils.findCommentError(validationMessages.required)).toBeInTheDocument()
        })
      })
    })
  })
})
