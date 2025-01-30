import {
  relocationTaskStatusDict,
  RelocationTaskStatusEnum,
  relocationTaskTypeDict,
  RelocationTaskTypeEnum,
} from 'features/warehouse/constants/relocationTask'

import { props } from '_tests_/features/warehouse/components/RelocationTasksFilter/constants'
import { relocationTasksFilterTestUtils } from '_tests_/features/warehouse/components/RelocationTasksFilter/testUtils'
import { render, selectTestUtils } from '_tests_/utils'

import RelocationTasksFilter from './index'

describe('Фильтр списка заявок на перемещение оборудования', () => {
  describe('Статус', () => {
    test(`Отображается без варианта ${RelocationTaskStatusEnum.Draft}`, async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      const input = relocationTasksFilterTestUtils.getStatusSelectInput()
      await relocationTasksFilterTestUtils.openStatusSelect(user)
      const draftOption = selectTestUtils.querySelectOption(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Draft],
      )

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(draftOption).not.toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      await relocationTasksFilterTestUtils.openStatusSelect(user)
      await relocationTasksFilterTestUtils.setStatus(
        user,
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      await relocationTasksFilterTestUtils.setStatus(
        user,
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )

      const status1 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <RelocationTasksFilter
          {...props}
          initialValues={{ status: [RelocationTaskStatusEnum.New] }}
        />,
      )

      const status = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )

      expect(status).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <RelocationTasksFilter
          {...props}
          initialValues={{ status: [RelocationTaskStatusEnum.New] }}
        />,
      )

      await relocationTasksFilterTestUtils.openStatusSelect(user)
      await relocationTasksFilterTestUtils.setStatus(
        user,
        relocationTaskStatusDict[RelocationTaskStatusEnum.Canceled],
      )

      await relocationTasksFilterTestUtils.clickResetButtonIn(
        user,
        relocationTasksFilterTestUtils.getStatusBlock(),
      )

      const status1 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = relocationTasksFilterTestUtils.querySelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Canceled],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <RelocationTasksFilter
          {...props}
          initialValues={{ status: [RelocationTaskStatusEnum.New] }}
          values={{ status: [RelocationTaskStatusEnum.Completed] }}
        />,
      )

      const status1 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )
      const status2 = relocationTasksFilterTestUtils.querySelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
    })
  })

  describe('Тип заявки', () => {
    test('Отображается корректно', () => {
      render(<RelocationTasksFilter {...props} />)

      const input = relocationTasksFilterTestUtils.getTypeSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      await relocationTasksFilterTestUtils.openTypeSelect(user)
      await relocationTasksFilterTestUtils.setType(
        user,
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      await relocationTasksFilterTestUtils.setType(
        user,
        relocationTaskTypeDict[RelocationTaskTypeEnum.Repair],
      )

      const type1 = relocationTasksFilterTestUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      const type2 = relocationTasksFilterTestUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Repair],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).toBeInTheDocument()
    })

    test('Устанавливается значение по умолчанию', () => {
      render(
        <RelocationTasksFilter
          {...props}
          initialValues={{ type: [RelocationTaskTypeEnum.Relocation] }}
        />,
      )

      const type = relocationTasksFilterTestUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )

      expect(type).toBeInTheDocument()
    })

    test('Сбрасывается к значению по умолчанию', async () => {
      const { user } = render(
        <RelocationTasksFilter
          {...props}
          initialValues={{ type: [RelocationTaskTypeEnum.Repair] }}
        />,
      )

      await relocationTasksFilterTestUtils.openTypeSelect(user)
      await relocationTasksFilterTestUtils.setType(
        user,
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )

      await relocationTasksFilterTestUtils.clickResetButtonIn(
        user,
        relocationTasksFilterTestUtils.getTypeBlock(),
      )

      const type1 = relocationTasksFilterTestUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Repair],
      )
      const type2 = relocationTasksFilterTestUtils.querySelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })

    test('Переданное значение заменяет значение по умолчанию', () => {
      render(
        <RelocationTasksFilter
          {...props}
          initialValues={{ type: [RelocationTaskTypeEnum.Repair] }}
          values={{ type: [RelocationTaskTypeEnum.Relocation] }}
        />,
      )

      const type1 = relocationTasksFilterTestUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      const type2 = relocationTasksFilterTestUtils.querySelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Repair],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })
  })

  describe('Кнопка применить', () => {
    test('Отображается корректно', () => {
      render(<RelocationTasksFilter {...props} />)

      const button = relocationTasksFilterTestUtils.getApplyButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      await relocationTasksFilterTestUtils.clickApplyButton(user)

      expect(props.onApply).toBeCalledTimes(1)
      expect(props.onApply).toBeCalledWith(expect.anything())
    })
  })

  describe('Кнопка сбросить всё', () => {
    test('Отображается корректно', () => {
      render(<RelocationTasksFilter {...props} />)

      const button = relocationTasksFilterTestUtils.getResetAllButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Сбрасывает значения полей', async () => {
      const { user } = render(
        <RelocationTasksFilter
          {...props}
          initialValues={{
            status: [RelocationTaskStatusEnum.New],
            type: [RelocationTaskTypeEnum.Relocation],
          }}
          values={{
            status: [RelocationTaskStatusEnum.Completed],
            type: [RelocationTaskTypeEnum.Repair],
          }}
        />,
      )

      await relocationTasksFilterTestUtils.clickResetAllButton(user)

      const status1 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = relocationTasksFilterTestUtils.querySelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )
      const type1 = relocationTasksFilterTestUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      const type2 = relocationTasksFilterTestUtils.querySelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Repair],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<RelocationTasksFilter {...props} />)

      const button = relocationTasksFilterTestUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)
      await relocationTasksFilterTestUtils.clickCloseButton(user)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })
})
