import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { camelize } from 'humps'

import { FastFilterEnum, fastFilterNamesDict } from 'modules/task/constants/task'
import { TaskCountersKeys } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import taskFixtures from '_tests_/fixtures/task'
import { render } from '_tests_/utils'

import { fastFiltersConfig } from './constants'
import FastFilterList from './index'
import { FastFilterListProps } from './types'
import { getFastFiltersByRole } from './utils'

const filterCheckedClass = 'ant-tag-checkable-checked'
const filterDisabledClass = 'ant-tag-checkable--disabled'

const props: Readonly<FastFilterListProps> = {
  data: taskFixtures.taskCounters(),
  isShowCounters: true,
  disabled: false,
  isLoading: false,
  selectedFilter: null,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('fast-filter-list')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

const getFilterTag = () => screen.getByTestId('fast-filter-list-item')
const getAllFilterTag = () => screen.getAllByTestId('fast-filter-list-item')

const getCheckableTag = (filter: FastFilterEnum): HTMLElement =>
  screen.getByTestId(`checkable-tag-${filter}`)

const queryCheckableTag = (filter: FastFilterEnum): MaybeNull<HTMLElement> =>
  screen.queryByTestId(`checkable-tag-${filter}`)

const getByTextInCheckableTag = (filter: FastFilterEnum, text: NumberOrString) =>
  within(getCheckableTag(filter)).getByText(text)

const queryByTextInCheckableTag = (filter: FastFilterEnum, text: NumberOrString) =>
  within(getCheckableTag(filter)).queryByText(text)

const setFilter = async (user: UserEvent, filter: FastFilterEnum): Promise<HTMLElement> => {
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

const expectLoadingStarted = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      // eslint-disable-next-line testing-library/no-node-access
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).toBeInTheDocument()
    })
  })
}

const expectLoadingFinished = async () => {
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
  getChildByText,
  queryChildByText,

  getFilterTag,
  getAllFilterTag,

  getCheckableTag,
  queryCheckableTag,
  getByTextInCheckableTag,
  queryByTextInCheckableTag,

  setFilter,

  expectLoadingStarted,
  expectLoadingFinished,

  expectFilterChecked,
  expectFilterNotChecked,

  expectFilterDisabled,
  expectFilterNotDisabled,
  expectAllFiltersDisabled,
  expectAllFiltersNotDisabled,
}

describe('Быстрый фильтр', () => {
  describe(`Для роли ${UserRoleEnum.FirstLineSupport}`, () => {
    const availableFilters = getFastFiltersByRole(UserRoleEnum.FirstLineSupport)
    const notAvailableFilters = getFastFiltersByRole(UserRoleEnum.FirstLineSupport, true)

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.FirstLineSupport} />)

      expect(availableFilters.length).toBeGreaterThan(0)
      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      expect(notAvailableFilters).toHaveLength(0)
    })
  })

  describe(`Для роли ${UserRoleEnum.Engineer}`, () => {
    const availableFilters = getFastFiltersByRole(UserRoleEnum.Engineer)
    const notAvailableFilters = getFastFiltersByRole(UserRoleEnum.Engineer, true)

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.Engineer} />)

      expect(availableFilters.length).toBeGreaterThan(0)
      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      expect(notAvailableFilters.length).toBeGreaterThan(0)
      notAvailableFilters.forEach((filter) => {
        const filterEl = testUtils.queryCheckableTag(filter)
        expect(filterEl).not.toBeInTheDocument()
      })
    })
  })

  describe(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
    const availableFilters = getFastFiltersByRole(UserRoleEnum.SeniorEngineer)
    const notAvailableFilters = getFastFiltersByRole(UserRoleEnum.SeniorEngineer, true)

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.SeniorEngineer} />)

      expect(availableFilters.length).toBeGreaterThan(0)
      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      expect(notAvailableFilters.length).toBeGreaterThan(0)
      notAvailableFilters.forEach((filter) => {
        const filterEl = testUtils.queryCheckableTag(filter)
        expect(filterEl).not.toBeInTheDocument()
      })
    })
  })

  describe(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
    const availableFilters = getFastFiltersByRole(UserRoleEnum.HeadOfDepartment)
    const notAvailableFilters = getFastFiltersByRole(UserRoleEnum.HeadOfDepartment, true)

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

      expect(availableFilters.length).toBeGreaterThan(0)
      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])

        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      expect(notAvailableFilters.length).toBeGreaterThan(0)
      notAvailableFilters.forEach((filter) => {
        const filterEl = testUtils.queryCheckableTag(filter)
        expect(filterEl).not.toBeInTheDocument()
      })
    })
  })

  test('Можно скрыть отображение количества', () => {
    render(
      <FastFilterList {...props} isShowCounters={false} userRole={UserRoleEnum.FirstLineSupport} />,
    )

    fastFiltersConfig.forEach(({ filter }) => {
      const taskCount = testUtils.queryByTextInCheckableTag(
        filter,
        props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
      )
      expect(taskCount).not.toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<FastFilterList {...props} isLoading userRole={UserRoleEnum.FirstLineSupport} />)
    await testUtils.expectLoadingStarted()
  })

  test('Обработчик onChange вызывается корректно', async () => {
    const { user } = render(<FastFilterList {...props} userRole={UserRoleEnum.FirstLineSupport} />)

    await testUtils.setFilter(user, FastFilterEnum.Free)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toHaveBeenCalledWith(FastFilterEnum.Free)
  })

  test('Правильно определяет выбранный элемент', () => {
    const selectedFilter = FastFilterEnum.Mine

    render(
      <FastFilterList
        {...props}
        selectedFilter={selectedFilter}
        userRole={UserRoleEnum.FirstLineSupport}
      />,
    )

    testUtils.expectFilterChecked(testUtils.getCheckableTag(selectedFilter))
  })

  test('Можно сделать все фильтры не активными', () => {
    render(<FastFilterList {...props} disabled userRole={UserRoleEnum.FirstLineSupport} />)
    testUtils.expectAllFiltersDisabled()
  })
})
