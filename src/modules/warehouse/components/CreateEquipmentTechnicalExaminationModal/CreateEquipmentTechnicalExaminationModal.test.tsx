import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { CANCEL_TEXT } from 'shared/constants/common'
import { yesNoOptions } from 'shared/constants/selectField'
import { validationMessages } from 'shared/constants/validation'

import { buttonTestUtils, fakeInteger, fakeWord, radioButtonTestUtils, render } from '_tests_/utils'

import CreateEquipmentTechnicalExaminationModal from './index'
import { CreateEquipmentTechnicalExaminationModalProps } from './types'

const props: CreateEquipmentTechnicalExaminationModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-equipment-technical-examination-modal')
const findContainer = () => screen.findByTestId('create-equipment-technical-examination-modal')

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
const getMalfunctionFormItem = () => within(getContainer()).getByTestId('malfunction-form-item')

const getMalfunctionField = () =>
  within(getMalfunctionFormItem()).getByPlaceholderText('Введите текст')

const findMalfunctionError = (text: string) => within(getMalfunctionFormItem()).findByText(text)

const setMalfunction = async (user: UserEvent, value: string) => {
  const field = getMalfunctionField()
  await user.type(field, value)
  return field
}

// conclusion field
const getConclusionFormItem = () => within(getContainer()).getByTestId('conclusion-form-item')

const getConclusionField = () =>
  within(getConclusionFormItem()).getByPlaceholderText('Введите текст')

const setConclusion = async (user: UserEvent, value: string) => {
  const field = getConclusionField()
  await user.type(field, value)
  return field
}

// restoration action
const getRestorationActionFormItem = () =>
  within(getContainer()).getByTestId('restoration-action-form-item')

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
  within(getContainer()).getByTestId('restoration-cost-form-item')

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

export const testUtils = {
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

describe('Модалка создания акта технической экспертизы оборудования', () => {
  test('Заголовок и кнопки в футере отображаются верно', () => {
    render(<CreateEquipmentTechnicalExaminationModal {...props} />)

    const title = within(getContainer()).getByText('Данные АТЭ')
    const submitButton = testUtils.getSubmitButton()
    const cancelButton = testUtils.getCancelButton()

    expect(title).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()
  })

  describe('Поле - Причина неисправности', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = testUtils.getMalfunctionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeWord()
      const field = await testUtils.setMalfunction(user, value)
      expect(field).toHaveDisplayValue(value)
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)

      await testUtils.clickSubmitButton(user)

      const error = await testUtils.findMalfunctionError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Имеются следы механического повреждения', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = testUtils.getHasMechanicalDamageField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = await testUtils.clickHasMechanicalDamageField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findHasMechanicalDamageError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Для устранения неисправности необходимо', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = testUtils.getRestorationActionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeWord()
      const field = await testUtils.setRestorationAction(user, value)
      expect(field).toHaveDisplayValue(value)
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findRestorationActionError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Стоимость восстановления', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = testUtils.getRestorationCostField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeInteger()
      const field = await testUtils.setRestorationCost(user, value)
      expect(field).toHaveDisplayValue(String(value))
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findRestorationCostError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Заключение комиссии', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = testUtils.getConclusionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeWord()
      const field = await testUtils.setConclusion(user, value)
      expect(field).toHaveDisplayValue(value)
    })
  })
})
