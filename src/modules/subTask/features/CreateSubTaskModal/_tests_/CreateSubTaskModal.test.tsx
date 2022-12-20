import { generateWord, render } from '_tests_/utils'
import {
  DEFAULT_LONG_TEXT_LENGTH,
  DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
  FIELD_CAN_NOT_BE_EMPTY_MSG,
  REQUIRED_FIELD_MSG,
  TEXT_MAX_LENGTH_MSG,
} from 'shared/constants/validation'
import { makeMaxLengthMessage } from 'shared/utils/validation'

import CreateSubTaskModal from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

describe('Модалка создания задачи заявки', () => {
  test('Заголовок отображается', () => {
    render(<CreateSubTaskModal {...requiredProps} />)

    expect(testUtils.getChildByText('Задание по заявке')).toBeInTheDocument()
    expect(testUtils.getChildByText(requiredProps.recordId)).toBeInTheDocument()
  })

  describe('Форма создания', () => {
    describe('Поле шаблона', () => {
      test('Название поля отображается', () => {
        render(<CreateSubTaskModal {...requiredProps} />)
        expect(testUtils.template.getLabel()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<CreateSubTaskModal {...requiredProps} />)

        const field = testUtils.template.getField()

        expect(testUtils.template.getPlaceholder()).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
      })

      test('Закрыто по умолчанию', () => {
        render(<CreateSubTaskModal {...requiredProps} />)
        expect(testUtils.template.queryField(true)).not.toBeInTheDocument()
      })

      test('Не активно во время загрузки', () => {
        render(<CreateSubTaskModal {...requiredProps} isLoading />)
        expect(testUtils.template.getField()).toBeDisabled()
      })

      test('Отображает состояние загрузки во время загрузки шаблонов', () => {
        render(
          <CreateSubTaskModal {...requiredProps} templateOptionsIsLoading />,
        )

        testUtils.template.expectLoadingStarted()
      })

      test('Имеет верное количество вариантов', async () => {
        const { user } = render(<CreateSubTaskModal {...requiredProps} />)

        await testUtils.template.openField(user)

        requiredProps.templateOptions.forEach((opt) => {
          const value = testUtils.template.getOption(opt.title)
          expect(value).toBeInTheDocument()
        })
      })

      test('Не имеет значения по умолчанию', () => {
        render(<CreateSubTaskModal {...requiredProps} />)

        requiredProps.templateOptions.forEach((opt) => {
          const value = testUtils.template.queryValue(opt.title)
          expect(value).not.toBeInTheDocument()
        })
      })

      test('Можно выбрать значение', async () => {
        const { user } = render(<CreateSubTaskModal {...requiredProps} />)

        const templateOption = requiredProps.templateOptions[0]
        await testUtils.template.openField(user)
        await testUtils.template.setValue(user, templateOption.title)
        const value = await testUtils.template.getValue(templateOption.title)

        expect(value).toBeInTheDocument()
      })

      test('Закрывается после выбора значения', async () => {
        const { user } = render(<CreateSubTaskModal {...requiredProps} />)

        const templateOption = requiredProps.templateOptions[0]
        await testUtils.template.openField(user)
        await testUtils.template.setValue(user, templateOption.title)

        expect(testUtils.template.getField(false)).toBeInTheDocument()
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не выбрать значение и нажать кнопку отправки', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.template.findError(REQUIRED_FIELD_MSG),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле заголовка', () => {
      test('Название поля отображается', () => {
        render(<CreateSubTaskModal {...requiredProps} />)
        expect(testUtils.title.getLabel()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<CreateSubTaskModal {...requiredProps} />)

        const field = testUtils.title.getField()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно во время загрузки', () => {
        render(<CreateSubTaskModal {...requiredProps} isLoading />)
        expect(testUtils.title.getField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<CreateSubTaskModal {...requiredProps} />)

        const value = generateWord()
        const field = await testUtils.title.setValue(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Можно очистить значение', async () => {
        const { user } = render(<CreateSubTaskModal {...requiredProps} />)

        const value = generateWord()
        await testUtils.title.setValue(user, value)
        await testUtils.title.resetValue(user)

        expect(testUtils.title.getField()).not.toHaveDisplayValue(value)
      })

      test('Можно установить значение по умолчанию', () => {
        const initialValue = generateWord()

        render(
          <CreateSubTaskModal
            {...requiredProps}
            initialFormValues={{
              title: initialValue,
            }}
          />,
        )

        expect(testUtils.title.getField()).toHaveDisplayValue(initialValue)
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не ввести значение и нажать кнопку отправки', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.title.findError(REQUIRED_FIELD_MSG),
          ).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.title.setValue(user, ' ')

          expect(
            await testUtils.title.findError(FIELD_CAN_NOT_BE_EMPTY_MSG),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.title.setValue(user, generateWord({ length: 101 }))

          expect(
            await testUtils.title.findError(
              makeMaxLengthMessage(TEXT_MAX_LENGTH_MSG, 100),
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле описания', () => {
      test('Название поля отображается', () => {
        render(<CreateSubTaskModal {...requiredProps} />)
        expect(testUtils.description.getLabel()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<CreateSubTaskModal {...requiredProps} />)

        const field = testUtils.description.getField()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно во время загрузки', () => {
        render(<CreateSubTaskModal {...requiredProps} isLoading />)
        expect(testUtils.description.getField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<CreateSubTaskModal {...requiredProps} />)

        const value = generateWord()
        const field = await testUtils.description.setValue(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Можно очистить значение', async () => {
        const { user } = render(<CreateSubTaskModal {...requiredProps} />)

        const value = generateWord()
        await testUtils.description.setValue(user, value)
        await testUtils.description.resetValue(user)

        expect(testUtils.description.getField()).not.toHaveDisplayValue(value)
      })

      test('Можно установить значение по умолчанию', () => {
        const initialValue = generateWord()

        render(
          <CreateSubTaskModal
            {...requiredProps}
            initialFormValues={{
              description: initialValue,
            }}
          />,
        )

        expect(testUtils.description.getField()).toHaveDisplayValue(
          initialValue,
        )
      })

      describe('Соответствующая ошибка отображается под полем', () => {
        test('Если не ввести значение и нажать кнопку отправки', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.description.findError(REQUIRED_FIELD_MSG),
          ).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.description.setValue(user, ' ')

          expect(
            await testUtils.description.findError(FIELD_CAN_NOT_BE_EMPTY_MSG),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.description.setValue(
            user,
            generateWord({ length: DEFAULT_LONG_TEXT_LENGTH + 1 }),
          )

          expect(
            await testUtils.description.findError(
              DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<CreateSubTaskModal {...requiredProps} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<CreateSubTaskModal {...requiredProps} isLoading />)
      await testUtils.loadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateSubTaskModal {...requiredProps} />)

      await testUtils.userFillForm(user, {
        template: requiredProps.templateOptions[0].title,
        title: generateWord(),
        description: generateWord(),
      })
      await testUtils.userClickSubmitButton(user)

      expect(requiredProps.onSubmit).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<CreateSubTaskModal {...requiredProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateSubTaskModal {...requiredProps} />)

      await testUtils.userClickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })
})
