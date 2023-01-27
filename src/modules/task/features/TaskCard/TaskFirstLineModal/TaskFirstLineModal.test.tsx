import {
  generateWord,
  getButtonIn,
  loadingStartedByButton,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import TaskFirstLineModal from './index'
import { TaskFirstLineModalProps } from './interfaces'

const requiredProps: TaskFirstLineModalProps = {
  recordId: generateWord(),
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const getModal = () => screen.getByTestId('modal-task-first-line')
const findModal = () => screen.findByTestId('modal-task-first-line')

const getDescriptionField = () =>
  within(getModal()).getByRole('textbox', {
    name: 'Причина возврата',
  })

const getDescriptionFieldContainer = () =>
  within(getModal()).getByTestId('field-description')

const setDescription = async (user: UserEvent, value: string) => {
  const field = getDescriptionField()
  await user.type(field, value)
  return field
}

const getSubmitButton = () => getButtonIn(getModal(), /вернуть заявку/i)
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}
const getCancelButton = () => getButtonIn(getModal(), /отменить/i)

export const testUtils = {
  getModal,
  findModal,

  getDescriptionField,
  getDescriptionFieldContainer,
  setDescription,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
}

describe('Модальное окно перевода запроса на первую линию', () => {
  test('Отображается корректно', () => {
    render(<TaskFirstLineModal {...requiredProps} />)

    const modal = testUtils.getModal()
    expect(modal).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    render(<TaskFirstLineModal {...requiredProps} />)

    const modal = testUtils.getModal()
    const recordId = within(modal).getByText(requiredProps.recordId)

    expect(recordId).toBeInTheDocument()
  })

  test('Текст отображается корректно', () => {
    render(<TaskFirstLineModal {...requiredProps} />)

    const modal = testUtils.getModal()
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
        render(<TaskFirstLineModal {...requiredProps} />)

        const description = testUtils.getDescriptionField()

        expect(description).toBeInTheDocument()
        expect(description).toBeEnabled()
        expect(description).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<TaskFirstLineModal {...requiredProps} isLoading />)

        const description = testUtils.getDescriptionField()
        expect(description).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<TaskFirstLineModal {...requiredProps} />)

        const description = testUtils.getDescriptionField()
        const descriptionText = generateWord()
        await user.type(description, descriptionText)

        expect(description).toHaveValue(descriptionText)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<TaskFirstLineModal {...requiredProps} />)

          const description = testUtils.getDescriptionField()

          await user.type(description, ' ')

          const errorMessage = await screen.findByText(
            validationMessages.canNotBeEmpty,
          )
          expect(errorMessage).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskFirstLineModal {...requiredProps} />)

          const field = testUtils.getDescriptionField()
          await user.type(
            field,
            generateWord({ length: validationSizes.string.long + 1 }),
          )

          expect(
            await screen.findByText(validationMessages.string.max.long),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskFirstLineModal {...requiredProps} />)

          const submitButton = testUtils.getSubmitButton()
          await user.click(submitButton)

          const errorMessage = await screen.findByText(
            validationMessages.required,
          )
          expect(errorMessage).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<TaskFirstLineModal {...requiredProps} />)

        const submitButton = testUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<TaskFirstLineModal {...requiredProps} isLoading />)

        const submitButton = testUtils.getSubmitButton()
        await loadingStartedByButton(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<TaskFirstLineModal {...requiredProps} />)

        const description = testUtils.getDescriptionField()
        const submitButton = testUtils.getSubmitButton()

        await user.type(description, generateWord())
        await user.click(submitButton)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
      })
    })

    describe('Кнопка отмены', () => {
      test('Отображается корректно', () => {
        render(<TaskFirstLineModal {...requiredProps} />)

        const cancelButton = testUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<TaskFirstLineModal {...requiredProps} />)

        const cancelButton = testUtils.getCancelButton()
        await user.click(cancelButton)

        expect(requiredProps.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
