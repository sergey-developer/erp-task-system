import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

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

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// name field
const getNameFormItem = () =>
  within(getContainer()).getByTestId('name-form-item')

const getNameField = () =>
  within(getNameFormItem()).getByPlaceholderText('Введите наименование')

const setName = async (user: UserEvent, value: string) => {
  const field = getNameField()
  await user.type(field, value)
  return field
}

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
  getChildByText,

  getAddButton,
  clickAddButton,

  getCancelButton,
  clickCancelButton,

  getNameFormItem,
  getNameField,
  setName,
}

describe('Модалка создания и редактирования номенклатурной позиции', () => {
  test('Заголовок отображается', () => {
    render(<AddOrEditNomenclatureItemModal {...props} />)
    const title = testUtils.getChildByText(props.title)
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

  describe('Поле комментария', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureItemModal {...props} />)

      const field = testUtils.getNameField()

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
  })
})
