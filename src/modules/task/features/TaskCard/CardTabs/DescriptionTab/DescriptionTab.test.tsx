import { screen, within } from '@testing-library/react'

import { generateWord, render } from '_tests_/utils'

import DescriptionTab, { DescriptionTabProps } from './index'

const requiredProps: Pick<DescriptionTabProps, 'title'> = {
  title: generateWord(),
}

const notRequiredProps: Pick<DescriptionTabProps, 'description'> = {
  description: generateWord(),
}

const getContainer = () => screen.getByTestId('task-description-tab')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

export const testUtils = {
  getContainer,
  getChildByText,
  queryChildByText,
}

describe('Вкладка описания заявки', () => {
  test('Заголовок отображается', () => {
    render(<DescriptionTab {...requiredProps} />)

    const title = testUtils.getChildByText(requiredProps.title)
    expect(title).toBeInTheDocument()
  })

  describe('Описание', () => {
    test('Отображается если присутствует', () => {
      render(
        <DescriptionTab
          {...requiredProps}
          description={notRequiredProps.description}
        />,
      )

      const description = testUtils.getChildByText(
        notRequiredProps.description!,
      )
      expect(description).toBeInTheDocument()
    })

    test('Не отображается если отсутствует', () => {
      render(<DescriptionTab {...requiredProps} />)

      const description = testUtils.queryChildByText(
        notRequiredProps.description!,
      )
      expect(description).not.toBeInTheDocument()
    })
  })
})
