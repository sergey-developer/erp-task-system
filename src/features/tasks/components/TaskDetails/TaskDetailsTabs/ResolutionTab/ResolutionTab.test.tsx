import { testUtils as attachmentsTestUtils } from 'features/attachments/components/Attachments/Attachments.test'
import { TaskTypeEnum } from 'features/tasks/api/constants'

import { props } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/ResolutionTab/constants'
import { resolutionTabTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/ResolutionTab/testUtils'
import { fakeWord, render } from '_tests_/helpers'

import ResolutionTab from './index'

describe('Вкладка решение заявки', () => {
  test('Заголовок отображается', () => {
    render(<ResolutionTab {...props} />)
    expect(resolutionTabTestUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  test('Если все решения отсутствуют, отображается прочерк', () => {
    render(<ResolutionTab {...props} />)
    expect(resolutionTabTestUtils.getChildByText('-')).toBeInTheDocument()
  })

  describe('Вложения', () => {
    test('Отображаются если есть', () => {
      render(<ResolutionTab {...props} />)
      const attachments = attachmentsTestUtils.getContainer()
      expect(attachments).toBeInTheDocument()
    })

    test('Не отображаются если их нет', () => {
      render(<ResolutionTab {...props} attachments={[]} />)
      const attachments = attachmentsTestUtils.queryContainer()
      expect(attachments).not.toBeInTheDocument()
    })
  })

  test('Техническое решение отображается если присутствует', () => {
    const techResolution = fakeWord()
    render(<ResolutionTab {...props} techResolution={techResolution} />)

    expect(resolutionTabTestUtils.getChildByText('Техническое решение')).toBeInTheDocument()
    expect(resolutionTabTestUtils.getChildByText(techResolution)).toBeInTheDocument()
  })

  describe('Решение для пользователя', () => {
    test('Отображается если условия соблюдены', () => {
      const userResolution = fakeWord()
      render(
        <ResolutionTab {...props} type={TaskTypeEnum.Request} userResolution={userResolution} />,
      )

      expect(resolutionTabTestUtils.getChildByText('Решение для пользователя')).toBeInTheDocument()

      expect(resolutionTabTestUtils.getChildByText(userResolution)).toBeInTheDocument()
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

      expect(resolutionTabTestUtils.queryChildByText(userResolution)).not.toBeInTheDocument()
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

      expect(resolutionTabTestUtils.queryChildByText(userResolution)).not.toBeInTheDocument()
    })
  })
})
