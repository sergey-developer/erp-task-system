import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'modules/warehouse/constants/equipment'

import { yesNoOptions } from 'shared/constants/selectField'
import { getBooleanOptions } from 'shared/utils/selectField'

import { props } from '_tests_/features/warehouse/components/EquipmentFilter/constants'
import { equipmentFilterTestUtils } from '_tests_/features/warehouse/components/EquipmentFilter/testUtils'
import { render } from '_tests_/utils'

import EquipmentFilter from './index'

describe('Фильтр списка номенклатуры оборудования', () => {
  describe('Состояние', () => {
    test('Отображается корректно', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      const input = equipmentFilterTestUtils.getConditionsSelectInput()
      const placeholder = equipmentFilterTestUtils.getConditionsPlaceholder()
      await equipmentFilterTestUtils.openConditionsSelect(user)

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await equipmentFilterTestUtils.openConditionsSelect(user)
      await equipmentFilterTestUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      await equipmentFilterTestUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

      const selectedCondition1 = equipmentFilterTestUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      const selectedCondition2 = equipmentFilterTestUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

      expect(selectedCondition1).toBeInTheDocument()
      expect(selectedCondition2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{
            conditions: [EquipmentConditionEnum.Working],
          }}
        />,
      )

      const selectedCondition = equipmentFilterTestUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

      expect(selectedCondition).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter
          {...props}
          initialValues={{
            conditions: [EquipmentConditionEnum.WrittenOff],
          }}
        />,
      )

      await equipmentFilterTestUtils.openConditionsSelect(user)
      await equipmentFilterTestUtils.setCondition(
        user,
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getConditionsBlock(),
      )

      const selectedCondition1 = equipmentFilterTestUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.WrittenOff],
      )
      const selectedCondition2 = equipmentFilterTestUtils.querySelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Working],
      )

      expect(selectedCondition1).toBeInTheDocument()
      expect(selectedCondition2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{
            conditions: [EquipmentConditionEnum.Broken],
          }}
          values={{
            conditions: [EquipmentConditionEnum.NonRepairable],
          }}
        />,
      )

      const selectedCondition1 = equipmentFilterTestUtils.getSelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.NonRepairable],
      )
      const selectedCondition2 = equipmentFilterTestUtils.querySelectedCondition(
        equipmentConditionDict[EquipmentConditionEnum.Broken],
      )

      expect(selectedCondition1).toBeInTheDocument()
      expect(selectedCondition2).not.toBeInTheDocument()
    })
  })

  describe('Местонахождение', () => {
    test('Отображается', () => {
      render(<EquipmentFilter {...props} />)

      const input = equipmentFilterTestUtils.getLocationsSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await equipmentFilterTestUtils.openLocationsSelect(user)
      await equipmentFilterTestUtils.setLocation(user, props.locations[0].title)
      await equipmentFilterTestUtils.setLocation(user, props.locations[1].title)

      const value1 = equipmentFilterTestUtils.getSelectedLocation(props.locations[0].title)
      const value2 = equipmentFilterTestUtils.getSelectedLocation(props.locations[1].title)

      expect(value1).toBeInTheDocument()
      expect(value2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ locations: [props.locations[0].id] }} />)
      const value = equipmentFilterTestUtils.getSelectedLocation(props.locations[0].title)
      expect(value).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ locations: [props.locations[0].id] }} />,
      )

      await equipmentFilterTestUtils.openLocationsSelect(user)
      await equipmentFilterTestUtils.setLocation(user, props.locations[1].title)

      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getLocationsBlock(),
      )

      const value1 = equipmentFilterTestUtils.getSelectedLocation(props.locations[0].title)
      const value2 = equipmentFilterTestUtils.querySelectedCondition(props.locations[1].title)

      expect(value1).toBeInTheDocument()
      expect(value2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ locations: [props.locations[0].id] }}
          values={{ locations: [props.locations[1].id] }}
        />,
      )

      const value1 = equipmentFilterTestUtils.getSelectedLocation(props.locations[1].title)
      const value2 = equipmentFilterTestUtils.querySelectedLocation(props.locations[0].title)

      expect(value1).toBeInTheDocument()
      expect(value2).not.toBeInTheDocument()
    })
  })

  describe('Владелец оборудования', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      const input = equipmentFilterTestUtils.getOwnersSelectInput()
      const placeholder = equipmentFilterTestUtils.getOwnersPlaceholder()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await equipmentFilterTestUtils.openOwnersSelect(user)
      await equipmentFilterTestUtils.setOwner(user, props.owners[0].title)
      await equipmentFilterTestUtils.setOwner(user, props.owners[1].title)

      const selectedOwner1 = equipmentFilterTestUtils.getSelectedOwner(props.owners[0].title)
      const selectedOwner2 = equipmentFilterTestUtils.getSelectedOwner(props.owners[1].title)

      expect(selectedOwner1).toBeInTheDocument()
      expect(selectedOwner2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', async () => {
      const initialOwner = props.owners[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ owners: [initialOwner.id] }} />,
      )

      await equipmentFilterTestUtils.openOwnersSelect(user)
      const selectedOption = equipmentFilterTestUtils.getSelectedOwner(initialOwner.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const initialOwner = props.owners[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ owners: [initialOwner.id] }} />,
      )

      await equipmentFilterTestUtils.openOwnersSelect(user)
      await equipmentFilterTestUtils.setOwner(user, props.owners[0].title)
      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getOwnersBlock(),
      )
      const selectedOption = equipmentFilterTestUtils.getSelectedOwner(initialOwner.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter
          {...props}
          initialValues={{ owners: [props.owners[1].id] }}
          values={{ owners: [props.owners[0].id] }}
        />,
      )

      await equipmentFilterTestUtils.openOwnersSelect(user)
      const selectedOption = equipmentFilterTestUtils.getSelectedOwner(props.owners[0].title)
      expect(selectedOption).toBeInTheDocument()
    })
  })

  describe('Новое', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = equipmentFilterTestUtils.getIsNewField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await equipmentFilterTestUtils.clickIsNewField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ isNew: true }} />)

      const truthyField = equipmentFilterTestUtils.getIsNewField(yesNoOptions[0].label as string)
      const falsyField = equipmentFilterTestUtils.getIsNewField(yesNoOptions[1].label as string)

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ isNew: true }} />)

      const falsyField = await equipmentFilterTestUtils.clickIsNewField(
        user,
        yesNoOptions[1].label as string,
      )
      expect(falsyField).toBeChecked()

      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getIsNewBlock(),
      )
      expect(falsyField).not.toBeChecked()

      const truthyField = equipmentFilterTestUtils.getIsNewField(yesNoOptions[0].label as string)
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter {...props} initialValues={{ isNew: true }} values={{ isNew: false }} />,
      )

      const truthyField = equipmentFilterTestUtils.getIsNewField(yesNoOptions[0].label as string)
      const falsyField = equipmentFilterTestUtils.getIsNewField(yesNoOptions[1].label as string)

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  describe('На гарантии', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = equipmentFilterTestUtils.getIsWarrantyField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await equipmentFilterTestUtils.clickIsWarrantyField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ isWarranty: true }} />)

      const truthyField = equipmentFilterTestUtils.getIsWarrantyField(
        yesNoOptions[0].label as string,
      )
      const falsyField = equipmentFilterTestUtils.getIsWarrantyField(
        yesNoOptions[1].label as string,
      )

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ isWarranty: true }} />)

      const falsyField = await equipmentFilterTestUtils.clickIsWarrantyField(
        user,
        yesNoOptions[1].label as string,
      )
      expect(falsyField).toBeChecked()

      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getIsWarrantyBlock(),
      )
      expect(falsyField).not.toBeChecked()

      const truthyField = equipmentFilterTestUtils.getIsWarrantyField(
        yesNoOptions[0].label as string,
      )
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ isWarranty: true }}
          values={{ isWarranty: false }}
        />,
      )

      const truthyField = equipmentFilterTestUtils.getIsWarrantyField(
        yesNoOptions[0].label as string,
      )
      const falsyField = equipmentFilterTestUtils.getIsWarrantyField(
        yesNoOptions[1].label as string,
      )

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  describe('Отремонтированное', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = equipmentFilterTestUtils.getIsRepairedField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await equipmentFilterTestUtils.clickIsRepairedField(
        user,
        yesNoOptions[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ isRepaired: true }} />)

      const truthyField = equipmentFilterTestUtils.getIsRepairedField(
        yesNoOptions[0].label as string,
      )
      const falsyField = equipmentFilterTestUtils.getIsRepairedField(
        yesNoOptions[1].label as string,
      )

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ isRepaired: true }} />)

      const falsyField = await equipmentFilterTestUtils.clickIsRepairedField(
        user,
        yesNoOptions[1].label as string,
      )
      expect(falsyField).toBeChecked()

      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getIsRepairedBlock(),
      )
      expect(falsyField).not.toBeChecked()

      const truthyField = equipmentFilterTestUtils.getIsRepairedField(
        yesNoOptions[0].label as string,
      )
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ isRepaired: true }}
          values={{ isRepaired: false }}
        />,
      )

      const truthyField = equipmentFilterTestUtils.getIsRepairedField(
        yesNoOptions[0].label as string,
      )
      const falsyField = equipmentFilterTestUtils.getIsRepairedField(
        yesNoOptions[1].label as string,
      )

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  describe('Категория', () => {
    test('Отображается корректно', () => {
      render(<EquipmentFilter {...props} />)

      const input = equipmentFilterTestUtils.getCategoriesSelectInput()
      const placeholder = equipmentFilterTestUtils.getCategoriesPlaceholder()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<EquipmentFilter {...props} />)

      await equipmentFilterTestUtils.openCategoriesSelect(user)
      await equipmentFilterTestUtils.setCategory(user, props.categories[0].title)
      await equipmentFilterTestUtils.setCategory(user, props.categories[1].title)

      const selectedCategory1 = equipmentFilterTestUtils.getSelectedCategory(
        props.categories[0].title,
      )
      const selectedCategory2 = equipmentFilterTestUtils.getSelectedCategory(
        props.categories[1].title,
      )

      expect(selectedCategory1).toBeInTheDocument()
      expect(selectedCategory2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', async () => {
      const initialCategory = props.categories[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ categories: [initialCategory.id] }} />,
      )

      await equipmentFilterTestUtils.openCategoriesSelect(user)
      const selectedOption = equipmentFilterTestUtils.getSelectedCategory(initialCategory.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const initialCategory = props.categories[1]
      const { user } = render(
        <EquipmentFilter {...props} initialValues={{ categories: [initialCategory.id] }} />,
      )

      await equipmentFilterTestUtils.openCategoriesSelect(user)
      await equipmentFilterTestUtils.setCategory(user, props.categories[0].title)
      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getCategoriesBlock(),
      )
      const selectedOption = equipmentFilterTestUtils.getSelectedCategory(initialCategory.title)
      expect(selectedOption).toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', async () => {
      const { user } = render(
        <EquipmentFilter
          {...props}
          initialValues={{ categories: [props.categories[1].id] }}
          values={{ categories: [props.categories[0].id] }}
        />,
      )

      await equipmentFilterTestUtils.openCategoriesSelect(user)
      const selectedOption = equipmentFilterTestUtils.getSelectedCategory(props.categories[0].title)
      expect(selectedOption).toBeInTheDocument()
    })
  })

  test.todo('Стоимость')
  test.todo('Период оприходования')

  describe('Оборудование с остатком 0', () => {
    const options = getBooleanOptions('Отображать', 'Не отображать')

    test('Отображается', () => {
      render(<EquipmentFilter {...props} />)

      options.forEach((opt) => {
        const field = equipmentFilterTestUtils.getZeroQuantityField(opt.label as string)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<EquipmentFilter {...props} />)
      const field = await equipmentFilterTestUtils.clickZeroQuantityField(
        user,
        options[0].label as string,
      )
      expect(field).toBeChecked()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(<EquipmentFilter {...props} initialValues={{ zeroQuantity: true }} />)

      const truthyField = equipmentFilterTestUtils.getZeroQuantityField(options[0].label as string)
      const falsyField = equipmentFilterTestUtils.getZeroQuantityField(options[1].label as string)

      expect(truthyField).toBeChecked()
      expect(falsyField).not.toBeChecked()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(<EquipmentFilter {...props} initialValues={{ zeroQuantity: true }} />)

      const falsyField = await equipmentFilterTestUtils.clickZeroQuantityField(
        user,
        options[1].label as string,
      )
      expect(falsyField).toBeChecked()

      await equipmentFilterTestUtils.clickResetButtonIn(
        user,
        equipmentFilterTestUtils.getZeroQuantityBlock(),
      )
      expect(falsyField).not.toBeChecked()

      const truthyField = equipmentFilterTestUtils.getZeroQuantityField(options[0].label as string)
      expect(truthyField).toBeChecked()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <EquipmentFilter
          {...props}
          initialValues={{ zeroQuantity: true }}
          values={{ zeroQuantity: false }}
        />,
      )

      const truthyField = equipmentFilterTestUtils.getZeroQuantityField(options[0].label as string)
      const falsyField = equipmentFilterTestUtils.getZeroQuantityField(options[1].label as string)

      expect(truthyField).not.toBeChecked()
      expect(falsyField).toBeChecked()
    })
  })

  test.todo('Кнопка применить')
  test.todo('Кнопка сбросить всё')
  test.todo('Кнопка закрытия')
})
