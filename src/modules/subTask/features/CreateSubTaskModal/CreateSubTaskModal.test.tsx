import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import subTaskFixtures from 'fixtures/subTask'

import {
  clickSelectOption,
  generateIdStr,
  generateWord,
  getButtonIn,
  getSelect,
  expectLoadingFinishedByButton,
  expectLoadingFinishedBySelect,
  expectLoadingStartedByButton,
  expectLoadingStartedBySelect,
  querySelect,
  render,
  openSelect,
} from '_tests_/utils'

import CreateSubTaskModal from './index'
import { CreateSubTaskFormFields, CreateSubTaskModalProps } from './interfaces'

const requiredProps: CreateSubTaskModalProps = {
  recordId: generateIdStr(),
  initialFormValues: {},
  isLoading: false,
  templateOptions: subTaskFixtures.getSubTaskTemplateList(2),
  templateOptionsIsLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-sub-task-modal')

const findContainer = () => screen.findByTestId('create-sub-task-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// template field
const getTemplateFieldContainer = () =>
  within(getContainer()).getByTestId('template')

const getTemplateField = (opened?: boolean) =>
  getSelect(getTemplateFieldContainer(), { name: 'Шаблон', expanded: opened })

const queryTemplateField = (opened?: boolean) =>
  querySelect(getTemplateFieldContainer(), { name: 'Шаблон', expanded: opened })

const getTemplateFieldPlaceholder = () =>
  within(getTemplateFieldContainer()).getByText('Наименование шаблона')

const getTemplateFieldLabel = () =>
  within(getTemplateFieldContainer()).getByTitle('Шаблон')

const setTemplate = clickSelectOption

const getTemplateOption = (name: string) =>
  within(screen.getByRole('listbox')).getByRole('option', { name })

const getSelectedTemplate = (value: string) =>
  within(getTemplateFieldContainer()).getByTitle(value)

const querySelectedTemplate = (value: string) =>
  within(getTemplateFieldContainer()).queryByTitle(value)

const openTemplateField = async (user: UserEvent) => {
  await openSelect(user, getTemplateFieldContainer())
}

const findTemplateFieldError = (error: string) =>
  within(getTemplateFieldContainer()).findByText(error)

const templateFieldExpectLoadingStarted = () =>
  expectLoadingStartedBySelect(getTemplateFieldContainer())

const templateFieldExpectLoadingFinished = () =>
  expectLoadingFinishedBySelect(getTemplateFieldContainer())

// title field
const getTitleFieldContainer = () => within(getContainer()).getByTestId('title')

const getTitleField = () =>
  within(getTitleFieldContainer()).getByPlaceholderText(
    'Опишите коротко задачу',
  )

const getTitleFieldLabel = () =>
  within(getTitleFieldContainer()).getByTitle('Краткое описание')

const setTitle = async (user: UserEvent, value: string) => {
  const field = getTitleField()
  await user.type(field, value)
  return field
}

const resetTitle = async (user: UserEvent) => {
  const button = getButtonIn(getTitleFieldContainer(), 'close-circle')
  await user.click(button)
}

const findTitleFieldError = (error: string) =>
  within(getTitleFieldContainer()).findByText(error)

// description field
const getDescriptionFieldContainer = () =>
  within(getContainer()).getByTestId('description')

const getDescriptionField = () =>
  within(getDescriptionFieldContainer()).getByPlaceholderText(
    'Расскажите подробнее о задаче',
  )

const getDescriptionFieldLabel = () =>
  within(getDescriptionFieldContainer()).getByTitle('Подробное описание')

const setDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

const resetDescription = async (user: UserEvent) => {
  const button = getButtonIn(getDescriptionFieldContainer(), 'close-circle')
  await user.click(button)
}

const findDescriptionFieldError = (error: string) =>
  within(getDescriptionFieldContainer()).findByText(error)

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /создать задание/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// other
const userFillForm = async (
  user: UserEvent,
  values: Omit<CreateSubTaskFormFields, 'templateX5'> & { templateX5: string },
) => {
  await openTemplateField(user)
  await setTemplate(user, values.templateX5)
  await setTitle(user, values.title)
  await setDescription(user, values.description)
}

const expectLoadingStarted = () => expectLoadingStartedByButton(getSubmitButton())
const expectLoadingFinished = () => expectLoadingFinishedByButton(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  template: {
    getContainer: getTemplateFieldContainer,
    getField: getTemplateField,
    queryField: queryTemplateField,
    getPlaceholder: getTemplateFieldPlaceholder,
    getLabel: getTemplateFieldLabel,
    getValue: getSelectedTemplate,
    queryValue: querySelectedTemplate,
    setValue: setTemplate,
    openField: openTemplateField,
    getOption: getTemplateOption,
    findError: findTemplateFieldError,
    expectLoadingStarted: templateFieldExpectLoadingStarted,
    expectLoadingFinished: templateFieldExpectLoadingFinished,
  },
  title: {
    getField: getTitleField,
    getLabel: getTitleFieldLabel,
    setValue: setTitle,
    resetValue: resetTitle,
    findError: findTitleFieldError,
  },
  description: {
    getField: getDescriptionField,
    getLabel: getDescriptionFieldLabel,
    setValue: setDescription,
    resetValue: resetDescription,
    findError: findDescriptionFieldError,
  },
  userFillForm,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка создания задачи заявки', () => {
  test('Заголовок отображается', () => {
    render(<CreateSubTaskModal {...requiredProps} />)

    expect(testUtils.getChildByText(/задание по заявке/i)).toBeInTheDocument()
    expect(testUtils.getChildByText(requiredProps.recordId)).toBeInTheDocument()
  })

  describe('Форма создания', () => {
    describe('Поле шаблона', () => {
      test('Отображается корректно', () => {
        render(<CreateSubTaskModal {...requiredProps} />)

        const field = testUtils.template.getField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(testUtils.template.getPlaceholder()).toBeInTheDocument()
        expect(testUtils.template.getLabel()).toBeInTheDocument()
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

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.template.findError(validationMessages.required),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле заголовка', () => {
      test('Отображается корректно', () => {
        render(<CreateSubTaskModal {...requiredProps} />)

        const field = testUtils.title.getField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
        expect(testUtils.title.getLabel()).toBeInTheDocument()
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

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.title.findError(validationMessages.required),
          ).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.title.setValue(user, ' ')

          expect(
            await testUtils.title.findError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.title.setValue(
            user,
            generateWord({ length: validationSizes.string.short + 1 }),
          )

          expect(
            await testUtils.title.findError(
              validationMessages.string.max.short,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле описания', () => {
      test('Отображается корректно', () => {
        render(<CreateSubTaskModal {...requiredProps} />)

        const field = testUtils.description.getField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
        expect(testUtils.description.getLabel()).toBeInTheDocument()
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

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.description.findError(validationMessages.required),
          ).toBeInTheDocument()
        })

        test('Если ввести только пробелы', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.description.setValue(user, ' ')

          expect(
            await testUtils.description.findError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<CreateSubTaskModal {...requiredProps} />)

          await testUtils.description.setValue(
            user,
            generateWord({ length: validationSizes.string.long + 1 }),
          )

          expect(
            await testUtils.description.findError(
              validationMessages.string.max.long,
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
      await testUtils.expectLoadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<CreateSubTaskModal {...requiredProps} />)

      await testUtils.userFillForm(user, {
        templateX5: requiredProps.templateOptions[0].title,
        title: generateWord(),
        description: generateWord(),
      })
      await testUtils.clickSubmitButton(user)

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

      await testUtils.clickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })
})
