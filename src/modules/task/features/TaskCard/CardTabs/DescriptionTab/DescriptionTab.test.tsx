import { screen, within } from '@testing-library/react'

import { fakeWord, render } from '_tests_/utils'

import DescriptionTab, { DescriptionTabProps } from './index'

const requiredProps: Readonly<DescriptionTabProps> = {
  title: fakeWord(),
  description: null,
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

  test('Описание отображается если присутствует', () => {
    const description = fakeWord()
    render(<DescriptionTab {...requiredProps} description={description} />)
    expect(testUtils.getChildByText(description)).toBeInTheDocument()
  })
})
