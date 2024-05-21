import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  inventorizationStatusDict,
  InventorizationStatusEnum,
  inventorizationTypeDict,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'

import { buttonTestUtils, render, selectTestUtils } from '_tests_/utils'

import InventorizationsFilter from './index'
import { InventorizationsFilterProps } from './types'

const props: Readonly<InventorizationsFilterProps> = {
  open: true,

  values: {},
  initialValues: {},

  onClose: jest.fn(),
  onApply: jest.fn(),
}

const getContainer = () => screen.getByTestId('inventorizations-filter')
const queryContainer = () => screen.queryByTestId('inventorizations-filter')
const findContainer = (): Promise<HTMLElement> => screen.findByTestId('inventorizations-filter')

// status block
const getStatusBlock = (): HTMLElement => within(getContainer()).getByTestId('status-block')
const getStatusSelectInput = () => selectTestUtils.getSelect(getStatusBlock())
const openStatusSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getStatusBlock())
const setStatus = selectTestUtils.clickSelectOption

const unSetStatus = async (user: UserEvent, title: string) => {
  const status = getSelectedStatus(title)
  // eslint-disable-next-line testing-library/no-node-access
  const closeIcon = status.querySelector('.ant-select-selection-item-remove')
  if (closeIcon) await user.click(closeIcon)
}

const getSelectedStatus = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getStatusBlock(), title)

const querySelectedStatus = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getStatusBlock(), title)

// type block
const getTypeBlock = (): HTMLElement => within(getContainer()).getByTestId('type-block')
const getTypeSelectInput = () => selectTestUtils.getSelect(getTypeBlock())
const openTypeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getTypeBlock())
const setType = selectTestUtils.clickSelectOption

const getSelectedType = (title: string) =>
  selectTestUtils.getSelectedOptionByTitle(getTypeBlock(), title)

const querySelectedType = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getTypeBlock(), title)

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
  getStatusSelectInput,
  openStatusSelect,
  setStatus,
  unSetStatus,
  getSelectedStatus,
  querySelectedStatus,

  getTypeBlock,
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
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const input = testUtils.getStatusSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)

      await testUtils.openStatusSelect(user)
      await testUtils.setStatus(user, inventorizationStatusDict[InventorizationStatusEnum.New])
      await testUtils.setStatus(
        user,
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )

      const status1 = testUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      const status2 = testUtils.getSelectedStatus(
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

      const status = testUtils.getSelectedStatus(
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

      await testUtils.openStatusSelect(user)
      await testUtils.setStatus(user, inventorizationStatusDict[InventorizationStatusEnum.Canceled])

      await testUtils.clickResetButtonIn(user, testUtils.getStatusBlock())

      const status1 = testUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      const status2 = testUtils.querySelectedStatus(
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

      const status1 = testUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )
      const status2 = testUtils.querySelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).not.toBeInTheDocument()
    })
  })

  describe('Тип заявки', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const input = testUtils.getTypeSelectInput()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Можно выбрать несколько вариантов', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)

      await testUtils.openTypeSelect(user)
      await testUtils.setType(user, inventorizationTypeDict[InventorizationTypeEnum.Internal])
      await testUtils.setType(user, inventorizationTypeDict[InventorizationTypeEnum.External])

      const type1 = testUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      const type2 = testUtils.getSelectedType(
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

      const type = testUtils.getSelectedType(
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

      await testUtils.openTypeSelect(user)
      await testUtils.setType(user, inventorizationTypeDict[InventorizationTypeEnum.External])

      await testUtils.clickResetButtonIn(user, testUtils.getTypeBlock())

      const type1 = testUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      const type2 = testUtils.querySelectedType(
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

      const type1 = testUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )
      const type2 = testUtils.querySelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )

      expect(type1).toBeInTheDocument()
      expect(type2).not.toBeInTheDocument()
    })
  })

  describe('Кнопка применить', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const button = testUtils.getApplyButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)

      await testUtils.clickApplyButton(user)

      expect(props.onApply).toBeCalledTimes(1)
      expect(props.onApply).toBeCalledWith(expect.anything())
    })
  })

  describe('Кнопка сбросить всё', () => {
    test('Отображается', () => {
      render(<InventorizationsFilter {...props} />)

      const button = testUtils.getResetAllButton()

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

      await testUtils.clickResetAllButton(user)

      const status1 = testUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      const status2 = testUtils.querySelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )
      const type1 = testUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      const type2 = testUtils.querySelectedType(
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

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<InventorizationsFilter {...props} />)
      await testUtils.clickCloseButton(user)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })
})
