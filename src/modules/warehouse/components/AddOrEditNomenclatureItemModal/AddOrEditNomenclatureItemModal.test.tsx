import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { validationMessages } from 'shared/constants/validation'

import { fakeWord, getButtonIn, render } from '_tests_/utils'

import AddOrEditNomenclatureItemModal from './index'
import { AddOrEditNomenclatureItemModalProps } from './types'

const props: AddOrEditNomenclatureItemModalProps = {
  visible: true,
  title: fakeWord(),
  okText: fakeWord(),
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () =>
  screen.getByTestId('add-or-edit-nomenclature-item-modal')

// name field
const getNameFormItem = () =>
  within(getContainer()).getByTestId('name-form-item')

const getNameLabel = () =>
  within(getNameFormItem()).getByLabelText('Наименование')

const getNameField = () =>
  within(getNameFormItem()).getByPlaceholderText('Введите наименование')

const setName = async (user: UserEvent, value: string) => {
  const field = getNameField()
  await user.type(field, value)
  return field
}

const findNameError = (error: string): Promise<HTMLElement> =>
  within(getNameFormItem()).findByText(error)

// short name field
const getShortNameFormItem = () =>
  within(getContainer()).getByTestId('short-name-form-item')

const getShortNameLabel = () =>
  within(getShortNameFormItem()).getByLabelText('Краткое наименование')

const getShortNameField = () =>
  within(getShortNameFormItem()).getByPlaceholderText(
    'Введите краткое наименование',
  )

const setShortName = async (user: UserEvent, value: string) => {
  const field = getShortNameField()
  await user.type(field, value)
  return field
}

const findShortNameError = (error: string): Promise<HTMLElement> =>
  within(getShortNameFormItem()).findByText(error)

// add button
const getAddButton = () => getButtonIn(getContainer(), /Добавить/)

const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

// close button
const getCancelButton = () => getButtonIn(getContainer(), /Отменить/)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getAddButton,
  clickAddButton,

  getCancelButton,
  clickCancelButton,

  getNameFormItem,
  getNameLabel,
  getNameField,
  setName,
  findNameError,

  getShortNameFormItem,
  getShortNameLabel,
  getShortNameField,
  setShortName,
  findShortNameError,
}

describe('Модалка создания и редактирования номенклатурной позиции', () => {
  test('Заголовок отображается', () => {
    render(<AddOrEditNomenclatureItemModal {...props} />)
    const title = within(getContainer()).getByText(props.title)
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureItemModal {...props} okText='Добавить' />)

      const button = testUtils.getAddButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <AddOrEditNomenclatureItemModal {...props} okText='Добавить' />,
      )

      await testUtils.setName(user, fakeWord())
      await testUtils.setShortName(user, fakeWord())
      await testUtils.clickAddButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(
        expect.anything(),
        expect.anything(),
      )
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureItemModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AddOrEditNomenclatureItemModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Поле названия', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureItemModal {...props} />)

      const label = testUtils.getNameLabel()
      const field = testUtils.getNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureItemModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопка отправки', async () => {
      const { user } = render(
        <AddOrEditNomenclatureItemModal {...props} okText='Добавить' />,
      )

      await testUtils.clickAddButton(user)

      const error = await testUtils.findNameError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле краткого названия', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureItemModal {...props} />)

      const label = testUtils.getShortNameLabel()
      const field = testUtils.getShortNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureItemModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setShortName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопка отправки', async () => {
      const { user } = render(
        <AddOrEditNomenclatureItemModal {...props} okText='Добавить' />,
      )

      await testUtils.clickAddButton(user)

      const error = await testUtils.findShortNameError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })
})
