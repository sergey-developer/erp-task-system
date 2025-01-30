import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { ADD_TEXT, CANCEL_TEXT } from 'shared/constants/common'

import { TestIdsEnum } from '_tests_/features/warehouse/components/CreateInventorizationEquipmentModal/constants'
import { buttonTestUtils, selectTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateInventorizationEquipmentModal)
const findContainer = () => screen.findByTestId(TestIdsEnum.CreateInventorizationEquipmentModal)

// equipment field
const getEquipmentFormItem = () => within(getContainer()).getByTestId(TestIdsEnum.EquipmentFormItem)
const getEquipmentLabel = () => within(getEquipmentFormItem()).getByLabelText('Оборудование')
const getEquipmentSelectInput = () => selectTestUtils.getSelect(getEquipmentFormItem())

const openEquipmentSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getEquipmentFormItem())

const setEquipment = selectTestUtils.clickSelectOption
const getSelectedEquipment = () => selectTestUtils.getSelectedOption(getEquipmentFormItem())
const findEquipmentError = async (text: string) => within(getEquipmentFormItem()).findByText(text)

const getCreateEquipmentButton = () =>
  buttonTestUtils.getButtonIn(
    screen.getByTestId(TestIdsEnum.EquipmentDropdown),
    'Добавить оборудование',
  )

const clickCreateEquipmentButton = async (user: UserEvent) => user.click(getCreateEquipmentButton())

const expectEquipmentLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getEquipmentFormItem())

// location plan field
const getLocationPlanFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.LocationPlanFormItem)
const getLocationPlanSelectInput = () => selectTestUtils.getSelect(getLocationPlanFormItem())
const getSelectedLocationPlan = () => selectTestUtils.getSelectedOption(getLocationPlanFormItem())

// location fact field
const getLocationFactFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.LocationFactFormItem)
const getLocationFactSelectInput = () => selectTestUtils.getSelect(getLocationFactFormItem())

const getLocationFactLabel = () =>
  within(getLocationFactFormItem()).getByLabelText('Фактическое местонахождение')

const openLocationFactSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getLocationFactFormItem())

const setLocationFact = selectTestUtils.clickSelectOption
const getSelectedLocationFact = () => selectTestUtils.getSelectedOption(getLocationFactFormItem())

const findLocationFactError = async (text: string) =>
  within(getLocationFactFormItem()).findByText(text)

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), new RegExp(ADD_TEXT))
// todo: сделать в других местах такие же функции таким образом
const clickSubmitButton = async (user: UserEvent) => user.click(getSubmitButton())

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => user.click(getCancelButton())

// loading
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const createInventorizationEquipmentModalTestUtils = {
  getContainer,
  findContainer,

  getEquipmentSelectInput,
  getEquipmentLabel,
  openEquipmentSelect,
  setEquipment,
  getSelectedEquipment,
  findEquipmentError,
  clickCreateEquipmentButton,
  expectEquipmentLoadingFinished,

  getLocationPlanSelectInput,
  getSelectedLocationPlan,

  getLocationFactSelectInput,
  getLocationFactLabel,
  openLocationFactSelect,
  setLocationFact,
  getSelectedLocationFact,
  findLocationFactError,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingFinished,
}
