import { screen, within } from '@testing-library/react'

import { TaskTypeEnum } from 'modules/task/constants/common'

import { fakeWord, render } from '_tests_/utils'

import ResolutionTab, { ResolutionTabProps } from './index'

const requiredProps: Pick<
  ResolutionTabProps,
  'title' | 'type' | 'techResolution' | 'userResolution' | 'attachments'
> = {
  type: TaskTypeEnum.Request,
  title: fakeWord(),
  techResolution: null,
  userResolution: null,
  attachments: [],
}

const getContainer = () => screen.getByTestId('task-resolution-tab')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

export const testUtils = {
  getContainer,
  getChildByText,
  queryChildByText,
}

describe('Вкладка решение заявки', () => {
  test('Заголовок отображается', () => {
    render(<ResolutionTab {...requiredProps} />)
    expect(testUtils.getChildByText(requiredProps.title)).toBeInTheDocument()
  })

  test('Если все решения отсутствуют, отображается прочерк', () => {
    render(<ResolutionTab {...requiredProps} />)
    expect(testUtils.getChildByText('-')).toBeInTheDocument()
  })

  test('Техническое решение отображается если присутствует', () => {
    const techResolution = fakeWord()
    render(<ResolutionTab {...requiredProps} techResolution={techResolution} />)

    expect(testUtils.getChildByText('Техническое решение')).toBeInTheDocument()
    expect(testUtils.getChildByText(techResolution)).toBeInTheDocument()
  })

  describe('Решение для пользователя', () => {
    test('Отображается если условия соблюдены', () => {
      const userResolution = fakeWord()
      render(
        <ResolutionTab
          {...requiredProps}
          type={TaskTypeEnum.Request}
          userResolution={userResolution}
        />,
      )

      expect(
        testUtils.getChildByText('Решение для пользователя'),
      ).toBeInTheDocument()

      expect(testUtils.getChildByText(userResolution)).toBeInTheDocument()
    })

    test('Не отображается если условия соблюдены но тип заявки "IncidentTask"', () => {
      const userResolution = fakeWord()
      render(
        <ResolutionTab
          {...requiredProps}
          type={TaskTypeEnum.IncidentTask}
          userResolution={userResolution}
        />,
      )

      expect(testUtils.queryChildByText(userResolution)).not.toBeInTheDocument()
    })

    test('Не отображается если условия соблюдены но тип заявки "RequestTask"', () => {
      const userResolution = fakeWord()
      render(
        <ResolutionTab
          {...requiredProps}
          type={TaskTypeEnum.RequestTask}
          userResolution={userResolution}
        />,
      )

      expect(testUtils.queryChildByText(userResolution)).not.toBeInTheDocument()
    })
  })
})
