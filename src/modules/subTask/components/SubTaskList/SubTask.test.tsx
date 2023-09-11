import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/components/TaskAssignee/TaskAssignee.test'
import { testUtils as taskStatusTestUtils } from 'modules/task/components/TaskStatus/TaskStatus.test'

import subTaskFixtures from '_tests_/fixtures/subTask'
import taskFixtures from '_tests_/fixtures/task'

import { buttonTestUtils, render } from "_tests_/utils";

import SubTask, { SubTaskProps } from './SubTask'

const task = taskFixtures.task()
const subTask = subTaskFixtures.subTask()

const props: Readonly<SubTaskProps> = {
  title: subTask.title,
  status: subTask.status,
  taskExtendedStatus: task.extendedStatus,
  createdAt: subTask.createdAt,
  supportGroup: null,
  onClickCancel: jest.fn(),
  onClickRework: jest.fn(),
  taskStatus: TaskStatusEnum.New,
  currentUserIsTaskAssignee: false,
  returnReason: null,
  cancelReason: null,
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
  recordId: subTask.recordId,
  description: subTask.description,
  techResolution: subTask.techResolution,
  olaNextBreachTime: subTask.olaNextBreachTime,
  externalAssigneeName: subTask.externalAssigneeName,
  externalAssigneePhone: subTask.externalAssigneePhone,
}

export const activeReworkButtonProps: Pick<
  SubTaskProps,
  'currentUserIsTaskAssignee' | 'status' | 'taskStatus' | 'taskExtendedStatus'
> = {
  currentUserIsTaskAssignee: true,
  status: TaskStatusEnum.Completed,
  taskStatus: TaskStatusEnum.New,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
}

export const activeCancelButtonProps: Pick<
  SubTaskProps,
  'currentUserIsTaskAssignee' | 'status' | 'taskStatus' | 'taskExtendedStatus'
> = {
  currentUserIsTaskAssignee: true,
  status: TaskStatusEnum.New,
  taskStatus: TaskStatusEnum.New,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
}

const getContainer = () => screen.getByTestId('sub-task-list-item')

const getAllContainerIn = (container: HTMLElement) =>
  within(container).getAllByTestId('sub-task-list-item')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

// tech resolution button
const getTechResolutionButton = () => buttonTestUtils.getButtonIn(getContainer(), /решение/i)

const queryTechResolutionButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /решение/i)

const clickTechResolutionButton = async (user: UserEvent) => {
  const button = getTechResolutionButton()
  await user.click(button)
  return button
}

// return reason button
const getReturnReasonButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /причина возврата/i)

const queryReturnReasonButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /причина возврата/i)

const clickReturnReasonButton = async (user: UserEvent) => {
  const button = getReturnReasonButton()
  await user.click(button)
  return button
}

// cancel reason button
const getCancelReasonButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /причина отмены/i)

const queryCancelReasonButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /причина отмены/i)

const clickCancelReasonButton = async (user: UserEvent) => {
  const button = getCancelReasonButton()
  await user.click(button)
  return button
}

// description button
const getDescriptionButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /подробное описание/i)

const clickDescriptionButton = async (user: UserEvent) => {
  const button = getDescriptionButton()
  await user.click(button)
  return button
}

// rework button
const getReworkButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /вернуть на доработку/i)

const queryReworkButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /вернуть на доработку/i)

const clickReworkButton = async (user: UserEvent) => {
  const button = getReworkButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)

const queryCancelButton = () => buttonTestUtils.queryButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  getAllContainerIn,
  getChildByText,
  queryChildByText,

  getTechResolutionButton,
  queryTechResolutionButton,
  clickTechResolutionButton,

  getReturnReasonButton,
  queryReturnReasonButton,
  clickReturnReasonButton,

  getCancelReasonButton,
  queryCancelReasonButton,
  clickCancelReasonButton,

  getDescriptionButton,
  clickDescriptionButton,

  getReworkButton,
  queryReworkButton,
  clickReworkButton,

  getCancelButton,
  queryCancelButton,
  clickCancelButton,
}

