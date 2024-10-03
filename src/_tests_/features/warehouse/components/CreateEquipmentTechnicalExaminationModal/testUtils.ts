import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'

import { buttonTestUtils, radioButtonTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from '_tests_/features/warehouse/components/CreateEquipmentTechnicalExaminationModal/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.CreateEquipmentTechnicalExaminationModal)
const findContainer = () =>
  screen.findByTestId(TestIdsEnum.CreateEquipmentTechnicalExaminationModal)

// has mechanical damage field
const getHasMechanicalDamageFormItem = () =>
  within(getContainer()).getByTestId('has-mechanical-damage-form-item')

const getHasMechanicalDamageField = (text: string) =>
  radioButtonTestUtils.getRadioButtonIn(getHasMechanicalDamageFormItem(), text)

const clickHasMechanicalDamageField = async (user: UserEvent, text: string) => {
  const field = getHasMechanicalDamageField(text)
  await user.click(field)
  return field
}

const findHasMechanicalDamageError = (text: string) =>
  within(getHasMechanicalDamageFormItem()).findByText(text)

// malfunction field
const getMalfunctionFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.MalfunctionFormItem)

const getMalfunctionField = () =>
  within(getMalfunctionFormItem()).getByPlaceholderText('Введите текст')

const findMalfunctionError = (text: string) => within(getMalfunctionFormItem()).findByText(text)

const setMalfunction = async (user: UserEvent, value: string) => {
  const field = getMalfunctionField()
  await user.type(field, value)
  return field
}

// conclusion field
const getConclusionFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.ConclusionFormItem)

const getConclusionField = () =>
  within(getConclusionFormItem()).getByPlaceholderText('Введите текст')

const setConclusion = async (user: UserEvent, value: string) => {
  const field = getConclusionField()
  await user.type(field, value)
  return field
}

// restoration action
const getRestorationActionFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.RestorationActionFormItem)

const getRestorationActionField = () =>
  within(getRestorationActionFormItem()).getByPlaceholderText('Введите текст')

const findRestorationActionError = (text: string) =>
  within(getRestorationActionFormItem()).findByText(text)

const setRestorationAction = async (user: UserEvent, value: string) => {
  const field = getRestorationActionField()
  await user.type(field, value)
  return field
}

// restoration cost
const getRestorationCostFormItem = () =>
  within(getContainer()).getByTestId(TestIdsEnum.RestorationCostFormItem)

const getRestorationCostField = () => within(getRestorationCostFormItem()).getByRole('spinbutton')

const findRestorationCostError = (text: string) =>
  within(getRestorationCostFormItem()).findByText(text)

const setRestorationCost = async (user: UserEvent, value: number) => {
  const field = getRestorationCostField()
  await user.type(field, String(value))
  return field
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Сформировать')
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const createEquipmentTechnicalExaminationModalTestUtils = {
  getContainer,
  findContainer,

  getHasMechanicalDamageField,
  clickHasMechanicalDamageField,
  findHasMechanicalDamageError,

  getMalfunctionField,
  findMalfunctionError,
  setMalfunction,

  getConclusionField,
  setConclusion,

  getRestorationActionField,
  findRestorationActionError,
  setRestorationAction,

  getRestorationCostField,
  findRestorationCostError,
  setRestorationCost,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,
}
