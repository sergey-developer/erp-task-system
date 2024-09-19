import { camelize } from 'humps'

import { FastFilterEnum, fastFilterNamesDict } from 'modules/task/constants/task'
import { TaskCountersKeys } from 'modules/task/models'
import { UserPermissionsEnum } from 'modules/user/constants'

import { props } from '_tests_/features/tasks/FastFilters/constants'
import { fastFilterListTestUtils } from '_tests_/features/tasks/FastFilters/testUtils'
import { render } from '_tests_/utils'

import { fastFiltersConfig } from './config'
import FastFilters from './index'

describe('Быстрый фильтр', () => {
  test('Отображает фильтры не требующие прав', () => {
    render(<FastFilters {...props} />)

    props.config.forEach(({ filter }) => {
      const filterEl = fastFilterListTestUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
      const taskCount = fastFilterListTestUtils.getByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.getByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.getByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.queryByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.queryByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.getByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.getByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.getByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.queryByTextInCheckableTag(
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

        const filterEl = fastFilterListTestUtils.queryByTextInCheckableTag(filter, fastFilterNamesDict[filter])
        const taskCount = fastFilterListTestUtils.queryByTextInCheckableTag(
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
      const taskCount = fastFilterListTestUtils.queryByTextInCheckableTag(
        filter,
        props.counters![camelize(filter.toLowerCase()) as TaskCountersKeys],
      )
      expect(taskCount).not.toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<FastFilters {...props} isLoading />)
    await fastFilterListTestUtils.expectLoadingStarted()
  })

  test('Обработчик onChange вызывается корректно', async () => {
    const { user } = render(<FastFilters {...props} />)

    await fastFilterListTestUtils.setFilter(user, FastFilterEnum.Free)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toHaveBeenCalledWith(FastFilterEnum.Free)
  })

  test('Правильно определяет выбранный элемент', () => {
    const selectedFilter = FastFilterEnum.Mine
    render(<FastFilters {...props} selectedFilter={selectedFilter} />)
    fastFilterListTestUtils.expectFilterChecked(fastFilterListTestUtils.getCheckableTag(selectedFilter))
  })

  test('Можно сделать все фильтры не активными', () => {
    render(<FastFilters {...props} disabled />)
    fastFilterListTestUtils.expectAllFiltersDisabled()
  })
})
