import { screen } from '@testing-library/react'
import {
  inventorizationTypeDict,
  InventorizationTypeEnum,
} from 'features/inventorizations/constants'

import { validationMessages } from 'shared/constants/validation'

import { props } from '_tests_/features/warehouse/components/CreateInventorizationRequestModal/constants'
import { createInventorizationRequestModalTestUtils as testUtils } from '_tests_/features/warehouse/components/CreateInventorizationRequestModal/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeWord, iconTestUtils, render, selectTestUtils } from '_tests_/utils'

import CreateInventorizationRequestModal, { nomenclaturesPopoverContent } from './index'

// todo: добавить тесты по другим полям

describe('Модалка создания запроса на инвентаризацию', () => {
  describe('Поле типа', () => {
    test('Отображается, активно, не имеет значения по умолчанию, верно отображает варианты', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      const input = testUtils.getTypeSelectInput()
      await testUtils.openTypeSelect(user)
      const selectedType = testUtils.getSelectedType()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(selectedType).not.toBeInTheDocument()
      Object.keys(inventorizationTypeDict).forEach((key) => {
        const option = selectTestUtils.getSelectOption(
          inventorizationTypeDict[key as InventorizationTypeEnum],
        )
        expect(option).toBeInTheDocument()
      })
    })

    test('Можно выбрать значение', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      await testUtils.openTypeSelect(user)
      await testUtils.setType(user, inventorizationTypeDict[InventorizationTypeEnum.Internal])
      const selectedOption = testUtils.getSelectedType()

      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findTypeError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле описания', () => {
    test('Отображается и активно', () => {
      render(<CreateInventorizationRequestModal {...props} />)
      const field = testUtils.getDescriptionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)
      const value = fakeWord()
      const field = await testUtils.setDescription(user, value)
      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Вложения', () => {
    test('Кнопка отображается и активна', () => {
      render(<CreateInventorizationRequestModal {...props} />)

      const button = testUtils.getAddAttachmentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка работает', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      const { input, file } = await testUtils.setAttachment(user)
      const uploadedFile = testUtils.getUploadedAttachment(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedFile).toBeInTheDocument()
      expect(props.onCreateAttachment).toBeCalledTimes(1)
      expect(props.onCreateAttachment).toBeCalledWith(expect.anything())
    })

    test('Удаление работает', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      const { file } = await testUtils.setAttachment(user)
      await testUtils.clickDeleteAttachmentButton(user)
      const uploadedFile = testUtils.queryUploadedAttachment(file.name)

      expect(uploadedFile).not.toBeInTheDocument()
      expect(props.onDeleteAttachment).toBeCalledTimes(1)
      expect(props.onDeleteAttachment).toBeCalledWith(expect.anything())
    })
  })

  describe('Поле номенклатуры', () => {
    test('Можно выбрать несколько значений', async () => {
      const equipmentNomenclatureListItem1 = warehouseFixtures.equipmentNomenclatureListItem()
      const equipmentNomenclatureListItem2 = warehouseFixtures.equipmentNomenclatureListItem()

      const { user } = render(
        <CreateInventorizationRequestModal
          {...props}
          nomenclatures={[equipmentNomenclatureListItem1, equipmentNomenclatureListItem2]}
        />,
      )

      await testUtils.openNomenclatureSelect(user)
      await testUtils.setNomenclature(user, equipmentNomenclatureListItem1.title)
      await testUtils.setNomenclature(user, equipmentNomenclatureListItem2.title)
      const value1 = testUtils.getSelectedNomenclature(equipmentNomenclatureListItem1.title)
      const value2 = testUtils.getSelectedNomenclature(equipmentNomenclatureListItem2.title)

      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()
    })

    test('Можно выбрать все значения и сбросить их', async () => {
      const equipmentNomenclatureListItem1 = warehouseFixtures.equipmentNomenclatureListItem()
      const equipmentNomenclatureListItem2 = warehouseFixtures.equipmentNomenclatureListItem()

      const { user } = render(
        <CreateInventorizationRequestModal
          {...props}
          nomenclatures={[equipmentNomenclatureListItem1, equipmentNomenclatureListItem2]}
        />,
      )

      await testUtils.openNomenclatureSelect(user)
      await testUtils.setNomenclature(user, 'Выбрать все')
      const value1 = testUtils.getSelectedNomenclature(equipmentNomenclatureListItem1.title)
      const value2 = testUtils.getSelectedNomenclature(equipmentNomenclatureListItem2.title)
      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()

      await testUtils.setNomenclature(user, 'Сбросить все')
      expect(value1).not.toBeInTheDocument()
      expect(value2).not.toBeInTheDocument()
    })

    test('При наведении на иконку отображается текст', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      await testUtils.openNomenclatureSelect(user)
      const icon = iconTestUtils.getIconByNameIn(
        testUtils.getNomenclatureFormItem(),
        'question-circle',
      )
      await user.hover(icon)
      const text = await screen.findByText(nomenclaturesPopoverContent)

      expect(text).toBeInTheDocument()
    })
  })
})
