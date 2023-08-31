import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull } from 'shared/types/utils'

import {
  clickSelectOption,
  expectLoadingFinishedBySelect,
  expectLoadingStartedBySelect,
  fakeWord,
  getButtonIn,
  getSelect,
  getSelectOption,
  openSelect,
  render,
} from '_tests_/utils'

import EquipmentModal from './index'
import { EquipmentModalProps } from './types'

const props: Readonly<EquipmentModalProps> = {
  visible: true,
  title: fakeWord(),
  isLoading: false,
  okText: fakeWord(),

  onCancel: jest.fn(),
  onSubmit: jest.fn(),

  nomenclatureList: [],
  nomenclatureListIsLoading: false,
  onChangeNomenclature: jest.fn(),

  categoryList: [],
  categoryListIsLoading: false,

  currencyList: [],
  currencyListIsFetching: false,

  ownerList: [],
  ownerListIsFetching: false,

  workTypeList: [],
  workTypeListIsFetching: false,

  warehouseList: [],
  warehouseListIsLoading: false,
}

const addModeProps: Readonly<Pick<EquipmentModalProps, 'okText'>> = {
  okText: 'Добавить',
}

const editModeProps: Readonly<Pick<EquipmentModalProps, 'okText'>> = {
  okText: 'Сохранить',
}

const getContainer = () => screen.getByTestId('equipment-modal')

const findContainer = (): Promise<HTMLElement> => screen.findByTestId('equipment-modal')

// add button
const getAddButton = () => getButtonIn(getContainer(), new RegExp(addModeProps.okText as string))

const clickAddButton = async (user: UserEvent) => {
  const button = getAddButton()
  await user.click(button)
}

// edit button
const getEditButton = () => getButtonIn(getContainer(), new RegExp(editModeProps.okText as string))

const clickEditButton = async (user: UserEvent) => {
  const button = getEditButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), 'Отменить')

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

// category
const getCategoryFormItem = () => within(getContainer()).getByTestId('category')

const getCategoryLabel = () => within(getCategoryFormItem()).getByLabelText('Группа')

const getCategorySelectInput = (opened?: boolean) =>
  getSelect(getCategoryFormItem(), { name: 'Выберите категорию', expanded: opened })

const setCategory = clickSelectOption

const getCategoryOption = getSelectOption

const getSelectedCategory = (value: string): HTMLElement =>
  within(getCategoryFormItem()).getByTitle(value)

const querySelectedCategory = (value: string): MaybeNull<HTMLElement> =>
  within(getCategoryFormItem()).queryByTitle(value)

const openCategorySelect = async (user: UserEvent) => {
  await openSelect(user, getCategoryFormItem())
}

const findCategoryError = (error: string): Promise<HTMLElement> =>
  within(getCategoryFormItem()).findByText(error)

const expectCategoryLoadingStarted = () => expectLoadingStartedBySelect(getCategoryFormItem())

const expectCategoryLoadingFinished = () => expectLoadingFinishedBySelect(getCategoryFormItem())

export const testUtils = {
  getContainer,
  findContainer,

  getAddButton,
  clickAddButton,

  getEditButton,
  clickEditButton,

  getCancelButton,
  clickCancelButton,

  getCategoryFormItem,
  getCategoryLabel,
  getCategorySelectInput,
  setCategory,
  getCategoryOption,
  getSelectedCategory,
  querySelectedCategory,
  openCategorySelect,
  findCategoryError,
  expectCategoryLoadingStarted,
  expectCategoryLoadingFinished,
}

describe('Модалка оборудования', () => {
  describe('Категория', () => {
    test('Отображается корректно', () => {
      render(<EquipmentModal {...props} />)
    })
  })

  describe('Номенклатура', () => {})
  describe('Наименование', () => {})
  describe('Инвентарный номер заказчика', () => {})
  describe('Серийный номер', () => {})
  describe('Склад', () => {})
  describe('Состояние', () => {})
  describe('Количество', () => {})
  describe('Ед.измерения', () => {})
  describe('Стоимость', () => {})
  describe('Валюта', () => {})
  describe('Новое', () => {})
  describe('На гарантии', () => {})
  describe('Отремонтированное', () => {})
  describe('Счетчик пробега текущий', () => {})
  describe('Владелец оборудования', () => {})
  describe('Назначение оборудования', () => {})
  describe('Комментарий', () => {})
})
