import { getTaskAssignee } from '_fixtures_/task'
import { getWorkGroup } from '_fixtures_/workGroup'
import { generateId, render } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/enums'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { UserRolesEnum } from 'shared/constants/roles'
import { asyncNoop } from 'shared/utils/common/noop'

import TaskAssignee, { TaskAssigneeProps } from '../index'
import { getTakeTaskButton, queryTakeTaskButton } from './utils'

describe('Блок "Исполнитель заявки"', () => {
  describe('Кнопка "Взять в работу"', () => {
    const baseProps: Pick<
      TaskAssigneeProps,
      | 'takeTask'
      | 'takeTaskIsLoading'
      | 'updateTaskAssignee'
      | 'updateTaskAssigneeIsLoading'
      | 'extendedStatus'
      | 'workGroupListIsLoading'
    > = {
      takeTask: asyncNoop,
      takeTaskIsLoading: false,
      updateTaskAssignee: asyncNoop,
      updateTaskAssigneeIsLoading: false,
      workGroupListIsLoading: false,
      extendedStatus: TaskExtendedStatusEnum.New,
    }

    const propsForUserCanSelectAssignee: typeof baseProps &
      Pick<
        TaskAssigneeProps,
        'assignee' | 'status' | 'hasReclassificationRequest' | 'workGroup'
      > = {
      ...baseProps,
      assignee: null,
      workGroup: getWorkGroup(),
      status: TaskStatusEnum.New,
      hasReclassificationRequest: false,
    }

    const propsForUserCanNotSelectAssignee: typeof baseProps &
      Pick<TaskAssigneeProps, 'status' | 'hasReclassificationRequest'> = {
      ...baseProps,
      status: TaskStatusEnum.Closed,
      hasReclassificationRequest: true,
    }

    describe('Отображается для пользователя с ролью', () => {
      test(`${UserRolesEnum.FirstLineSupport} если у заявки есть исполнитель`, () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <TaskAssignee
            {...propsForUserCanNotSelectAssignee}
            assignee={getTaskAssignee()}
          />,
          { store },
        )

        expect(getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.Engineer} если у заявки есть исполнитель`, () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.Engineer,
        })

        render(
          <TaskAssignee
            {...propsForUserCanNotSelectAssignee}
            assignee={getTaskAssignee()}
          />,
          { store },
        )

        expect(getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.SeniorEngineer} если он может выбирать исполнителя`, () => {
        const authenticatedUserId = generateId()

        const store = getStoreWithAuth({
          userId: authenticatedUserId,
          userRole: UserRolesEnum.SeniorEngineer,
        })

        propsForUserCanSelectAssignee.workGroup!.seniorEngineer.id =
          authenticatedUserId

        render(<TaskAssignee {...propsForUserCanSelectAssignee} />, { store })

        expect(getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.HeadOfDepartment} если он может выбирать исполнителя`, () => {
        const authenticatedUserId = generateId()

        const store = getStoreWithAuth({
          userId: authenticatedUserId,
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        propsForUserCanSelectAssignee.workGroup!.groupLead.id =
          authenticatedUserId

        render(<TaskAssignee {...propsForUserCanSelectAssignee} />, { store })

        expect(getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe('Не отображается для пользователя с ролью', () => {
      test(`${UserRolesEnum.FirstLineSupport} если у заявки нет исполнителя`, () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <TaskAssignee
            {...propsForUserCanNotSelectAssignee}
            assignee={null}
          />,
          { store },
        )

        expect(queryTakeTaskButton()).not.toBeInTheDocument()
      })

      test(`${UserRolesEnum.Engineer} если у заявки нет исполнителя`, () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.Engineer,
        })

        render(
          <TaskAssignee
            {...propsForUserCanNotSelectAssignee}
            assignee={null}
          />,
          { store },
        )

        expect(queryTakeTaskButton()).not.toBeInTheDocument()
      })

      describe('С которой можно выбирать исполнителя', () => {
        describe('Если заявка в статусе', () => {
          test(`${TaskStatusEnum.Closed}`, () => {
            const authenticatedUserId = generateId()

            const store = getStoreWithAuth({
              userId: authenticatedUserId,
              userRole: UserRolesEnum.SeniorEngineer,
            })

            propsForUserCanSelectAssignee.status = TaskStatusEnum.Closed
            propsForUserCanSelectAssignee.workGroup!.seniorEngineer.id =
              authenticatedUserId

            render(<TaskAssignee {...propsForUserCanSelectAssignee} />, {
              store,
            })

            expect(queryTakeTaskButton()).not.toBeInTheDocument()
          })

          test(`${TaskStatusEnum.Completed}`, () => {
            const authenticatedUserId = generateId()

            const store = getStoreWithAuth({
              userId: authenticatedUserId,
              userRole: UserRolesEnum.SeniorEngineer,
            })

            propsForUserCanSelectAssignee.status = TaskStatusEnum.Completed
            propsForUserCanSelectAssignee.workGroup!.seniorEngineer.id =
              authenticatedUserId

            render(<TaskAssignee {...propsForUserCanSelectAssignee} />, {
              store,
            })

            expect(queryTakeTaskButton()).not.toBeInTheDocument()
          })
        })

        test('Если для заявки создан запрос на переклассификацию', () => {
          const authenticatedUserId = generateId()

          const store = getStoreWithAuth({
            userId: authenticatedUserId,
            userRole: UserRolesEnum.SeniorEngineer,
          })

          propsForUserCanSelectAssignee.hasReclassificationRequest = true
          propsForUserCanSelectAssignee.workGroup!.seniorEngineer.id =
            authenticatedUserId

          render(<TaskAssignee {...propsForUserCanSelectAssignee} />, { store })

          expect(queryTakeTaskButton()).not.toBeInTheDocument()
        })

        test('Если старший инженер или начальник отдела из рабочий группы не является авторизованным пользователем', () => {
          const store = getStoreWithAuth({
            userId: generateId(),
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <TaskAssignee
              {...propsForUserCanSelectAssignee}
              workGroup={getWorkGroup()}
            />,
            { store },
          )

          expect(queryTakeTaskButton()).not.toBeInTheDocument()
        })
      })
    })

    describe('Не активна', () => {
      const activeBtnProps: Pick<
        TaskDetailsModel,
        'status' | 'extendedStatus' | 'assignee'
      > = {
        status: TaskStatusEnum.New,
        extendedStatus: TaskExtendedStatusEnum.New,
        assignee: getTaskAssignee(),
      }

      describe('Если все условия соблюдены', () => {
        test(`Но статус заявки не "${TaskStatusEnum.New}"`, async () => {
          const store = getStoreWithAuth({
            userId: activeBtnProps.assignee!.id,
            userRole: UserRolesEnum.FirstLineSupport,
          })

          activeBtnProps.status = TaskStatusEnum.Awaiting

          render(
            <TaskAssignee
              {...propsForUserCanNotSelectAssignee}
              {...activeBtnProps}
            />,
            { store },
          )

          expect(getTakeTaskButton()).toBeDisabled()
        })

        test('Но исполнитель заявки не является авторизованным пользователем', async () => {
          const store = getStoreWithAuth({
            userId: generateId(),
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <TaskAssignee
              {...propsForUserCanNotSelectAssignee}
              {...activeBtnProps}
            />,
            { store },
          )

          expect(getTakeTaskButton()).toBeDisabled()
        })

        test('Но исполнитель заявки назначен', async () => {
          const store = getStoreWithAuth({
            userId: generateId(),
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <TaskAssignee
              {...propsForUserCanNotSelectAssignee}
              {...activeBtnProps}
            />,
            { store },
          )

          expect(getTakeTaskButton()).toBeDisabled()
        })

        test(`Но расширенный статус заявки "${TaskExtendedStatusEnum.InReclassification}"`, async () => {
          const store = getStoreWithAuth({
            userId: activeBtnProps.assignee!.id,
            userRole: UserRolesEnum.FirstLineSupport,
          })

          activeBtnProps.extendedStatus =
            TaskExtendedStatusEnum.InReclassification

          render(
            <TaskAssignee
              {...propsForUserCanNotSelectAssignee}
              {...activeBtnProps}
            />,
            { store },
          )

          expect(getTakeTaskButton()).toBeDisabled()
        })
      })
    })
  })
})
