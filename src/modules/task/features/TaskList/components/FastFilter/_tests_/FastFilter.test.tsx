import { render } from '_tests_/utils'

import { FastFilterEnum } from '../../../constants/common'
import { fastFilterNamesDict } from '../constants'
import FastFilter from '../index'
import { filterRequiredProps as requiredProps } from './constants'
import fastFilterTestUtils from './utils'

describe('Быстрый фильтр', () => {
  test('Отображается с правильными названиями', () => {
    render(<FastFilter {...requiredProps} />)

    Object.values(FastFilterEnum).forEach((filter) => {
      const filterName = fastFilterTestUtils.getByTextInCheckableTag(
        filter,
        fastFilterNamesDict[filter],
      )
      expect(filterName).toBeInTheDocument()
    })
  })

  test('Отображается с правильным количеством', () => {
    render(<FastFilter {...requiredProps} />)

    Object.values(FastFilterEnum).forEach((filter) => {
      const taskCount = fastFilterTestUtils.getByTextInCheckableTag(
        filter,
        requiredProps.data![filter.toLowerCase() as Lowercase<FastFilterEnum>],
      )
      expect(taskCount).toBeInTheDocument()
    })
  })

  test('Не отображает количество если возникла ошибка', () => {
    render(<FastFilter {...requiredProps} isError />)

    Object.values(FastFilterEnum).forEach((filter) => {
      const taskCount = fastFilterTestUtils.queryByTextInCheckableTag(
        filter,
        requiredProps.data![filter.toLowerCase() as Lowercase<FastFilterEnum>],
      )
      expect(taskCount).not.toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<FastFilter {...requiredProps} isLoading />)
    await fastFilterTestUtils.loadingStarted()
  })

  test('Обработчик onChange вызывается корректно', async () => {
    const { user } = render(<FastFilter {...requiredProps} />)

    await fastFilterTestUtils.userChangeFilter(user, FastFilterEnum.Free)

    expect(requiredProps.onChange).toBeCalledTimes(1)
    expect(requiredProps.onChange).toHaveBeenCalledWith(FastFilterEnum.Free)
  })

  test('Правильно определяет выбранный элемент', () => {
    const selectedFilter = FastFilterEnum.Mine
    render(<FastFilter {...requiredProps} selectedFilter={selectedFilter} />)

    fastFilterTestUtils.expectFilterChecked(
      fastFilterTestUtils.getCheckableTag(selectedFilter),
    )
  })

  test('Можно сделать не активным', () => {
    render(<FastFilter {...requiredProps} disabled />)
    fastFilterTestUtils.expectAllFiltersDisabled()
  })
})
