import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import warehouseFixtures from 'fixtures/warehouse'

import {
  mockGetLegalEntityListSuccess,
  mockGetWarehouseListSuccess,
} from '_tests_/mocks/api'
import {
  clickSelectOption,
  expectLoadingFinishedBySelect,
  fakeWord,
  getButtonIn,
  getSelectedOption,
  openSelect,
  render,
  setupApiTests,
} from '_tests_/utils'

import WarehouseListFilter from './index'
import { WarehouseListFilterProps } from './interfaces'

const props: WarehouseListFilterProps = {
  visible: true,
  formValues: {},
  onApply: jest.fn(),
  onClose: jest.fn(),
}

const getContainer = () => screen.getByTestId('warehouse-list-filter')

const findContainer = (): Promise<HTMLElement> =>
  screen.findByTestId('warehouse-list-filter')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// reset button
const getResetAllButton = () => getButtonIn(getContainer(), /Сбросить все/)

const clickResetButtonIn = async (user: UserEvent, container: HTMLElement) => {
  const button = getButtonIn(container, /сбросить/i)
  await user.click(button)
}

const clickResetAllButton = async (user: UserEvent) => {
  const button = getResetAllButton()
  await user.click(button)
}

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const clickCloseFilter = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
}

// apply button
const getApplyButton = () => getButtonIn(getContainer(), /Применить/)

const clickApplyButton = async (user: UserEvent) => {
  const button = getApplyButton()
  await user.click(button)
}

// title
const getTitleFilter = () => within(getContainer()).getByTestId('title-filter')

const getTitleFilterLabel = () =>
  within(getTitleFilter()).getByText('Наименование объекта')

const getTitleInput = () =>
  within(getTitleFilter()).getByPlaceholderText('Ключевое слово')

const setTitle = async (user: UserEvent, value: string) => {
  const input = getTitleInput()
  await user.type(input, value)
  return input
}

const resetTitle = (user: UserEvent) =>
  clickResetButtonIn(user, getTitleFilter())

// legal entity
const getLegalEntityFilter = () =>
  within(getContainer()).getByTestId('legal-entity-filter')

const getLegalEntityFilterLabel = () =>
  within(getLegalEntityFilter()).getByText('Юридическое лицо')

const getLegalEntitySelect = () =>
  within(getLegalEntityFilter()).getByTestId('legal-entity-select')

const openLegalEntitySelect = (user: UserEvent) =>
  openSelect(user, getLegalEntitySelect())

const setLegalEntity = clickSelectOption

const getSelectedLegalEntity = () => getSelectedOption(getLegalEntitySelect())

const resetLegalEntity = (user: UserEvent) =>
  clickResetButtonIn(user, getLegalEntityFilter())

const expectLegalEntityLoadingFinished = async () => {
  const select = getLegalEntitySelect()
  await expectLoadingFinishedBySelect(select)
}

// address
const getAddressFilter = () =>
  within(getContainer()).getByTestId('address-filter')

const getAddressFilterLabel = () =>
  within(getAddressFilter()).getByText('Адрес')

const getAddressInput = () =>
  within(getAddressFilter()).getByPlaceholderText('Ключевое слово')

const setAddress = async (user: UserEvent, value: string) => {
  const input = getAddressInput()
  await user.type(input, value)
  return input
}

const resetAddress = (user: UserEvent) =>
  clickResetButtonIn(user, getAddressFilter())

// parent
const getParentFilter = () =>
  within(getContainer()).getByTestId('parent-filter')

const getParentFilterLabel = () =>
  within(getParentFilter()).getByText('Родительский склад')

const getParentSelect = () =>
  within(getParentFilter()).getByTestId('parent-select')

const openParentSelect = (user: UserEvent) =>
  openSelect(user, getParentSelect())

const setParent = clickSelectOption

const getSelectedParent = () => getSelectedOption(getParentSelect())

const resetParent = (user: UserEvent) =>
  clickResetButtonIn(user, getParentFilter())

