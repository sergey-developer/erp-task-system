import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull } from 'shared/types/utils'

import { buttonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.NomenclatureGroupFormModal)

const queryContainer = (): MaybeNull<HTMLElement> =>
  screen.queryByTestId(TestIdsEnum.NomenclatureGroupFormModal)

const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId(TestIdsEnum.NomenclatureGroupFormModal)

// name field
const getNameFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.NameFormItem)

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

export const nomenclatureGroupFormModalTestUtils = {
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
