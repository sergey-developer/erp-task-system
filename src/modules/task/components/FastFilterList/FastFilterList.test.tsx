import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { camelize } from 'humps'

import { FastFilterEnum, fastFilterNamesDict } from 'modules/task/constants/task'
import { TaskCountersKeys } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import taskFixtures from '_tests_/fixtures/task'
import { render } from '_tests_/utils'

import { fastFilters } from './constants'
import FastFilterList from './index'
import { FastFilterListProps } from './types'

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
    const availableFilters = [
      FastFilterEnum.FirstLine,
      FastFilterEnum.SecondLine,
      FastFilterEnum.All,
      FastFilterEnum.Mine,
      FastFilterEnum.Free,
      FastFilterEnum.LessOneHour,
      FastFilterEnum.LessThreeHours,
      FastFilterEnum.Overdue,
      FastFilterEnum.Returned,
    ]

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.FirstLineSupport} />)

      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })
    })
  })

  describe(`Для роли ${UserRoleEnum.Engineer}`, () => {
    const availableFilters = [
      FastFilterEnum.All,
      FastFilterEnum.Mine,
      FastFilterEnum.Free,
      FastFilterEnum.LessOneHour,
      FastFilterEnum.LessThreeHours,
      FastFilterEnum.Overdue,
      FastFilterEnum.Returned,
    ]

    const notAvailableFilters = [FastFilterEnum.FirstLine, FastFilterEnum.SecondLine]

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.Engineer} />)

      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      notAvailableFilters.forEach((filter) => {
        const filterEl = testUtils.queryCheckableTag(filter)
        expect(filterEl).not.toBeInTheDocument()
      })
    })
  })

  describe(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
    const availableFilters = [
      FastFilterEnum.All,
      FastFilterEnum.Mine,
      FastFilterEnum.Free,
      FastFilterEnum.LessOneHour,
      FastFilterEnum.LessThreeHours,
      FastFilterEnum.Overdue,
      FastFilterEnum.Returned,
    ]

    const notAvailableFilters = [FastFilterEnum.FirstLine, FastFilterEnum.SecondLine]

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.SeniorEngineer} />)

      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      notAvailableFilters.forEach((filter) => {
        const filterEl = testUtils.queryCheckableTag(filter)
        expect(filterEl).not.toBeInTheDocument()
      })
    })
  })

  describe(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
    const availableFilters = [
      FastFilterEnum.All,
      FastFilterEnum.Mine,
      FastFilterEnum.Free,
      FastFilterEnum.LessOneHour,
      FastFilterEnum.LessThreeHours,
      FastFilterEnum.Overdue,
      FastFilterEnum.Returned,
    ]

    const notAvailableFilters = [FastFilterEnum.FirstLine, FastFilterEnum.SecondLine]

    test('Отображается корректно', () => {
      render(<FastFilterList {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

      availableFilters.forEach((filter) => {
        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])

        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.data![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

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

    fastFilters.forEach(({ filter }) => {
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
