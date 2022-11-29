import { generateWord, render } from '_tests_/utils'

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

      test('Имеет верное количество вариантов', () => {})

      test('Не имеет значения по умолчанию', () => {})

      test('Можно выбрать значение', () => {})

      test('Закрывается после выбора значения', () => {})

      test('Можно установить значение по умолчанию', () => {})
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
    })
  })
})
