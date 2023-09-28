import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { validationMessages } from 'shared/constants/validation'
import { MaybeNull } from 'shared/types/utils'

import { buttonTestUtils, fakeWord, render } from '_tests_/utils'

import AddOrEditNomenclatureGroupModal from './index'
import { AddOrEditNomenclatureGroupModalProps } from './types'

const props: Readonly<AddOrEditNomenclatureGroupModalProps> = {
  open: true,
  title: fakeWord(),
  okText: fakeWord(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const addModeProps: Readonly<Pick<AddOrEditNomenclatureGroupModalProps, 'okText'>> = {
  okText: 'Добавить',
}

const editModeProps: Readonly<Pick<AddOrEditNomenclatureGroupModalProps, 'okText'>> = {
  okText: 'Сохранить',
}

const getContainer = () => screen.getByTestId('add-or-edit-nomenclature-group-modal')

const queryContainer = (): MaybeNull<HTMLElement> =>
  screen.queryByTestId('add-or-edit-nomenclature-group-modal')

const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId('add-or-edit-nomenclature-group-modal')

// name field
const getNameFormItem = () => within(getContainer()).getByTestId('name-form-item')

const getNameLabel = () => within(getNameFormItem()).getByLabelText('Наименование')

const getNameField = () => within(getNameFormItem()).getByPlaceholderText('Введите наименование')

const setName = async (user: UserEvent, value: string) => {
  const field = getNameField()
  await user.type(field, value)
  return field
}

const findNameError = (error: string): Promise<HTMLElement> =>
  within(getNameFormItem()).findByText(error)

// add button
const getAddButton = () => buttonTestUtils.getButtonIn(getContainer(), /Добавить/)

const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

// close button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /Отменить/)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getAddButton())

const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getAddButton())

export const testUtils = {
  getContainer,
  queryContainer,
  findContainer,

  getAddButton,
  clickAddButton,

  getCancelButton,
  clickCancelButton,

  getNameFormItem,
  getNameLabel,
  getNameField,
  setName,
  findNameError,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка создания и редактирования номенклатурной группы', () => {
  test('Заголовок отображается', () => {
    render(<AddOrEditNomenclatureGroupModal {...props} />)
    const title = within(testUtils.getContainer()).getByText(props.title as string)
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureGroupModal {...props} {...addModeProps} />)

      const button = testUtils.getAddButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AddOrEditNomenclatureGroupModal {...props} {...addModeProps} />)

      await testUtils.setName(user, fakeWord())
      await testUtils.clickAddButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })

    test('При загрузке отображается спиннер', async () => {
      render(<AddOrEditNomenclatureGroupModal {...props} {...addModeProps} isLoading />)

      await testUtils.expectLoadingStarted()
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureGroupModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AddOrEditNomenclatureGroupModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Поле названия', () => {
    test('Отображается корректно', () => {
      render(<AddOrEditNomenclatureGroupModal {...props} />)

      const label = testUtils.getNameLabel()
      const field = testUtils.getNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<AddOrEditNomenclatureGroupModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопку отправки', async () => {
      const { user } = render(<AddOrEditNomenclatureGroupModal {...props} {...addModeProps} />)

      await testUtils.clickAddButton(user)
      const error = await testUtils.findNameError(validationMessages.required)

      expect(error).toBeInTheDocument()
    })
  })
})
