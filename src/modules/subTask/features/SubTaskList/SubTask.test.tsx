import { getButtonIn, render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { taskFixtures } from 'fixtures/task'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/features/TaskAssignee/TaskAssignee.test'
import taskStatusTestUtils from 'modules/task/features/TaskStatus/_tests_/utils'

import SubTask, { SubTaskProps } from './SubTask'

const subTask = taskFixtures.getSubTask()

const requiredProps: Pick<
  SubTaskProps,
  | 'id'
  | 'title'
  | 'status'
  | 'createdAt'
  | 'workGroupName'
  | 'showReworkBtn'
  | 'onClickRework'
  | 'showCancelBtn'
  | 'onClickCancel'
> = {
  id: subTask.id,
  title: subTask.title,
  status: subTask.status,
  createdAt: subTask.createdAt,
  workGroupName: subTask.workGroup.name,
  showCancelBtn: false,
  onClickCancel: jest.fn(),
  showReworkBtn: false,
  onClickRework: jest.fn(),
}

const notRequiredProps: Omit<SubTaskProps, keyof typeof requiredProps> = {
  recordId: subTask.recordId,
  description: subTask.description,
  techResolution: subTask.techResolution,
  olaNextBreachTime: subTask.olaNextBreachTime,
  externalAssigneeName: subTask.externalAssigneeName,
  externalAssigneePhone: subTask.externalAssigneePhone,
}

const getContainer = () => screen.getByTestId('sub-task-list-item')
const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

const getDescriptionButton = () =>
  getButtonIn(getContainer(), /подробное описание/i)

const userClickDescriptionButton = async (user: UserEvent) => {
  const button = getDescriptionButton()
  await user.click(button)
  return button
}

const testUtils = {
  getContainer,
  getChildByText,
  queryChildByText,

  getDescriptionButton,
  userClickDescriptionButton,
}

describe('Подзадача', () => {
  test('Отображает "recordId"', () => {
    render(<SubTask {...requiredProps} recordId={notRequiredProps.recordId} />)

    expect(
      testUtils.getChildByText(notRequiredProps.recordId!),
    ).toBeInTheDocument()
  })

  test('Отображает "olaNextBreachTime"', () => {
    render(
      <SubTask
        {...requiredProps}
        olaNextBreachTime={notRequiredProps.olaNextBreachTime}
      />,
    )

    expect(
      testUtils.getChildByText(`до ${notRequiredProps.olaNextBreachTime!}`),
    ).toBeInTheDocument()
  })

  test('Отображает заголовок', () => {
    render(<SubTask {...requiredProps} />)
    expect(testUtils.getChildByText(requiredProps.title)).toBeInTheDocument()
  })

  test('Отображает статус заявки', () => {
    render(<SubTask {...requiredProps} />)

    expect(
      taskStatusTestUtils.getTaskStatusIn(
        testUtils.getContainer(),
        requiredProps.status,
      ),
    ).toBeInTheDocument()
  })

  test('Отображает дату создания', () => {
    render(<SubTask {...requiredProps} />)

    expect(testUtils.getChildByText(/дата создания/i)).toBeInTheDocument()

    expect(
      testUtils.getChildByText(requiredProps.createdAt),
    ).toBeInTheDocument()
  })

  describe('Техническое решение', () => {
    test('Отображается если статус подзадачи "Завершена"', () => {
      render(
        <SubTask
          {...requiredProps}
          status={TaskStatusEnum.Completed}
          techResolution={notRequiredProps.techResolution}
        />,
      )

      expect(
        testUtils.getChildByText(notRequiredProps.techResolution!),
      ).toBeInTheDocument()
    })

    test('Отображает если статус подзадачи "Закрыта"', () => {
      render(
        <SubTask
          {...requiredProps}
          status={TaskStatusEnum.Closed}
          techResolution={notRequiredProps.techResolution}
        />,
      )

      expect(
        testUtils.getChildByText(notRequiredProps.techResolution!),
      ).toBeInTheDocument()
    })

    test('Не отображается при не верном статусе подзадачи', () => {
      render(
        <SubTask
          {...requiredProps}
          status={TaskStatusEnum.New}
          techResolution={notRequiredProps.techResolution}
        />,
      )

      expect(
        testUtils.queryChildByText(notRequiredProps.techResolution!),
      ).not.toBeInTheDocument()
    })
  })

  test('Отображает рабочую группу', () => {
    render(<SubTask {...requiredProps} />)

    expect(testUtils.getChildByText(/рабочая группа/i)).toBeInTheDocument()

    expect(
      testUtils.getChildByText(requiredProps.workGroupName),
    ).toBeInTheDocument()
  })

  test('Отображает блок исполнителя', () => {
    render(
      <SubTask
        {...requiredProps}
        externalAssigneeName={notRequiredProps.externalAssigneeName}
      />,
    )

    expect(testUtils.getChildByText(/исполнитель/i)).toBeInTheDocument()

    expect(
      taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
    ).toBeInTheDocument()
  })

  describe('Описание', () => {
    test('Кнопка отображается корректно', () => {
      render(
        <SubTask
          {...requiredProps}
          description={notRequiredProps.description}
        />,
      )

      const button = getDescriptionButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Скрыто по умолчанию', () => {
      render(
        <SubTask
          {...requiredProps}
          description={notRequiredProps.description}
        />,
      )

      expect(
        testUtils.queryChildByText(notRequiredProps.description!),
      ).not.toBeInTheDocument()
    })

    test('Можно раскрыть', async () => {
      const { user } = render(
        <SubTask
          {...requiredProps}
          description={notRequiredProps.description}
        />,
      )

      await userClickDescriptionButton(user)

      expect(
        testUtils.getChildByText(notRequiredProps.description!),
      ).toBeInTheDocument()
    })

    test('Можно скрыть', async () => {
      const { user } = render(
        <SubTask
          {...requiredProps}
          description={notRequiredProps.description}
        />,
      )

      await userClickDescriptionButton(user)
      await userClickDescriptionButton(user)

      expect(
        testUtils.queryChildByText(notRequiredProps.description!),
      ).not.toBeInTheDocument()
    })
  })
})
