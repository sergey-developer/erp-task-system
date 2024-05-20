import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { camelize } from 'humps'

import { FastFilterEnum, fastFilterNamesDict } from 'modules/task/constants/task'
import { TaskCountersKeys } from 'modules/task/models'
import { UserPermissionsEnum } from 'modules/user/constants'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import taskFixtures from '_tests_/fixtures/task'
import { render } from '_tests_/utils'

import { fastFiltersConfig } from './config'
import FastFilters from './index'
import { FastFiltersProps } from './types'

const filterCheckedClass = 'ant-tag-checkable-checked'
const filterDisabledClass = 'ant-tag-checkable--disabled'

const props: Readonly<FastFiltersProps> = {
  config: fastFiltersConfig.filter((c) => !c.canShow),
  permissions: {},
  counters: taskFixtures.taskCounters(),
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

const queryByTextInCheckableTag = (filter: FastFilterEnum, text: NumberOrString) => {
  const tag = queryCheckableTag(filter)
  return tag ? within(tag).queryByText(text) : null
}

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
  fastFiltersConfig
    .filter((c) => !c.canShow)
    .forEach(({ filter }) => {
      expectFilterDisabled(getCheckableTag(filter))
    })
}

const expectAllFiltersNotDisabled = () => {
  fastFiltersConfig
    .filter((c) => !c.canShow)
    .forEach(({ filter }) => {
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
  test('Отображает фильтры не требующие прав', () => {
    render(<FastFilters {...props} />)

    props.config.forEach(({ filter }) => {
      const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
      const taskCount = testUtils.getByTextInCheckableTag(
        filter,
        props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
      )

      expect(filterEl).toBeInTheDocument()
      expect(taskCount).toBeInTheDocument()
    })
  })

  describe(`Фильтр ${FastFilterEnum.FirstLine}`, () => {
    describe(`Отображается`, () => {
      test(`Если есть права ${UserPermissionsEnum.FirstLineTasksRead} и ${UserPermissionsEnum.SecondLineTasksRead} и нету ${UserPermissionsEnum.WorkGroupTasksRead}`, () => {
        const filter = FastFilterEnum.FirstLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: true,
              secondLineTasksRead: true,
              workGroupTasksRead: false,
            }}
          />,
        )

        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      test(`Если есть права ${UserPermissionsEnum.FirstLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead} и нету ${UserPermissionsEnum.SecondLineTasksRead}`, () => {
        const filter = FastFilterEnum.FirstLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: true,
              secondLineTasksRead: false,
              workGroupTasksRead: true,
            }}
          />,
        )

        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })
    })

    describe(`Не отображается`, () => {
      test(`Если есть права ${UserPermissionsEnum.FirstLineTasksRead} но нету ${UserPermissionsEnum.SecondLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead}`, () => {
        const filter = FastFilterEnum.FirstLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: true,
              secondLineTasksRead: false,
              workGroupTasksRead: false,
            }}
          />,
        )

        const filterEl = testUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.queryByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).not.toBeInTheDocument()
        expect(taskCount).not.toBeInTheDocument()
      })

      test(`Если есть права ${UserPermissionsEnum.SecondLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead} но нету ${UserPermissionsEnum.FirstLineTasksRead}`, () => {
        const filter = FastFilterEnum.FirstLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: false,
              secondLineTasksRead: true,
              workGroupTasksRead: true,
            }}
          />,
        )

        const filterEl = testUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.queryByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).not.toBeInTheDocument()
        expect(taskCount).not.toBeInTheDocument()
      })
    })
  })

  describe(`Фильтр ${FastFilterEnum.SecondLine}`, () => {
    describe(`Отображается`, () => {
      test(`Если есть права ${UserPermissionsEnum.FirstLineTasksRead} и ${UserPermissionsEnum.SecondLineTasksRead} и нету ${UserPermissionsEnum.WorkGroupTasksRead}`, () => {
        const filter = FastFilterEnum.SecondLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: true,
              secondLineTasksRead: true,
              workGroupTasksRead: false,
            }}
          />,
        )

        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })

      test(`Если есть права ${UserPermissionsEnum.FirstLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead} и нету ${UserPermissionsEnum.SecondLineTasksRead}`, () => {
        const filter = FastFilterEnum.SecondLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: true,
              secondLineTasksRead: false,
              workGroupTasksRead: true,
            }}
          />,
        )

        const filterEl = testUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.getByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).toBeInTheDocument()
        expect(taskCount).toBeInTheDocument()
      })
    })

    describe(`Не отображается`, () => {
      test(`Если есть права ${UserPermissionsEnum.FirstLineTasksRead} но нету ${UserPermissionsEnum.SecondLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead}`, () => {
        const filter = FastFilterEnum.SecondLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: true,
              secondLineTasksRead: false,
              workGroupTasksRead: false,
            }}
          />,
        )

        const filterEl = testUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.queryByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).not.toBeInTheDocument()
        expect(taskCount).not.toBeInTheDocument()
      })

      test(`Если есть права ${UserPermissionsEnum.SecondLineTasksRead} и ${UserPermissionsEnum.WorkGroupTasksRead} но нету ${UserPermissionsEnum.FirstLineTasksRead}`, () => {
        const filter = FastFilterEnum.SecondLine
        render(
          <FastFilters
            {...props}
            config={fastFiltersConfig.filter((c) => c.canShow)}
            permissions={{
              firstLineTasksRead: false,
              secondLineTasksRead: true,
              workGroupTasksRead: true,
            }}
          />,
        )

        const filterEl = testUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = testUtils.queryByTextInCheckableTag(
          filter,
          props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
        )

        expect(filterEl).not.toBeInTheDocument()
        expect(taskCount).not.toBeInTheDocument()
      })
    })
  })

  test('Можно скрыть отображение количества', () => {
    render(<FastFilters {...props} isShowCounters={false} />)

    props.config.forEach(({ filter }) => {
      const taskCount = testUtils.queryByTextInCheckableTag(
        filter,
        props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
      )
      expect(taskCount).not.toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<FastFilters {...props} isLoading />)
    await testUtils.expectLoadingStarted()
  })

  test('Обработчик onChange вызывается корректно', async () => {
    const { user } = render(<FastFilters {...props} />)

    await testUtils.setFilter(user, FastFilterEnum.Free)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toHaveBeenCalledWith(FastFilterEnum.Free)
  })

  test('Правильно определяет выбранный элемент', () => {
    const selectedFilter = FastFilterEnum.Mine
    render(<FastFilters {...props} selectedFilter={selectedFilter} />)
    testUtils.expectFilterChecked(testUtils.getCheckableTag(selectedFilter))
  })

  test('Можно сделать все фильтры не активными', () => {
    render(<FastFilters {...props} disabled />)
    testUtils.expectAllFiltersDisabled()
  })
})
