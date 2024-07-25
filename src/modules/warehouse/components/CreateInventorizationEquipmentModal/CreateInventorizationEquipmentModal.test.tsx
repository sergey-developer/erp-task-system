import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { ADD_TEXT, CANCEL_TEXT } from 'shared/constants/common'
import { validationMessages } from 'shared/constants/validation'
import { makeString } from 'shared/utils/string'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { buttonTestUtils, render, selectTestUtils } from '_tests_/utils'

import CreateInventorizationEquipmentModal from './index'
import { CreateInventorizationEquipmentModalProps } from './types'

const props: CreateInventorizationEquipmentModalProps = {
  open: true,
  isLoading: false,

  equipment: undefined,
  equipmentIsLoading: false,
  equipmentCatalog: [],
  equipmentCatalogIsLoading: false,
  onChangeEquipment: jest.fn(),
  onClickCreateEquipment: jest.fn(),

  warehouses: [],

  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('create-inventorization-equipment-modal')
const findContainer = () => screen.findByTestId('create-inventorization-equipment-modal')

// equipment field
const getEquipmentFormItem = () => within(getContainer()).getByTestId('equipment-form-item')
const getEquipmentLabel = () => within(getEquipmentFormItem()).getByLabelText('Оборудование')
const getEquipmentSelectInput = () => selectTestUtils.getSelect(getEquipmentFormItem())

const openEquipmentSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getEquipmentFormItem())

const setEquipment = selectTestUtils.clickSelectOption
const getSelectedEquipment = () => selectTestUtils.getSelectedOption(getEquipmentFormItem())
const findEquipmentError = async (text: string) => within(getEquipmentFormItem()).findByText(text)

const getCreateEquipmentButton = () =>
  buttonTestUtils.getButtonIn(screen.getByTestId('equipment-dropdown'), 'Добавить оборудование')

const clickCreateEquipmentButton = async (user: UserEvent) => user.click(getCreateEquipmentButton())

const expectEquipmentLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getEquipmentFormItem())

// location plan field
const getLocationPlanFormItem = () => within(getContainer()).getByTestId('location-plan-form-item')
const getLocationPlanSelectInput = () => selectTestUtils.getSelect(getLocationPlanFormItem())
const getSelectedLocationPlan = () => selectTestUtils.getSelectedOption(getLocationPlanFormItem())

// location fact field
const getLocationFactFormItem = () => within(getContainer()).getByTestId('location-fact-form-item')
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

export const testUtils = {
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

describe('Модалка создания оборудования для инвентаризации', () => {
  test('Заголовок отображается', () => {
    render(<CreateInventorizationEquipmentModal {...props} />)
    const container = getContainer()
    const title = within(container).getByText('Добавление оборудования')
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка отправки', () => {
    test('Отображается и активна', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)
      const button = testUtils.getSubmitButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При заполнении обязательных полей и клике вызывается обработчик', async () => {
      const warehouseListItem = warehouseFixtures.warehouseListItem()
      const equipmentCatalogListItem = warehouseFixtures.equipmentCatalogListItem()

      const { user } = render(
        <CreateInventorizationEquipmentModal
          {...props}
          equipmentCatalog={[equipmentCatalogListItem]}
          warehouses={[warehouseListItem]}
        />,
      )

      await testUtils.openEquipmentSelect(user)
      await testUtils.setEquipment(
        user,
        makeString(
          ', ',
          equipmentCatalogListItem.title,
          equipmentCatalogListItem.serialNumber,
          equipmentCatalogListItem.inventoryNumber,
        ),
      )

      await testUtils.openLocationFactSelect(user)
      await testUtils.setLocationFact(user, warehouseListItem.title)

      await testUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)
      const button = testUtils.getCancelButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<CreateInventorizationEquipmentModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Поле "Оборудование"', () => {
    test('Отображается и активно', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)

      const selectInput = testUtils.getEquipmentSelectInput()
      const label = testUtils.getEquipmentLabel()
      const selectedOption = testUtils.getSelectedEquipment()

      expect(label).toBeInTheDocument()
      expect(selectedOption).not.toBeInTheDocument()
      expect(selectInput).toBeInTheDocument()
      expect(selectInput).toBeEnabled()
    })

    test('Можно выбрать значение', async () => {
      const equipmentCatalogListItem = warehouseFixtures.equipmentCatalogListItem()

      const { user } = render(
        <CreateInventorizationEquipmentModal
          {...props}
          equipmentCatalog={[equipmentCatalogListItem]}
        />,
      )

      await testUtils.openEquipmentSelect(user)
      await testUtils.setEquipment(
        user,
        makeString(
          ', ',
          equipmentCatalogListItem.title,
          equipmentCatalogListItem.serialNumber,
          equipmentCatalogListItem.inventoryNumber,
        ),
      )

      const selectedOption = testUtils.getSelectedEquipment()
      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<CreateInventorizationEquipmentModal {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findEquipmentError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле "Плановое местонахождение"', () => {
    test('Отображается, не активно, имеет значение из переданного оборудования', () => {
      const equipment = warehouseFixtures.equipment()
      render(<CreateInventorizationEquipmentModal {...props} equipment={equipment} />)

      const selectInput = testUtils.getLocationPlanSelectInput()
      const selectedOption = testUtils.getSelectedLocationPlan()

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(equipment.location!.title)
      expect(selectInput).toBeInTheDocument()
      expect(selectInput).toBeDisabled()
    })
  })

  describe('Поле "Фактическое местонахождение"', () => {
    test('Отображается и активно', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)

      const selectInput = testUtils.getLocationFactSelectInput()
      const label = testUtils.getLocationFactLabel()
      const selectedOption = testUtils.getSelectedLocationFact()

      expect(label).toBeInTheDocument()
      expect(selectedOption).not.toBeInTheDocument()
      expect(selectInput).toBeInTheDocument()
      expect(selectInput).toBeEnabled()
    })

    test('Можно выбрать значение', async () => {
      const warehouseListItem = warehouseFixtures.warehouseListItem()

      const { user } = render(
        <CreateInventorizationEquipmentModal {...props} warehouses={[warehouseListItem]} />,
      )

      await testUtils.openLocationFactSelect(user)
      await testUtils.setLocationFact(user, warehouseListItem.title)

      const selectedOption = testUtils.getSelectedLocationFact()
      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<CreateInventorizationEquipmentModal {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findLocationFactError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })
})
