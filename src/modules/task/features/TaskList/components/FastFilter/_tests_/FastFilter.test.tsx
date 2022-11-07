import { render } from '_tests_/utils'
import { screen } from '@testing-library/react'

import { FastFilterEnum } from '../../../constants/common'
import { fastFilterNamesDict } from '../constants'
import FastFilter from '../index'
import { filterRequiredProps as requiredProps } from './constants'
import fastFilterTestUtils from './utils'

describe('Быстрый фильтр', () => {
  test('Отображается с правильными названиями', () => {
    render(<FastFilter {...requiredProps} />)

    Object.values(fastFilterNamesDict).forEach((name) => {
      const filterName = screen.getByText(name)
      expect(filterName).toBeInTheDocument()
    })
  })

  test('Отображается с правильным количеством', () => {
    render(<FastFilter {...requiredProps} />)

    Object.values(requiredProps.data!).forEach((number) => {
      const taskCount = screen.getByText(number)
      expect(taskCount).toBeInTheDocument()
    })
  })

  test('Не отображает количество если возникла ошибка', () => {
    render(<FastFilter {...requiredProps} isError />)

    Object.values(requiredProps.data!).forEach((number) => {
      const taskCount = screen.queryByText(number)
      expect(taskCount).not.toBeInTheDocument()
    })
  })

  test('Обработчик "onChange" вызывается с правильным значением', async () => {
    const { user } = render(<FastFilter {...requiredProps} />)

    const filterName = screen.getByText(fastFilterNamesDict.FREE)
    await user.click(filterName)

    expect(requiredProps.onChange).toHaveBeenCalledWith(FastFilterEnum.Free)
  })

  test('Правильно определяет выбранный элемент', () => {
    const selectedFilter = FastFilterEnum.All
    render(<FastFilter {...requiredProps} selectedFilter={selectedFilter} />)

    fastFilterTestUtils.expectFilterChecked(
      fastFilterTestUtils.getCheckableTag(selectedFilter),
    )
  })
})
