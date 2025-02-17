import { within } from '@testing-library/react'

import { validationMessages } from 'shared/constants/validation'
import { makeString } from 'shared/utils/string'

import { props } from '_tests_/features/warehouses/components/CreateInventorizationEquipmentModal/constants'
import { createInventorizationEquipmentModalTestUtils } from '_tests_/features/warehouses/components/CreateInventorizationEquipmentModal/testUtils'
import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
import warehousesFixtures from '_tests_/fixtures/api/data/warehouses'
import { render } from '_tests_/helpers'

import CreateInventorizationEquipmentModal from './index'

describe('Модалка создания оборудования для инвентаризации', () => {
  test('Заголовок отображается', () => {
    render(<CreateInventorizationEquipmentModal {...props} />)
    const container = createInventorizationEquipmentModalTestUtils.getContainer()
    const title = within(container).getByText('Добавление оборудования')
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка отправки', () => {
    test('Отображается и активна', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)
      const button = createInventorizationEquipmentModalTestUtils.getSubmitButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При заполнении обязательных полей и клике вызывается обработчик', async () => {
      const warehouseListItem = warehousesFixtures.warehouse()
      const equipmentCatalogListItem = equipmentsFixtures.equipmentCatalogListItem()

      const { user } = render(
        <CreateInventorizationEquipmentModal
          {...props}
          equipments={[equipmentCatalogListItem]}
          warehouses={[warehouseListItem]}
        />,
      )

      await createInventorizationEquipmentModalTestUtils.openEquipmentSelect(user)
      await createInventorizationEquipmentModalTestUtils.setEquipment(
        user,
        makeString(
          ', ',
          equipmentCatalogListItem.title,
          equipmentCatalogListItem.serialNumber,
          equipmentCatalogListItem.inventoryNumber,
        ),
      )

      await createInventorizationEquipmentModalTestUtils.openLocationFactSelect(user)
      await createInventorizationEquipmentModalTestUtils.setLocationFact(
        user,
        warehouseListItem.title,
      )

      await createInventorizationEquipmentModalTestUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)
      const button = createInventorizationEquipmentModalTestUtils.getCancelButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<CreateInventorizationEquipmentModal {...props} />)
      await createInventorizationEquipmentModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Поле "Оборудование"', () => {
    test('Отображается и активно', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)

      const selectInput = createInventorizationEquipmentModalTestUtils.getEquipmentSelectInput()
      const label = createInventorizationEquipmentModalTestUtils.getEquipmentLabel()
      const selectedOption = createInventorizationEquipmentModalTestUtils.getSelectedEquipment()

      expect(label).toBeInTheDocument()
      expect(selectedOption).not.toBeInTheDocument()
      expect(selectInput).toBeInTheDocument()
      expect(selectInput).toBeEnabled()
    })

    test('Можно выбрать значение', async () => {
      const equipmentCatalogListItem = equipmentsFixtures.equipmentCatalogListItem()

      const { user } = render(
        <CreateInventorizationEquipmentModal {...props} equipments={[equipmentCatalogListItem]} />,
      )

      await createInventorizationEquipmentModalTestUtils.openEquipmentSelect(user)
      await createInventorizationEquipmentModalTestUtils.setEquipment(
        user,
        makeString(
          ', ',
          equipmentCatalogListItem.title,
          equipmentCatalogListItem.serialNumber,
          equipmentCatalogListItem.inventoryNumber,
        ),
      )

      const selectedOption = createInventorizationEquipmentModalTestUtils.getSelectedEquipment()
      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<CreateInventorizationEquipmentModal {...props} />)
      await createInventorizationEquipmentModalTestUtils.clickSubmitButton(user)
      const error = await createInventorizationEquipmentModalTestUtils.findEquipmentError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле "Плановое местонахождение"', () => {
    test('Отображается, не активно, имеет значение из переданного оборудования', () => {
      const equipment = equipmentsFixtures.equipmentDetail()
      render(<CreateInventorizationEquipmentModal {...props} equipment={equipment} />)

      const selectInput = createInventorizationEquipmentModalTestUtils.getLocationPlanSelectInput()
      const selectedOption = createInventorizationEquipmentModalTestUtils.getSelectedLocationPlan()

      expect(selectedOption).toBeInTheDocument()
      expect(selectedOption).toHaveTextContent(equipment.location!.title)
      expect(selectInput).toBeInTheDocument()
      expect(selectInput).toBeDisabled()
    })
  })

  describe('Поле "Фактическое местонахождение"', () => {
    test('Отображается и активно', () => {
      render(<CreateInventorizationEquipmentModal {...props} />)

      const selectInput = createInventorizationEquipmentModalTestUtils.getLocationFactSelectInput()
      const label = createInventorizationEquipmentModalTestUtils.getLocationFactLabel()
      const selectedOption = createInventorizationEquipmentModalTestUtils.getSelectedLocationFact()

      expect(label).toBeInTheDocument()
      expect(selectedOption).not.toBeInTheDocument()
      expect(selectInput).toBeInTheDocument()
      expect(selectInput).toBeEnabled()
    })

    test('Можно выбрать значение', async () => {
      const warehouseListItem = warehousesFixtures.warehouse()

      const { user } = render(
        <CreateInventorizationEquipmentModal {...props} warehouses={[warehouseListItem]} />,
      )

      await createInventorizationEquipmentModalTestUtils.openLocationFactSelect(user)
      await createInventorizationEquipmentModalTestUtils.setLocationFact(
        user,
        warehouseListItem.title,
      )

      const selectedOption = createInventorizationEquipmentModalTestUtils.getSelectedLocationFact()
      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<CreateInventorizationEquipmentModal {...props} />)
      await createInventorizationEquipmentModalTestUtils.clickSubmitButton(user)
      const error = await createInventorizationEquipmentModalTestUtils.findLocationFactError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })
})