const expectParentLoadingFinished = async () => {
  const select = getLegalEntitySelect()
  await expectLoadingFinishedBySelect(select)
}

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getResetAllButton,
  clickResetButtonIn,
  clickResetAllButton,

  getCloseButton,
  clickCloseFilter,

  getApplyButton,
  clickApplyButton,

  getTitleFilter,
  getTitleFilterLabel,
  getTitleInput,
  setTitle,
  resetTitle,

  getLegalEntityFilter,
  getLegalEntityFilterLabel,
  getLegalEntitySelect,
  openLegalEntitySelect,
  setLegalEntity,
  getSelectedLegalEntity,
  resetLegalEntity,
  expectLegalEntityLoadingFinished,

  getAddressFilter,
  getAddressFilterLabel,
  getAddressInput,
  setAddress,
  resetAddress,

  getParentFilter,
  getParentFilterLabel,
  getParentSelect,
  openParentSelect,
  setParent,
  getSelectedParent,
  resetParent,
  expectParentLoadingFinished,
}

setupApiTests()

describe('Фильтр списка складов', () => {
  test('Заголовок отображается корректно', () => {
    mockGetWarehouseListSuccess()
    mockGetLegalEntityListSuccess()

    render(<WarehouseListFilter {...props} />)

    const title = testUtils.getChildByText('Фильтры')
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      render(<WarehouseListFilter {...props} />)

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      await testUtils.clickCloseFilter(user)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })

  describe('Кнопка "Применить"', () => {
    test('Отображается корректно', () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      render(<WarehouseListFilter {...props} />)

      const button = testUtils.getApplyButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      await testUtils.clickApplyButton(user)

      expect(props.onApply).toBeCalledTimes(1)
      expect(props.onApply).toBeCalledWith(expect.anything())
    })
  })

  describe('Кнопка "Сбросить всё"', () => {
    test('Отображается корректно', () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      render(<WarehouseListFilter {...props} />)

      const button = testUtils.getResetAllButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Сбрасывает значения полей', async () => {
      const warehouseListItem = warehouseFixtures.warehouseListItem()
      mockGetWarehouseListSuccess({ body: [warehouseListItem] })
      mockGetLegalEntityListSuccess()

      const titleValue = fakeWord()
      const addressValue = fakeWord()

      const { user } = render(
        <WarehouseListFilter
          {...props}
          formValues={{
            title: titleValue,
            address: addressValue,
            parent: warehouseListItem.id,
          }}
        />,
      )

      await testUtils.clickResetAllButton(user)

      expect(testUtils.getTitleInput()).not.toHaveDisplayValue(titleValue)
      expect(testUtils.getAddressInput()).not.toHaveDisplayValue(addressValue)
      expect(testUtils.getSelectedParent()).not.toBeInTheDocument()
      // expect(testUtils.getSelectedLegalEntity()).not.toBeInTheDocument()
    })
  })

  describe('Наименование объекта', () => {
    test('Отображается корректно', () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      render(<WarehouseListFilter {...props} />)

      const label = testUtils.getTitleFilterLabel()
      const input = testUtils.getTitleInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      const value = fakeWord()
      const input = await testUtils.setTitle(user, value)

      expect(input).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()
      const titleValue = fakeWord()

      render(
        <WarehouseListFilter {...props} formValues={{ title: titleValue }} />,
      )

      const input = testUtils.getTitleInput()
      expect(input).toHaveDisplayValue(titleValue)
    })

    test('Можно сбросить значение', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      const value = fakeWord()
      await testUtils.setTitle(user, value)
      await testUtils.resetTitle(user)
      const input = testUtils.getTitleInput()

      expect(input).not.toHaveDisplayValue(value)
    })
  })

  describe('Юридическое лицо', () => {
    test('Отображается корректно', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      render(<WarehouseListFilter {...props} />)

      await testUtils.expectLegalEntityLoadingFinished()
      const label = testUtils.getLegalEntityFilterLabel()
      const select = testUtils.getLegalEntitySelect()
      const selectedLegalEntity = testUtils.getSelectedLegalEntity()

      expect(label).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
      expect(selectedLegalEntity).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const legalEntityListItem = warehouseFixtures.legalEntityListItem()
      mockGetLegalEntityListSuccess({ body: [legalEntityListItem] })
      mockGetWarehouseListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      await testUtils.expectLegalEntityLoadingFinished()
      await testUtils.openLegalEntitySelect(user)
      await testUtils.setLegalEntity(user, legalEntityListItem.title)
      const selectedLegalEntity = testUtils.getSelectedLegalEntity()

      expect(selectedLegalEntity).toBeInTheDocument()
      expect(selectedLegalEntity).toHaveTextContent(legalEntityListItem.title)
    })

    test('Можно установить значение по умолчанию', async () => {
      const legalEntityListItem = warehouseFixtures.legalEntityListItem()
      mockGetLegalEntityListSuccess({ body: [legalEntityListItem] })
      mockGetWarehouseListSuccess()

      render(
        <WarehouseListFilter
          {...props}
          formValues={{ legalEntity: legalEntityListItem.id }}
        />,
      )

      await testUtils.expectLegalEntityLoadingFinished()
      const selectedLegalEntity = testUtils.getSelectedLegalEntity()

      expect(selectedLegalEntity).toBeInTheDocument()
      expect(selectedLegalEntity).toHaveTextContent(legalEntityListItem.title)
    })

    test('Можно сбросить значение', async () => {
      const legalEntityListItem = warehouseFixtures.legalEntityListItem()
      mockGetLegalEntityListSuccess({ body: [legalEntityListItem] })
      mockGetWarehouseListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      await testUtils.expectLegalEntityLoadingFinished()
      await testUtils.openLegalEntitySelect(user)
      await testUtils.setLegalEntity(user, legalEntityListItem.title)
      await testUtils.resetLegalEntity(user)
      const selectedLegalEntity = testUtils.getSelectedLegalEntity()

      expect(selectedLegalEntity).not.toBeInTheDocument()
    })
  })

  describe('Адрес', () => {
    test('Отображается корректно', () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      render(<WarehouseListFilter {...props} />)

      const label = testUtils.getAddressFilterLabel()
      const input = testUtils.getAddressInput()

      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(input).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      const value = fakeWord()
      const input = await testUtils.setAddress(user, value)

      expect(input).toHaveDisplayValue(value)
    })

    test('Можно установить значение по умолчанию', () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()
      const addressValue = fakeWord()

      render(
        <WarehouseListFilter
          {...props}
          formValues={{ address: addressValue }}
        />,
      )

      const input = testUtils.getAddressInput()
      expect(input).toHaveDisplayValue(addressValue)
    })

    test('Можно сбросить значение', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      const value = fakeWord()
      await testUtils.setAddress(user, value)
      await testUtils.resetAddress(user)
      const input = testUtils.getAddressInput()

      expect(input).not.toHaveDisplayValue(value)
    })
  })

  describe('Родительский склад', () => {
    test('Отображается корректно', async () => {
      mockGetWarehouseListSuccess()
      mockGetLegalEntityListSuccess()

      render(<WarehouseListFilter {...props} />)

      await testUtils.expectParentLoadingFinished()
      const label = testUtils.getParentFilterLabel()
      const select = testUtils.getParentSelect()
      const selectedParent = testUtils.getSelectedParent()

      expect(label).toBeInTheDocument()
      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
      expect(selectedParent).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const warehouseListItem = warehouseFixtures.warehouseListItem()
      mockGetWarehouseListSuccess({ body: [warehouseListItem] })
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      await testUtils.expectParentLoadingFinished()
      await testUtils.openParentSelect(user)
      await testUtils.setParent(user, warehouseListItem.title)
      const selectedParent = testUtils.getSelectedParent()

      expect(selectedParent).toBeInTheDocument()
      expect(selectedParent).toHaveTextContent(warehouseListItem.title)
    })

    test('Можно установить значение по умолчанию', async () => {
      const warehouseListItem = warehouseFixtures.warehouseListItem()
      mockGetWarehouseListSuccess({ body: [warehouseListItem] })
      mockGetLegalEntityListSuccess()

      render(
        <WarehouseListFilter
          {...props}
          formValues={{ parent: warehouseListItem.id }}
        />,
      )

      await testUtils.expectParentLoadingFinished()
      const selectedParent = testUtils.getSelectedParent()

      expect(selectedParent).toBeInTheDocument()
      expect(selectedParent).toHaveTextContent(warehouseListItem.title)
    })

    test('Можно сбросить значение', async () => {
      const warehouseListItem = warehouseFixtures.warehouseListItem()
      mockGetWarehouseListSuccess({ body: [warehouseListItem] })
      mockGetLegalEntityListSuccess()

      const { user } = render(<WarehouseListFilter {...props} />)

      await testUtils.expectParentLoadingFinished()
      await testUtils.openParentSelect(user)
      await testUtils.setParent(user, warehouseListItem.title)
      await testUtils.resetParent(user)
      const selectedParent = testUtils.getSelectedParent()

      expect(selectedParent).not.toBeInTheDocument()
    })
  })
})