describe('Задание', () => {
  test('Отображает recordId', () => {
    render(<SubTask {...props} />)
    expect(
      testUtils.getChildByText(props.recordId!),
    ).toBeInTheDocument()
  })

  test('Отображает дату "olaNextBreachTime"', () => {
    render(<SubTask {...props} />)

    expect(
      testUtils.getChildByText(`до ${props.olaNextBreachTime!}`),
    ).toBeInTheDocument()
  })

  test('Отображает заголовок', () => {
    render(<SubTask {...props} />)
    expect(testUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  test('Отображает статус заявки', () => {
    render(<SubTask {...props} />)

    expect(
      taskStatusTestUtils.getContainerIn(
        testUtils.getContainer(),
        props.status,
      ),
    ).toBeInTheDocument()
  })

  test('Отображает дату создания', () => {
    render(<SubTask {...props} />)

    expect(testUtils.getChildByText(/дата создания/i)).toBeInTheDocument()

    expect(
      testUtils.getChildByText(props.createdAt),
    ).toBeInTheDocument()
  })

  describe('Техническое решение', () => {
    describe('Кнопка отображается корректно', () => {
      test('Если статус подзадачи "Завершена"', () => {
        render(<SubTask {...props} status={TaskStatusEnum.Completed} />)

        const button = testUtils.getTechResolutionButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Если статус подзадачи "Закрыта"', () => {
        render(<SubTask {...props} status={TaskStatusEnum.Closed} />)

        const button = testUtils.getTechResolutionButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('Кнопка не отображается', () => {
      test('При не верном статусе подзадачи', () => {
        render(<SubTask {...props} status={TaskStatusEnum.New} />)
        expect(testUtils.queryTechResolutionButton()).not.toBeInTheDocument()
      })
    })

    describe('Текст решения', () => {
      test('Скрыт по умолчанию', () => {
        render(<SubTask {...props} status={TaskStatusEnum.Closed} />)

        expect(testUtils.getTechResolutionButton()).toBeInTheDocument()
        expect(
          testUtils.queryChildByText(props.techResolution!),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(
          <SubTask {...props} status={TaskStatusEnum.Closed} />,
        )

        await testUtils.clickTechResolutionButton(user)

        expect(
          testUtils.getChildByText(props.techResolution!),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(
          <SubTask {...props} status={TaskStatusEnum.Closed} />,
        )

        await testUtils.clickTechResolutionButton(user)
        await testUtils.clickTechResolutionButton(user)

        expect(
          testUtils.queryChildByText(props.techResolution!),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Причина возврата', () => {
    test('Кнопка отображается если причина присутствует', () => {
      render(<SubTask {...props} returnReason={subTask.returnReason} />)

      const button = testUtils.getReturnReasonButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Кнопка не отображается если причина отсутствует', () => {
      render(<SubTask {...props} returnReason={null} />)
      expect(testUtils.queryReturnReasonButton()).not.toBeInTheDocument()
    })

    describe('Текст причины', () => {
      test('Скрыт по умолчанию', () => {
        render(
          <SubTask {...props} returnReason={subTask.returnReason} />,
        )

        expect(testUtils.getReturnReasonButton()).toBeInTheDocument()

        expect(
          testUtils.queryChildByText(subTask.returnReason),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(
          <SubTask {...props} returnReason={subTask.returnReason} />,
        )

        await testUtils.clickReturnReasonButton(user)

        expect(
          testUtils.getChildByText(subTask.returnReason),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(
          <SubTask {...props} returnReason={subTask.returnReason} />,
        )

        await testUtils.clickReturnReasonButton(user)
        await testUtils.clickReturnReasonButton(user)

        expect(
          testUtils.queryChildByText(subTask.returnReason),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Причина отмены', () => {
    test('Кнопка отображается если причина присутствует', () => {
      render(<SubTask {...props} cancelReason={subTask.cancelReason} />)

      const button = testUtils.getCancelReasonButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Кнопка не отображается если причина отсутствует', () => {
      render(<SubTask {...props} cancelReason={null} />)
      expect(testUtils.queryCancelReasonButton()).not.toBeInTheDocument()
    })

    describe('Текст причины', () => {
      test('Скрыт по умолчанию', () => {
        render(
          <SubTask {...props} cancelReason={subTask.cancelReason} />,
        )

        expect(testUtils.getCancelReasonButton()).toBeInTheDocument()

        expect(
          testUtils.queryChildByText(subTask.cancelReason),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(
          <SubTask {...props} cancelReason={subTask.cancelReason} />,
        )

        await testUtils.clickCancelReasonButton(user)

        expect(
          testUtils.getChildByText(subTask.cancelReason),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(
          <SubTask {...props} cancelReason={subTask.cancelReason} />,
        )

        await testUtils.clickCancelReasonButton(user)
        await testUtils.clickCancelReasonButton(user)

        expect(
          testUtils.queryChildByText(subTask.cancelReason),
        ).not.toBeInTheDocument()
      })
    })
  })

  test('Отображает группу поддержки если она есть', () => {
    render(<SubTask {...props} supportGroup={subTask.supportGroup} />)

    expect(testUtils.getChildByText(/группа поддержки/i)).toBeInTheDocument()

    expect(
      testUtils.getChildByText(subTask.supportGroup.name),
    ).toBeInTheDocument()
  })

  test('Не отображает группу поддержки если её нет', () => {
    render(<SubTask {...props} supportGroup={null} />)

    expect(testUtils.getChildByText(/группа поддержки/i)).toBeInTheDocument()

    expect(
      testUtils.queryChildByText(subTask.supportGroup.name),
    ).not.toBeInTheDocument()
  })

  test('Отображает блок исполнителя', () => {
    render(<SubTask {...props} />)

    expect(testUtils.getChildByText(/исполнитель/i)).toBeInTheDocument()
    expect(
      taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
    ).toBeInTheDocument()
  })

  describe('Описание', () => {
    test('Кнопка отображается корректно', () => {
      render(<SubTask {...props} />)

      const button = getDescriptionButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Текст описания', () => {
      test('Скрыт по умолчанию', () => {
        render(<SubTask {...props} />)

        expect(getDescriptionButton()).toBeInTheDocument()

        expect(
          testUtils.queryChildByText(props.description!),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(<SubTask {...props} />)

        await clickDescriptionButton(user)

        expect(
          testUtils.getChildByText(props.description!),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(<SubTask {...props} />)

        await clickDescriptionButton(user)
        await clickDescriptionButton(user)

        expect(
          testUtils.queryChildByText(props.description!),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Кнопка отправки на доработку', () => {
    test('Отображается корректно если условия соблюдены', () => {
      render(<SubTask {...props} {...activeReworkButtonProps} />)

      const button = testUtils.getReworkButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но текущий пользователь не исполнитель заявки', () => {
        render(
          <SubTask
            {...props}
            {...activeReworkButtonProps}
            currentUserIsTaskAssignee={false}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но задание не в статусе "Завершена"', () => {
        render(
          <SubTask
            {...props}
            {...activeReworkButtonProps}
            status={TaskStatusEnum.New}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <SubTask
            {...props}
            {...activeReworkButtonProps}
            taskStatus={TaskStatusEnum.Completed}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Закрыта"', () => {
        render(
          <SubTask
            {...props}
            {...activeReworkButtonProps}
            taskStatus={TaskStatusEnum.Closed}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <SubTask {...props} {...activeReworkButtonProps} />,
      )

      await testUtils.clickReworkButton(user)
      expect(props.onClickRework).toBeCalledTimes(1)
    })

    test('Не активна - если заявка на переклассификации', () => {
      render(
        <SubTask
          {...props}
          {...activeReworkButtonProps}
          taskExtendedStatus={TaskExtendedStatusEnum.InReclassification}
        />,
      )

      expect(testUtils.getReworkButton()).toBeDisabled()
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно если условия соблюдены', () => {
      render(<SubTask {...props} {...activeCancelButtonProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но текущий пользователь не исполнитель заявки', () => {
        render(
          <SubTask
            {...props}
            {...activeCancelButtonProps}
            currentUserIsTaskAssignee={false}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но задание не в статусе "Новая"', () => {
        render(
          <SubTask
            {...props}
            {...activeCancelButtonProps}
            status={TaskStatusEnum.InProgress}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <SubTask
            {...props}
            {...activeCancelButtonProps}
            taskStatus={TaskStatusEnum.Completed}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Закрыта"', () => {
        render(
          <SubTask
            {...props}
            {...activeCancelButtonProps}
            taskStatus={TaskStatusEnum.Closed}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <SubTask {...props} {...activeCancelButtonProps} />,
      )

      await testUtils.clickCancelButton(user)
      expect(props.onClickCancel).toBeCalledTimes(1)
    })

    test('Не активна - если заявка на переклассификации', () => {
      render(
        <SubTask
          {...props}
          {...activeCancelButtonProps}
          taskExtendedStatus={TaskExtendedStatusEnum.InReclassification}
        />,
      )

      expect(testUtils.getCancelButton()).toBeDisabled()
    })
  })
})
