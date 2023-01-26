import { getButtonIn, queryButtonIn, render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import subTaskFixtures from 'fixtures/subTask'
import taskFixtures from 'fixtures/task'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/features/TaskAssignee/TaskAssignee.test'
import { testUtils as taskStatusTestUtils } from 'modules/task/features/TaskStatus/TaskStatus.test'
import { NonNullableObject } from 'shared/interfaces/utils'

import SubTask, { SubTaskProps } from './SubTask'

const task = taskFixtures.getTask()
const subTask = subTaskFixtures.getSubTask()

const requiredProps: Pick<
  SubTaskProps,
  | 'title'
  | 'status'
  | 'createdAt'
  | 'supportGroup'
  | 'onClickCancel'
  | 'onClickRework'
  | 'taskStatus'
  | 'taskExtendedStatus'
  | 'taskHasSuspendRequest'
  | 'currentUserIsTaskAssignee'
  | 'returnReason'
  | 'cancelReason'
> = {
  title: subTask.title,
  status: subTask.status,
  taskExtendedStatus: task.extendedStatus,
  taskHasSuspendRequest: false,
  createdAt: subTask.createdAt,
  supportGroup: null,
  onClickCancel: jest.fn(),
  onClickRework: jest.fn(),
  taskStatus: TaskStatusEnum.New,
  currentUserIsTaskAssignee: false,
  returnReason: null,
  cancelReason: null,
}

const notRequiredProps: NonNullableObject<
  Omit<SubTaskProps, keyof typeof requiredProps>
> = {
  recordId: subTask.recordId,
  description: subTask.description,
  techResolution: subTask.techResolution,
  olaNextBreachTime: subTask.olaNextBreachTime,
  externalAssigneeName: subTask.externalAssigneeName,
  externalAssigneePhone: subTask.externalAssigneePhone,
}

export const activeReworkButtonProps: Pick<
  SubTaskProps,
  'currentUserIsTaskAssignee' | 'status' | 'taskStatus'
> = {
  currentUserIsTaskAssignee: true,
  status: TaskStatusEnum.Completed,
  taskStatus: TaskStatusEnum.New,
}

export const activeCancelButtonProps: Pick<
  SubTaskProps,
  'currentUserIsTaskAssignee' | 'status' | 'taskStatus'
> = {
  currentUserIsTaskAssignee: true,
  status: TaskStatusEnum.New,
  taskStatus: TaskStatusEnum.New,
}

const getContainer = () => screen.getByTestId('sub-task-list-item')

const getAllContainerIn = (container: HTMLElement) =>
  within(container).getAllByTestId('sub-task-list-item')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

// tech resolution
const getTechResolutionButton = () => getButtonIn(getContainer(), /решение/i)

const queryTechResolutionButton = () =>
  queryButtonIn(getContainer(), /решение/i)

const clickTechResolutionButton = async (user: UserEvent) => {
  const button = getTechResolutionButton()
  await user.click(button)
  return button
}

// return reason
const getReturnReasonButton = () =>
  getButtonIn(getContainer(), /причина возврата/i)

const queryReturnReasonButton = () =>
  queryButtonIn(getContainer(), /причина возврата/i)

const clickReturnReasonButton = async (user: UserEvent) => {
  const button = getReturnReasonButton()
  await user.click(button)
  return button
}

// cancel reason
const getCancelReasonButton = () =>
  getButtonIn(getContainer(), /причина отмены/i)

const queryCancelReasonButton = () =>
  queryButtonIn(getContainer(), /причина отмены/i)

const clickCancelReasonButton = async (user: UserEvent) => {
  const button = getCancelReasonButton()
  await user.click(button)
  return button
}

// description button
const getDescriptionButton = () =>
  getButtonIn(getContainer(), /подробное описание/i)

const clickDescriptionButton = async (user: UserEvent) => {
  const button = getDescriptionButton()
  await user.click(button)
  return button
}

// rework button
const getReworkButton = () =>
  getButtonIn(getContainer(), /вернуть на доработку/i)

const queryReworkButton = () =>
  queryButtonIn(getContainer(), /вернуть на доработку/i)

const clickReworkButton = async (user: UserEvent) => {
  const button = getReworkButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const queryCancelButton = () => queryButtonIn(getContainer(), /отменить/i)

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
  test('Отображает "recordId"', () => {
    render(<SubTask {...requiredProps} recordId={notRequiredProps.recordId} />)

    expect(
      testUtils.getChildByText(notRequiredProps.recordId),
    ).toBeInTheDocument()
  })

  test('Отображает дату "olaNextBreachTime"', () => {
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
    describe('Кнопка отображается корректно', () => {
      test('Если статус подзадачи "Завершена"', () => {
        render(
          <SubTask
            {...requiredProps}
            status={TaskStatusEnum.Completed}
            techResolution={notRequiredProps.techResolution}
          />,
        )

        const button = testUtils.getTechResolutionButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Если статус подзадачи "Закрыта"', () => {
        render(
          <SubTask
            {...requiredProps}
            status={TaskStatusEnum.Closed}
            techResolution={notRequiredProps.techResolution}
          />,
        )

        const button = testUtils.getTechResolutionButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('Кнопка не отображается', () => {
      test('При не верном статусе подзадачи', () => {
        render(
          <SubTask
            {...requiredProps}
            status={TaskStatusEnum.New}
            techResolution={notRequiredProps.techResolution}
          />,
        )

        expect(testUtils.queryTechResolutionButton()).not.toBeInTheDocument()
      })
    })

    describe('Текст решения', () => {
      test('Скрыт по умолчанию', () => {
        render(
          <SubTask
            {...requiredProps}
            status={TaskStatusEnum.Closed}
            techResolution={notRequiredProps.techResolution}
          />,
        )

        expect(testUtils.getTechResolutionButton()).toBeInTheDocument()

        expect(
          testUtils.queryChildByText(notRequiredProps.techResolution),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(
          <SubTask
            {...requiredProps}
            status={TaskStatusEnum.Closed}
            techResolution={notRequiredProps.techResolution}
          />,
        )

        await testUtils.clickTechResolutionButton(user)

        expect(
          testUtils.getChildByText(notRequiredProps.techResolution),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(
          <SubTask
            {...requiredProps}
            status={TaskStatusEnum.Closed}
            techResolution={notRequiredProps.techResolution}
          />,
        )

        await testUtils.clickTechResolutionButton(user)
        await testUtils.clickTechResolutionButton(user)

        expect(
          testUtils.queryChildByText(notRequiredProps.techResolution),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Причина возврата', () => {
    test('Кнопка отображается если причина присутствует', () => {
      render(<SubTask {...requiredProps} returnReason={subTask.returnReason} />)

      const button = testUtils.getReturnReasonButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Кнопка не отображается если причина отсутствует', () => {
      render(<SubTask {...requiredProps} returnReason={null} />)
      expect(testUtils.queryReturnReasonButton()).not.toBeInTheDocument()
    })

    describe('Текст причины', () => {
      test('Скрыт по умолчанию', () => {
        render(
          <SubTask {...requiredProps} returnReason={subTask.returnReason} />,
        )

        expect(testUtils.getReturnReasonButton()).toBeInTheDocument()

        expect(
          testUtils.queryChildByText(subTask.returnReason),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(
          <SubTask {...requiredProps} returnReason={subTask.returnReason} />,
        )

        await testUtils.clickReturnReasonButton(user)

        expect(
          testUtils.getChildByText(subTask.returnReason),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(
          <SubTask {...requiredProps} returnReason={subTask.returnReason} />,
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
      render(<SubTask {...requiredProps} cancelReason={subTask.cancelReason} />)

      const button = testUtils.getCancelReasonButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Кнопка не отображается если причина отсутствует', () => {
      render(<SubTask {...requiredProps} cancelReason={null} />)
      expect(testUtils.queryCancelReasonButton()).not.toBeInTheDocument()
    })

    describe('Текст причины', () => {
      test('Скрыт по умолчанию', () => {
        render(
          <SubTask {...requiredProps} cancelReason={subTask.cancelReason} />,
        )

        expect(testUtils.getCancelReasonButton()).toBeInTheDocument()

        expect(
          testUtils.queryChildByText(subTask.cancelReason),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(
          <SubTask {...requiredProps} cancelReason={subTask.cancelReason} />,
        )

        await testUtils.clickCancelReasonButton(user)

        expect(
          testUtils.getChildByText(subTask.cancelReason),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(
          <SubTask {...requiredProps} cancelReason={subTask.cancelReason} />,
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
    render(<SubTask {...requiredProps} supportGroup={subTask.supportGroup} />)

    expect(testUtils.getChildByText(/группа поддержки/i)).toBeInTheDocument()

    expect(
      testUtils.getChildByText(subTask.supportGroup.name),
    ).toBeInTheDocument()
  })

  test('Не отображает группу поддержки если её нет', () => {
    render(<SubTask {...requiredProps} supportGroup={null} />)

    expect(testUtils.getChildByText(/группа поддержки/i)).toBeInTheDocument()

    expect(
      testUtils.queryChildByText(subTask.supportGroup.name),
    ).not.toBeInTheDocument()
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

    describe('Текст описания', () => {
      test('Скрыт по умолчанию', () => {
        render(
          <SubTask
            {...requiredProps}
            description={notRequiredProps.description}
          />,
        )

        expect(getDescriptionButton()).toBeInTheDocument()

        expect(
          testUtils.queryChildByText(notRequiredProps.description),
        ).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(
          <SubTask
            {...requiredProps}
            description={notRequiredProps.description}
          />,
        )

        await clickDescriptionButton(user)

        expect(
          testUtils.getChildByText(notRequiredProps.description),
        ).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(
          <SubTask
            {...requiredProps}
            description={notRequiredProps.description}
          />,
        )

        await clickDescriptionButton(user)
        await clickDescriptionButton(user)

        expect(
          testUtils.queryChildByText(notRequiredProps.description),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('Кнопка отправки на доработку', () => {
    test('Отображается корректно если условия соблюдены', () => {
      render(<SubTask {...requiredProps} {...activeReworkButtonProps} />)

      const button = testUtils.getReworkButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но текущий пользователь не исполнитель заявки', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeReworkButtonProps}
            currentUserIsTaskAssignee={false}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но задание не в статусе "Завершена"', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeReworkButtonProps}
            status={TaskStatusEnum.New}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeReworkButtonProps}
            taskStatus={TaskStatusEnum.Completed}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Закрыта"', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeReworkButtonProps}
            taskStatus={TaskStatusEnum.Closed}
          />,
        )

        expect(testUtils.queryReworkButton()).not.toBeInTheDocument()
      })
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <SubTask {...requiredProps} {...activeReworkButtonProps} />,
      )

      await testUtils.clickReworkButton(user)
      expect(requiredProps.onClickRework).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно если условия соблюдены', () => {
      render(<SubTask {...requiredProps} {...activeCancelButtonProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но текущий пользователь не исполнитель заявки', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeCancelButtonProps}
            currentUserIsTaskAssignee={false}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но задание не в статусе "Новая"', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeCancelButtonProps}
            status={TaskStatusEnum.InProgress}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeCancelButtonProps}
            taskStatus={TaskStatusEnum.Completed}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Закрыта"', () => {
        render(
          <SubTask
            {...requiredProps}
            {...activeCancelButtonProps}
            taskStatus={TaskStatusEnum.Closed}
          />,
        )

        expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
      })
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <SubTask {...requiredProps} {...activeCancelButtonProps} />,
      )

      await testUtils.clickCancelButton(user)
      expect(requiredProps.onClickCancel).toBeCalledTimes(1)
    })
  })
})
