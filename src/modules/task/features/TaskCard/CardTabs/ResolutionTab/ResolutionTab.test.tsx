import { screen, within } from '@testing-library/react'

import { TaskTypeEnum } from 'modules/task/constants/common'

import { generateWord, render } from '_tests_/utils'

import ResolutionTab, { ResolutionTabProps } from './index'

const requiredProps: Pick<ResolutionTabProps, 'title' | 'type'> = {
  type: TaskTypeEnum.Request,
  title: generateWord(),
}

const notRequiredProps: Omit<ResolutionTabProps, keyof typeof requiredProps> = {
  techResolution: generateWord(),
  userResolution: generateWord(),
}

const getContainer = () => screen.getByTestId('task-resolution-tab')

const getElementByText = (text: string) =>
  within(getContainer()).getByText(text)

const queryElementByText = (text: string) =>
  within(getContainer()).queryByText(text)

export const testUtils = {
  getContainer,
  getElementByText,
  queryElementByText,
}

describe('Вкладка решение заявки', () => {
  test('Заголовок отображается', () => {
    render(<ResolutionTab {...requiredProps} />)
    expect(testUtils.getElementByText(requiredProps.title)).toBeInTheDocument()
  })

  test('Если все решения отсутствуют, отображается прочерк', () => {
    render(<ResolutionTab {...requiredProps} />)
    expect(testUtils.getElementByText('-')).toBeInTheDocument()
  })

  describe('Техническое решение', () => {
    test('Отображается если присутствует', () => {
      render(
        <ResolutionTab
          {...requiredProps}
          techResolution={notRequiredProps.techResolution}
        />,
      )

      expect(
        testUtils.getElementByText(notRequiredProps.techResolution!),
      ).toBeInTheDocument()
    })

    test('Не отображается если отсутствует', () => {
      render(<ResolutionTab {...requiredProps} />)

      expect(
        testUtils.queryElementByText(notRequiredProps.techResolution!),
      ).not.toBeInTheDocument()
    })
  })

  describe('Решение для пользователя', () => {
    test('Отображается если условия соблюдены', () => {
      render(
        <ResolutionTab
          {...requiredProps}
          userResolution={notRequiredProps.userResolution}
          type={TaskTypeEnum.Request}
        />,
      )

      expect(
        testUtils.getElementByText(notRequiredProps.userResolution!),
      ).toBeInTheDocument()
    })

    test('Не отображается если условия соблюдены но решение отсутствует', () => {
      render(<ResolutionTab {...requiredProps} />)

      expect(
        testUtils.queryElementByText(notRequiredProps.userResolution!),
      ).not.toBeInTheDocument()
    })

    test('Не отображается если условия соблюдены но тип заявки "IncidentTask"', () => {
      render(
        <ResolutionTab
          {...requiredProps}
          userResolution={notRequiredProps.userResolution}
          type={TaskTypeEnum.IncidentTask}
        />,
      )

      expect(
        testUtils.queryElementByText(notRequiredProps.userResolution!),
      ).not.toBeInTheDocument()
    })

    test('Не отображается если условия соблюдены но тип заявки "RequestTask"', () => {
      render(
        <ResolutionTab
          {...requiredProps}
          userResolution={notRequiredProps.userResolution}
          type={TaskTypeEnum.RequestTask}
        />,
      )

      expect(
        testUtils.queryElementByText(notRequiredProps.userResolution!),
      ).not.toBeInTheDocument()
    })
  })
})
