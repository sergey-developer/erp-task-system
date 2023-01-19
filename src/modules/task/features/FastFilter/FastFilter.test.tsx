import { render } from '_tests_/utils'
import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import taskFixtures from 'fixtures/task'
import { NumberOrString } from 'shared/interfaces/utils'

import { FastFilterEnum, fastFilterNamesDict } from './constants'
import FastFilter from './index'
import { FastFilterProps } from './interfaces'

const filterCheckedClass = 'ant-tag-checkable-checked'
const filterDisabledClass = 'ant-tag-checkable--disabled'

const requiredProps: Readonly<FastFilterProps> = {
  data: taskFixtures.getGetTaskCountersResponse(),
  isError: false,
  disabled: false,
  isLoading: false,
  selectedFilter: null,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('filter-fast')

const getFilterTag = () => screen.getByTestId('filter-tag')
const getAllFilterTag = () => screen.getAllByTestId('filter-tag')

const getCheckableTag = (filter: FastFilterEnum) =>
  screen.getByTestId(`checkable-tag-${filter}`)

const getByTextInCheckableTag = (
  filter: FastFilterEnum,
  text: NumberOrString,
) => within(getCheckableTag(filter)).getByText(text)

const queryByTextInCheckableTag = (
  filter: FastFilterEnum,
  text: NumberOrString,
) => within(getCheckableTag(filter)).queryByText(text)

const userChangeFilter = async (
  user: UserEvent,
  filter: FastFilterEnum,
): Promise<HTMLElement> => {
  const tag = getCheckableTag(filter)
  await user.click(tag)
  return tag
}

const expectFilterChecked = (filter: HTMLElement) => {
  expect(filter).toHaveClass(filterCheckedClass)
}

const expectFilterNotChecked = (filter: HTMLElement) => {
  expect(filter).not.toHaveClass(filterCheckedClass)
}

const expectFilterDisabled = (filter: HTMLElement) => {
  expect(filter).toHaveClass(filterDisabledClass)
}

const expectFilterNotDisabled = (filter: HTMLElement) => {
  expect(filter).not.toHaveClass(filterDisabledClass)
}

const loadingStarted = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      // eslint-disable-next-line testing-library/no-node-access
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).toBeInTheDocument()
    })
  })
}

const loadingFinished = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      // eslint-disable-next-line testing-library/no-node-access
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).not.toBeInTheDocument()
    })
  })
}

const expectAllFiltersDisabled = () => {
  Object.values(FastFilterEnum).forEach((filter) => {
    expectFilterDisabled(getCheckableTag(filter))
  })
}

const expectAllFiltersNotDisabled = () => {
  Object.values(FastFilterEnum).forEach((filter) => {
    expectFilterNotDisabled(getCheckableTag(filter))
  })
}

export const testUtils = {
  getContainer,

  getFilterTag,
  getAllFilterTag,

  getCheckableTag,
  getByTextInCheckableTag,
  queryByTextInCheckableTag,

  userChangeFilter,

  loadingStarted,
  loadingFinished,

  expectFilterChecked,
  expectFilterNotChecked,

  expectFilterDisabled,
  expectFilterNotDisabled,
  expectAllFiltersDisabled,
  expectAllFiltersNotDisabled,
}

describe('Быстрый фильтр', () => {
  test('Отображается с правильными названиями', () => {
    render(<FastFilter {...requiredProps} />)

    Object.values(FastFilterEnum).forEach((filter) => {
      const filterName = testUtils.getByTextInCheckableTag(
        filter,
        fastFilterNamesDict[filter],
      )
      expect(filterName).toBeInTheDocument()
    })
  })

  test('Отображается с правильным количеством', () => {
    render(<FastFilter {...requiredProps} />)

    Object.values(FastFilterEnum).forEach((filter) => {
      const taskCount = testUtils.getByTextInCheckableTag(
        filter,
        requiredProps.data![filter.toLowerCase() as Lowercase<FastFilterEnum>],
      )
      expect(taskCount).toBeInTheDocument()
    })
  })

  test('Не отображает количество если возникла ошибка', () => {
    render(<FastFilter {...requiredProps} isError />)

    Object.values(FastFilterEnum).forEach((filter) => {
      const taskCount = testUtils.queryByTextInCheckableTag(
        filter,
        requiredProps.data![filter.toLowerCase() as Lowercase<FastFilterEnum>],
      )
      expect(taskCount).not.toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<FastFilter {...requiredProps} isLoading />)
    await testUtils.loadingStarted()
  })

  test('Обработчик onChange вызывается корректно', async () => {
    const { user } = render(<FastFilter {...requiredProps} />)

    await testUtils.userChangeFilter(user, FastFilterEnum.Free)

    expect(requiredProps.onChange).toBeCalledTimes(1)
    expect(requiredProps.onChange).toHaveBeenCalledWith(FastFilterEnum.Free)
  })

  test('Правильно определяет выбранный элемент', () => {
    const selectedFilter = FastFilterEnum.Mine
    render(<FastFilter {...requiredProps} selectedFilter={selectedFilter} />)

    testUtils.expectFilterChecked(testUtils.getCheckableTag(selectedFilter))
  })

  test('Можно сделать не активным', () => {
    render(<FastFilter {...requiredProps} disabled />)
    testUtils.expectAllFiltersDisabled()
  })
})
