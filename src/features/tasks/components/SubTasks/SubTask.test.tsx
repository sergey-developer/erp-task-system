import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'features/tasks/api/constants'

import {
  activeCancelButtonProps,
  activeReworkButtonProps,
  props,
  showCancelButtonProps,
  showReworkButtonProps,
} from '_tests_/features/tasks/components/SubTasks/SubTask/constants'
import { subTaskTestUtils } from '_tests_/features/tasks/components/SubTasks/SubTask/testUtils'
import { taskAssigneeTestUtils } from '_tests_/features/tasks/components/TaskAssignee/testUtils'
import { taskStatusTestUtils } from '_tests_/features/tasks/components/TaskStatus/testUtils'
import taskFixtures from '_tests_/fixtures/tasks'
import { render } from '_tests_/helpers'

import SubTask from './SubTask'

const subTask = taskFixtures.subTask()

describe('Задание', () => {
  test('Отображает recordId', () => {
    render(<SubTask {...props} />)
    expect(subTaskTestUtils.getChildByText(props.recordId!)).toBeInTheDocument()
  })

  test('Отображает дату "olaNextBreachTime"', () => {
    render(<SubTask {...props} />)
    expect(subTaskTestUtils.getChildByText(`до ${props.olaNextBreachTime!}`)).toBeInTheDocument()
  })

  test('Отображает заголовок', () => {
    render(<SubTask {...props} />)
    expect(subTaskTestUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  test('Отображает статус заявки', () => {
    render(<SubTask {...props} />)

    expect(
      taskStatusTestUtils.getContainerIn(subTaskTestUtils.getContainer(), props.status),
    ).toBeInTheDocument()
  })

  test('Отображает дату создания', () => {
    render(<SubTask {...props} />)
    expect(subTaskTestUtils.getChildByText(/дата создания/i)).toBeInTheDocument()
    expect(subTaskTestUtils.getChildByText(props.createdAt)).toBeInTheDocument()
  })

  describe('Техническое решение', () => {
    describe('Кнопка отображается корректно', () => {
      test('Если статус подзадачи "Завершена"', () => {
        render(<SubTask {...props} status={TaskStatusEnum.Completed} />)

        const button = subTaskTestUtils.getTechResolutionButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Если статус подзадачи "Закрыта"', () => {
        render(<SubTask {...props} status={TaskStatusEnum.Closed} />)

        const button = subTaskTestUtils.getTechResolutionButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })
    })

    describe('Кнопка не отображается', () => {
      test('При не верном статусе подзадачи', () => {
        render(<SubTask {...props} status={TaskStatusEnum.New} />)
        expect(subTaskTestUtils.queryTechResolutionButton()).not.toBeInTheDocument()
      })
    })

    describe('Текст решения', () => {
      test('Скрыт по умолчанию', () => {
        render(<SubTask {...props} status={TaskStatusEnum.Closed} />)

        expect(subTaskTestUtils.getTechResolutionButton()).toBeInTheDocument()
        expect(subTaskTestUtils.queryChildByText(props.techResolution!)).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(<SubTask {...props} status={TaskStatusEnum.Closed} />)

        await subTaskTestUtils.clickTechResolutionButton(user)

        expect(subTaskTestUtils.getChildByText(props.techResolution!)).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(<SubTask {...props} status={TaskStatusEnum.Closed} />)

        await subTaskTestUtils.clickTechResolutionButton(user)
        await subTaskTestUtils.clickTechResolutionButton(user)

        expect(subTaskTestUtils.queryChildByText(props.techResolution!)).not.toBeInTheDocument()
      })
    })
  })

  describe('Причина возврата', () => {
    test('Кнопка отображается если причина присутствует', () => {
      render(<SubTask {...props} returnReason={subTask.returnReason} />)

      const button = subTaskTestUtils.getReturnReasonButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Кнопка не отображается если причина отсутствует', () => {
      render(<SubTask {...props} returnReason={null} />)
      expect(subTaskTestUtils.queryReturnReasonButton()).not.toBeInTheDocument()
    })

    describe('Текст причины', () => {
      test('Скрыт по умолчанию', () => {
        render(<SubTask {...props} returnReason={subTask.returnReason} />)

        expect(subTaskTestUtils.getReturnReasonButton()).toBeInTheDocument()

        expect(subTaskTestUtils.queryChildByText(subTask.returnReason)).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(<SubTask {...props} returnReason={subTask.returnReason} />)

        await subTaskTestUtils.clickReturnReasonButton(user)

        expect(subTaskTestUtils.getChildByText(subTask.returnReason)).toBeInTheDocument()
      })

      test.skip('Можно скрыть', async () => {
        const { user } = render(<SubTask {...props} returnReason={subTask.returnReason} />)

        await subTaskTestUtils.clickReturnReasonButton(user)
        await subTaskTestUtils.clickReturnReasonButton(user)

        expect(subTaskTestUtils.queryChildByText(subTask.returnReason)).not.toBeInTheDocument()
      })
    })
  })

  describe('Причина отмены', () => {
    test('Кнопка отображается если причина присутствует', () => {
      render(<SubTask {...props} cancelReason={subTask.cancelReason} />)

      const button = subTaskTestUtils.getCancelReasonButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Кнопка не отображается если причина отсутствует', () => {
      render(<SubTask {...props} cancelReason={null} />)
      expect(subTaskTestUtils.queryCancelReasonButton()).not.toBeInTheDocument()
    })

    describe('Текст причины', () => {
      test('Скрыт по умолчанию', () => {
        render(<SubTask {...props} cancelReason={subTask.cancelReason} />)

        expect(subTaskTestUtils.getCancelReasonButton()).toBeInTheDocument()

        expect(subTaskTestUtils.queryChildByText(subTask.cancelReason)).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(<SubTask {...props} cancelReason={subTask.cancelReason} />)

        await subTaskTestUtils.clickCancelReasonButton(user)

        expect(subTaskTestUtils.getChildByText(subTask.cancelReason)).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(<SubTask {...props} cancelReason={subTask.cancelReason} />)

        await subTaskTestUtils.clickCancelReasonButton(user)
        await subTaskTestUtils.clickCancelReasonButton(user)

        expect(subTaskTestUtils.queryChildByText(subTask.cancelReason)).not.toBeInTheDocument()
      })
    })
  })

  test('Отображает группу поддержки если она есть', () => {
    render(<SubTask {...props} supportGroup={subTask.supportGroup} />)
    expect(subTaskTestUtils.getChildByText(/группа поддержки/i)).toBeInTheDocument()
    expect(subTaskTestUtils.getChildByText(subTask.supportGroup.name)).toBeInTheDocument()
  })

  test('Не отображает группу поддержки если её нет', () => {
    render(<SubTask {...props} supportGroup={null} />)
    expect(subTaskTestUtils.getChildByText(/группа поддержки/i)).toBeInTheDocument()
    expect(subTaskTestUtils.queryChildByText(subTask.supportGroup.name)).not.toBeInTheDocument()
  })

  test('Отображает блок исполнителя', () => {
    render(<SubTask {...props} />)
    expect(subTaskTestUtils.getChildByText(/исполнитель/i)).toBeInTheDocument()
    expect(
      taskAssigneeTestUtils.getContainerIn(subTaskTestUtils.getContainer()),
    ).toBeInTheDocument()
  })

  describe('Описание', () => {
    test('Кнопка отображается корректно', () => {
      render(<SubTask {...props} />)

      const button = subTaskTestUtils.getDescriptionButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Текст описания', () => {
      test('Скрыт по умолчанию', () => {
        render(<SubTask {...props} />)

        expect(subTaskTestUtils.getDescriptionButton()).toBeInTheDocument()

        expect(subTaskTestUtils.queryChildByText(props.description!)).not.toBeInTheDocument()
      })

      test('Можно раскрыть', async () => {
        const { user } = render(<SubTask {...props} />)

        await subTaskTestUtils.clickDescriptionButton(user)

        expect(subTaskTestUtils.getChildByText(props.description!)).toBeInTheDocument()
      })

      test('Можно скрыть', async () => {
        const { user } = render(<SubTask {...props} />)

        await subTaskTestUtils.clickDescriptionButton(user)
        await subTaskTestUtils.clickDescriptionButton(user)

        expect(subTaskTestUtils.queryChildByText(props.description!)).not.toBeInTheDocument()
      })
    })
  })

  describe('Кнопка отправки на доработку', () => {
    test('Отображается и активна если условия соблюдены', () => {
      render(<SubTask {...props} {...showReworkButtonProps} {...activeReworkButtonProps} />)
      const button = subTaskTestUtils.getReworkButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображается если условия соблюдены, есть права, но текущий пользователь не исполнитель заявки', () => {
      render(
        <SubTask
          {...props}
          {...showReworkButtonProps}
          currentUserIsTaskAssignee={false}
          permissions={{ anySubtasksRework: true }}
        />,
      )

      expect(subTaskTestUtils.getReworkButton()).toBeInTheDocument()
    })

    test('Отображается если условия соблюдены, текущий пользователь исполнитель заявки, но нет прав', () => {
      render(
        <SubTask
          {...props}
          {...showReworkButtonProps}
          currentUserIsTaskAssignee
          permissions={{ anySubtasksRework: false }}
        />,
      )

      expect(subTaskTestUtils.getReworkButton()).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но текущий пользователь не исполнитель заявки и нет прав', () => {
        render(
          <SubTask
            {...props}
            {...showReworkButtonProps}
            currentUserIsTaskAssignee={false}
            permissions={{ anySubtasksRework: false }}
          />,
        )

        expect(subTaskTestUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но задание не в статусе "Завершено"', () => {
        render(<SubTask {...props} {...showReworkButtonProps} status={TaskStatusEnum.New} />)
        expect(subTaskTestUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Завершено"', () => {
        render(
          <SubTask {...props} {...showReworkButtonProps} taskStatus={TaskStatusEnum.Completed} />,
        )

        expect(subTaskTestUtils.queryReworkButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Закрыта"', () => {
        render(<SubTask {...props} {...showReworkButtonProps} taskStatus={TaskStatusEnum.Closed} />)
        expect(subTaskTestUtils.queryReworkButton()).not.toBeInTheDocument()
      })
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <SubTask {...props} {...showReworkButtonProps} {...activeReworkButtonProps} />,
      )
      await subTaskTestUtils.clickReworkButton(user)
      expect(props.onClickRework).toBeCalledTimes(1)
    })

    test(`Всегда активна если запрос на ожидание в статусе ${SuspendRequestStatusEnum.Approved}`, () => {
      render(
        <SubTask
          {...props}
          {...showReworkButtonProps}
          taskSuspendRequestStatus={SuspendRequestStatusEnum.Approved}
        />,
      )

      expect(subTaskTestUtils.getReworkButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но заявка на переклассификации', () => {
        render(
          <SubTask
            {...props}
            {...showReworkButtonProps}
            {...activeReworkButtonProps}
            taskExtendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
        )

        expect(subTaskTestUtils.getReworkButton()).toBeDisabled()
      })

      test(`Но запрос на ожидание в статусе ${SuspendRequestStatusEnum.New}`, () => {
        render(
          <SubTask
            {...props}
            {...showReworkButtonProps}
            {...activeReworkButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
        )

        expect(subTaskTestUtils.getReworkButton()).toBeDisabled()
      })

      test(`Но запрос на ожидание в статусе ${SuspendRequestStatusEnum.InProgress}`, () => {
        render(
          <SubTask
            {...props}
            {...showReworkButtonProps}
            {...activeReworkButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
        )

        expect(subTaskTestUtils.getReworkButton()).toBeDisabled()
      })
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается и активна если условия соблюдены', () => {
      render(<SubTask {...props} {...showCancelButtonProps} {...activeCancelButtonProps} />)
      const button = subTaskTestUtils.getCancelButton()
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображается если условия соблюдены, есть права, но текущий пользователь не исполнитель заявки', () => {
      render(
        <SubTask
          {...props}
          {...showCancelButtonProps}
          currentUserIsTaskAssignee={false}
          permissions={{ anySubtasksDelete: true }}
        />,
      )

      expect(subTaskTestUtils.getCancelButton()).toBeInTheDocument()
    })

    test('Отображается если условия соблюдены, текущий пользователь исполнитель заявки, но нет прав', () => {
      render(
        <SubTask
          {...props}
          {...showCancelButtonProps}
          currentUserIsTaskAssignee
          permissions={{ anySubtasksDelete: false }}
        />,
      )

      expect(subTaskTestUtils.getCancelButton()).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но текущий пользователь не исполнитель заявки и нет прав', () => {
        render(
          <SubTask
            {...props}
            {...showCancelButtonProps}
            currentUserIsTaskAssignee={false}
            permissions={{ anySubtasksDelete: false }}
          />,
        )

        expect(subTaskTestUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но задание не в статусе "Новая"', () => {
        render(<SubTask {...props} {...showCancelButtonProps} status={TaskStatusEnum.InProgress} />)

        expect(subTaskTestUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <SubTask {...props} {...showCancelButtonProps} taskStatus={TaskStatusEnum.Completed} />,
        )

        expect(subTaskTestUtils.queryCancelButton()).not.toBeInTheDocument()
      })

      test('Но статус заявки "Закрыта"', () => {
        render(<SubTask {...props} {...showCancelButtonProps} taskStatus={TaskStatusEnum.Closed} />)

        expect(subTaskTestUtils.queryCancelButton()).not.toBeInTheDocument()
      })
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(
        <SubTask {...props} {...showCancelButtonProps} {...activeCancelButtonProps} />,
      )
      await subTaskTestUtils.clickCancelButton(user)
      expect(props.onClickCancel).toBeCalledTimes(1)
    })

    test(`Всегда активна если запрос на ожидание в статусе ${SuspendRequestStatusEnum.Approved}`, () => {
      render(
        <SubTask
          {...props}
          {...showCancelButtonProps}
          taskSuspendRequestStatus={SuspendRequestStatusEnum.Approved}
        />,
      )
      expect(subTaskTestUtils.getCancelButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но заявка на переклассификации', () => {
        render(
          <SubTask
            {...props}
            {...showCancelButtonProps}
            {...activeCancelButtonProps}
            taskExtendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
        )

        expect(subTaskTestUtils.getCancelButton()).toBeDisabled()
      })

      test(`Но запрос на ожидание в статусе ${SuspendRequestStatusEnum.New}`, () => {
        render(
          <SubTask
            {...props}
            {...showCancelButtonProps}
            {...activeCancelButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
        )

        expect(subTaskTestUtils.getCancelButton()).toBeDisabled()
      })

      test(`Но запрос на ожидание в статусе ${SuspendRequestStatusEnum.InProgress}`, () => {
        render(
          <SubTask
            {...props}
            {...showCancelButtonProps}
            {...activeCancelButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
        )

        expect(subTaskTestUtils.getCancelButton()).toBeDisabled()
      })
    })
  })
})
