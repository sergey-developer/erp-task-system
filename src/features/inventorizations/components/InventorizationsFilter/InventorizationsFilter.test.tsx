import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/inventorizations/api/constants'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'features/inventorizations/constants'

import { props } from '_tests_/features/warehouses/components/InventorizationsFilter/constants'
import { inventorizationsFilterTestUtils } from '_tests_/features/warehouses/components/InventorizationsFilter/testUtils'
import { render } from '_tests_/helpers'

import InventorizationsFilter from './index'

describe('Фильтр списка заявок на перемещение оборудования', () => {
  describe('Статус', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const input = inventorizationsFilterTestUtils.getStatusSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)

      await inventorizationsFilterTestUtils.openStatusSelect(user)
      await inventorizationsFilterTestUtils.setStatus(
        user,
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      await inventorizationsFilterTestUtils.setStatus(
        user,
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )

      const status1 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      const status2 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <InventorizationsFilter
          {...props}
          initialValues={{ statuses: [InventorizationStatusEnum.New] }}
        />,
      )

      const status = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )

      expect(status).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <InventorizationsFilter
          {...props}
          initialValues={{ statuses: [InventorizationStatusEnum.New] }}
        />,
      )

      await inventorizationsFilterTestUtils.openStatusSelect(user)
      await inventorizationsFilterTestUtils.setStatus(
        user,
        inventorizationStatusDict[InventorizationStatusEnum.Canceled],
      )

      await inventorizationsFilterTestUtils.clickResetButtonIn(
        user,
        inventorizationsFilterTestUtils.getStatusBlock(),
      )

      const status1 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      const status2 = inventorizationsFilterTestUtils.querySelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Canceled],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <InventorizationsFilter
          {...props}
          initialValues={{ statuses: [InventorizationStatusEnum.New] }}
          values={{ statuses: [InventorizationStatusEnum.Completed] }}
        />,
      )

      const status1 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )
      const status2 = inventorizationsFilterTestUtils.querySelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
    })
  })

  describe('Тип', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const input = inventorizationsFilterTestUtils.getTypeSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)

      await inventorizationsFilterTestUtils.openTypeSelect(user)
      await inventorizationsFilterTestUtils.setType(
        user,
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      await inventorizationsFilterTestUtils.setType(
        user,
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )

      const type1 = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      const type2 = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <InventorizationsFilter
          {...props}
          initialValues={{ types: [InventorizationTypeEnum.Internal] }}
        />,
      )

      const type = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )

      expect(type).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <InventorizationsFilter
          {...props}
          initialValues={{ types: [InventorizationTypeEnum.Internal] }}
        />,
      )

      await inventorizationsFilterTestUtils.openTypeSelect(user)
      await inventorizationsFilterTestUtils.setType(
        user,
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )

      await inventorizationsFilterTestUtils.clickResetButtonIn(
        user,
        inventorizationsFilterTestUtils.getTypeBlock(),
      )

      const type1 = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      const type2 = inventorizationsFilterTestUtils.querySelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <InventorizationsFilter
          {...props}
          initialValues={{ types: [InventorizationTypeEnum.Internal] }}
          values={{ types: [InventorizationTypeEnum.External] }}
        />,
      )

      const type1 = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )
      const type2 = inventorizationsFilterTestUtils.querySelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })
  })

  describe('Кнопка применить', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const button = inventorizationsFilterTestUtils.getApplyButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)

      await inventorizationsFilterTestUtils.clickApplyButton(user)

      expect(props.onApply).toBeCalledTimes(1)
      expect(props.onApply).toBeCalledWith(expect.anything())
    })
  })

  describe('Кнопка сбросить всё', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const button = inventorizationsFilterTestUtils.getResetAllButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Сбрасывает значения полей', async () => {
      const { user } = render(
        <InventorizationsFilter
          {...props}
          initialValues={{
            statuses: [InventorizationStatusEnum.New],
            types: [InventorizationTypeEnum.Internal],
          }}
          values={{
            statuses: [InventorizationStatusEnum.Completed],
            types: [InventorizationTypeEnum.External],
          }}
        />,
      )

      await inventorizationsFilterTestUtils.clickResetAllButton(user)

      const status1 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      const status2 = inventorizationsFilterTestUtils.querySelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )
      const type1 = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      const type2 = inventorizationsFilterTestUtils.querySelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })
  })

  describe('Кнопка закрытия', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const button = inventorizationsFilterTestUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)
      await inventorizationsFilterTestUtils.clickCloseButton(user)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })
})
