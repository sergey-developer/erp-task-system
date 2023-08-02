import { screen, within } from '@testing-library/react'

import { TaskTypeEnum } from 'modules/task/constants'
import { testUtils as attachmentListTestUtils } from 'modules/task/components/AttachmentList/AttachmentList.test'

import taskFixtures from 'fixtures/task'

import { fakeWord, render } from '_tests_/utils'

import ResolutionTab, { ResolutionTabProps } from './index'

const props: Readonly<
  Pick<
    ResolutionTabProps,
    'title' | 'type' | 'techResolution' | 'userResolution' | 'attachments'
  >
> = {
  type: TaskTypeEnum.Request,
  title: fakeWord(),
  techResolution: null,
  userResolution: null,
  attachments: [taskFixtures.attachment()],
}

const getContainer = () => screen.getByTestId('task-resolution-tab')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const queryChildByText = (text: string | RegExp) =>
  within(getContainer()).queryByText(text)

export const testUtils = {
  getContainer,
  getChildByText,
  queryChildByText,
}

describe('Вкладка решение заявки', () => {
  test('Заголовок отображается', () => {
    render(<ResolutionTab {...props} />)
    expect(testUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  test('Если все решения отсутствуют, отображается прочерк', () => {
    render(<ResolutionTab {...props} />)
    expect(testUtils.getChildByText('-')).toBeInTheDocument()
  })

  describe('Вложения', () => {
    test('Отображаются если есть', () => {
      render(<ResolutionTab {...props} />)
      const attachments = attachmentListTestUtils.getContainer()
      expect(attachments).toBeInTheDocument()
    })

    test('Не отображаются если их нет', () => {
      render(<ResolutionTab {...props} attachments={[]} />)
      const attachments = attachmentListTestUtils.queryContainer()
      expect(attachments).not.toBeInTheDocument()
    })
  })

  test('Техническое решение отображается если присутствует', () => {
    const techResolution = fakeWord()
    render(<ResolutionTab {...props} techResolution={techResolution} />)

    expect(testUtils.getChildByText('Техническое решение')).toBeInTheDocument()
    expect(testUtils.getChildByText(techResolution)).toBeInTheDocument()
  })

  describe('Решение для пользователя', () => {
    test('Отображается если условия соблюдены', () => {
      const userResolution = fakeWord()
      render(
        <ResolutionTab
          {...props}
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
          {...props}
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
          {...props}
          type={TaskTypeEnum.RequestTask}
          userResolution={userResolution}
        />,
      )

      expect(testUtils.queryChildByText(userResolution)).not.toBeInTheDocument()
    })
  })
})
