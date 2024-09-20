import { screen, within } from '@testing-library/react'

import { validationMessages, validationSizes } from 'shared/constants/validation'

import { props } from '_tests_/features/tasks/TaskFirstLineModal/constants'
import { taskFirstLineModalTestUtils } from '_tests_/features/tasks/TaskFirstLineModal/testUtils'
import { buttonTestUtils, fakeWord, render } from '_tests_/utils'

import TaskFirstLineModal from './index'

describe('Модальное окно перевода запроса на первую линию', () => {
  test('Отображается корректно', () => {
    render(<TaskFirstLineModal {...props} />)

    const modal = taskFirstLineModalTestUtils.getContainer()
    expect(modal).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    render(<TaskFirstLineModal {...props} />)

    const modal = taskFirstLineModalTestUtils.getContainer()
    const recordId = within(modal).getByText(props.recordId)

    expect(recordId).toBeInTheDocument()
  })

  test('Текст отображается корректно', () => {
    render(<TaskFirstLineModal {...props} />)

    const modal = taskFirstLineModalTestUtils.getContainer()
    const text1 = within(modal).getByText(
      /Укажите причину возврата. Нажмите кнопку «Вернуть заявку»/i,
    )
    const text2 = within(modal).getByText(
      /Заявка исчезнет из вашей очереди заявок. Просмотр заявки и работа с ней будут недоступны/i,
    )

    expect(text1).toBeInTheDocument()
    expect(text2).toBeInTheDocument()
  })

  describe('Форма перевода заявки', () => {
    describe('Поле ввода причины возврата', () => {
      test('Отображается корректно', () => {
        render(<TaskFirstLineModal {...props} />)

        const description = taskFirstLineModalTestUtils.getDescriptionField()

        expect(description).toBeInTheDocument()
        expect(description).toBeEnabled()
        expect(description).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<TaskFirstLineModal {...props} isLoading />)

        const description = taskFirstLineModalTestUtils.getDescriptionField()
        expect(description).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<TaskFirstLineModal {...props} />)

        const description = taskFirstLineModalTestUtils.getDescriptionField()
        const descriptionText = fakeWord()
        await user.type(description, descriptionText)

        expect(description).toHaveValue(descriptionText)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<TaskFirstLineModal {...props} />)

          const description = taskFirstLineModalTestUtils.getDescriptionField()

          await user.type(description, ' ')

          const errorMessage = await screen.findByText(validationMessages.canNotBeEmpty)
          expect(errorMessage).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskFirstLineModal {...props} />)

          const field = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(field, fakeWord({ length: validationSizes.string.long + 1 }))

          expect(await screen.findByText(validationMessages.string.max.long)).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskFirstLineModal {...props} />)

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          const errorMessage = await screen.findByText(validationMessages.required)
          expect(errorMessage).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<TaskFirstLineModal {...props} />)

        const submitButton = taskFirstLineModalTestUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<TaskFirstLineModal {...props} isLoading />)

        const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
        await buttonTestUtils.expectLoadingStarted(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<TaskFirstLineModal {...props} />)

        const description = taskFirstLineModalTestUtils.getDescriptionField()
        const submitButton = taskFirstLineModalTestUtils.getSubmitButton()

        await user.type(description, fakeWord())
        await user.click(submitButton)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })
    })

    describe('Кнопка отмены', () => {
      test('Отображается корректно', () => {
        render(<TaskFirstLineModal {...props} />)

        const cancelButton = taskFirstLineModalTestUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<TaskFirstLineModal {...props} />)

        const cancelButton = taskFirstLineModalTestUtils.getCancelButton()
        await user.click(cancelButton)

        expect(props.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
