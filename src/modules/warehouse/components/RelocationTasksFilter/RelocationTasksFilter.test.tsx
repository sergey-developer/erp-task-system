import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  relocationTaskStatusDict,
  RelocationTaskStatusEnum,
  relocationTaskTypeDict,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'

import { buttonTestUtils, render, selectTestUtils } from '_tests_/utils'

import RelocationTasksFilter from './index'
import { RelocationTasksFilterProps } from './types'

const props: Readonly<RelocationTasksFilterProps> = {
  open: true,

  values: {},
  initialValues: {},

  users: [],
  usersIsLoading: false,

  locations: [],
  locationsIsLoading: false,

  onClose: jest.fn(),
  onApply: jest.fn(),
}

const getContainer = () => screen.getByTestId('relocation-tasks-filter')
const queryContainer = () => screen.queryByTestId('relocation-tasks-filter')
const findContainer = (): Promise<HTMLElement> => screen.findByTestId('relocation-tasks-filter')

// status block
const getStatusBlock = (): HTMLElement => within(getContainer()).getByTestId('status-block')
const getStatusSelect = (): HTMLElement => within(getStatusBlock()).getByTestId('status-select')
const getStatusSelectInput = () => selectTestUtils.getSelect(getStatusSelect())
const openStatusSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getStatusBlock())
const setStatus = selectTestUtils.clickSelectOption

const getSelectedStatus = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getStatusSelect(), title)

const querySelectedStatus = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getStatusSelect(), title)

// type block
const getTypeBlock = (): HTMLElement => within(getContainer()).getByTestId('type-block')
const getTypeSelect = (): HTMLElement => within(getTypeBlock()).getByTestId('type-select')
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeSelect())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeBlock())
const setType = selectTestUtils.clickSelectOption

const getSelectedType = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getTypeSelect(), title)

const querySelectedType = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getTypeSelect(), title)

// reset button
const getResetAllButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сбросить все/)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = buttonTestUtils.getButtonIn(container, /сбросить/i)
  await user.click(button)
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
}

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
}

// apply button
const getApplyButton = () => buttonTestUtils.getButtonIn(getContainer(), /Применить/)

const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  queryContainer,
  findContainer,

  getStatusBlock,
  getStatusSelect,
  getStatusSelectInput,
  openStatusSelect,
  setStatus,
  getSelectedStatus,
  querySelectedStatus,

  getTypeBlock,
  getTypeSelect,
  getTypeSelectInput,
  openTypeSelect,
  setType,
  getSelectedType,
  querySelectedType,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  clickCloseButton,

  getApplyButton,
  clickApplyButton,
}

describe('Фильтр списка заявок на перемещение оборудования', () => {
  describe('Статус', () => {
    test(`Отображается без варианта ${RelocationTaskStatusEnum.Draft}`, async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      const input = testUtils.getStatusSelectInput()
      await testUtils.openStatusSelect(user)
      const draftOption = selectTestUtils.querySelectOption(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Draft],
      )

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(draftOption).not.toBeInTheDocument()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      await testUtils.openStatusSelect(user)
      await testUtils.setStatus(user, relocationTaskStatusDict[RelocationTaskStatusEnum.New])
      await testUtils.setStatus(user, relocationTaskStatusDict[RelocationTaskStatusEnum.Completed])

      const status1 = testUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = testUtils.getSelectedStatus(
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

      const status = testUtils.getSelectedStatus(
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

      await testUtils.openStatusSelect(user)
      await testUtils.setStatus(user, relocationTaskStatusDict[RelocationTaskStatusEnum.Canceled])

      await testUtils.clickResetButtonIn(user, testUtils.getStatusBlock())

      const status1 = testUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = testUtils.querySelectedStatus(
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

      const status1 = testUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )
      const status2 = testUtils.querySelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
    })
  })

  describe('Тип заявки', () => {
    test('Отображается корректно', () => {
      render(<RelocationTasksFilter {...props} />)

      const input = testUtils.getTypeSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      await testUtils.openTypeSelect(user)
      await testUtils.setType(user, relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation])
      await testUtils.setType(user, relocationTaskTypeDict[RelocationTaskTypeEnum.Repair])

      const type1 = testUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      const type2 = testUtils.getSelectedType(relocationTaskTypeDict[RelocationTaskTypeEnum.Repair])

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

      const type = testUtils.getSelectedType(
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

      await testUtils.openTypeSelect(user)
      await testUtils.setType(user, relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation])

      await testUtils.clickResetButtonIn(user, testUtils.getTypeBlock())

      const type1 = testUtils.getSelectedType(relocationTaskTypeDict[RelocationTaskTypeEnum.Repair])
      const type2 = testUtils.querySelectedType(
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

      const type1 = testUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      const type2 = testUtils.querySelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Repair],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })
  })

  describe('Кнопка применить', () => {
    test('Отображается корректно', () => {
      render(<RelocationTasksFilter {...props} />)

      const button = testUtils.getApplyButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)

      await testUtils.clickApplyButton(user)

      expect(props.onApply).toBeCalledTimes(1)
      expect(props.onApply).toBeCalledWith(expect.anything())
    })
  })

  describe('Кнопка сбросить всё', () => {
    test('Отображается корректно', () => {
      render(<RelocationTasksFilter {...props} />)

      const button = testUtils.getResetAllButton()

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

      await testUtils.clickResetAllButton(user)

      const status1 = testUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = testUtils.querySelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )
      const type1 = testUtils.getSelectedType(
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
      )
      const type2 = testUtils.querySelectedType(
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

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RelocationTasksFilter {...props} />)
      await testUtils.clickCloseButton(user)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })
})
