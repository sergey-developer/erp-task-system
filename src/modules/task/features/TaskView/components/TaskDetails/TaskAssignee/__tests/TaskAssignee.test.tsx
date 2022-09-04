import { generateId, render } from '__tests/utils'
import { getStoreWithAuth } from '__tests/utils/auth'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/enums'
import { UserRolesEnum } from 'shared/constants/roles'
import { AssigneeModel } from 'shared/interfaces/models'
import { asyncNoop } from 'shared/utils/common/noop'

import TaskAssignee, { TaskAssigneeProps } from '../index'
import { getTakeTaskButton, getWorkGroup, queryTakeTaskButton } from './utils'

const fakeAssignee: AssigneeModel = {
  id: generateId(),
  firstName: 'Assignee',
  lastName: 'Assignee',
  middleName: '',
  email: '',
  role: UserRolesEnum.Engineer,
}

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
      Pick<TaskAssigneeProps, 'assignee'> = {
      ...baseProps,
      assignee: null,
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
            assignee={fakeAssignee}
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
            assignee={fakeAssignee}
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

        render(
          <TaskAssignee
            {...propsForUserCanSelectAssignee}
            status={TaskStatusEnum.Appointed}
            hasReclassificationRequest={false}
            workGroup={getWorkGroup({
              seniorEngineerId: authenticatedUserId,
            })}
          />,
          { store },
        )

        expect(getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.HeadOfDepartment} если он может выбирать исполнителя`, () => {
        const authenticatedUserId = generateId()

        const store = getStoreWithAuth({
          userId: authenticatedUserId,
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(
          <TaskAssignee
            {...propsForUserCanSelectAssignee}
            status={TaskStatusEnum.Appointed}
            hasReclassificationRequest={false}
            workGroup={getWorkGroup({
              groupLeadId: authenticatedUserId,
            })}
          />,
          { store },
        )

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

            render(
              <TaskAssignee
                {...propsForUserCanSelectAssignee}
                status={TaskStatusEnum.Closed}
                hasReclassificationRequest={false}
                workGroup={getWorkGroup({
                  seniorEngineerId: authenticatedUserId,
                })}
              />,
              { store },
            )

            expect(queryTakeTaskButton()).not.toBeInTheDocument()
          })

          test(`${TaskStatusEnum.Completed}`, () => {
            const authenticatedUserId = generateId()

            const store = getStoreWithAuth({
              userId: authenticatedUserId,
              userRole: UserRolesEnum.SeniorEngineer,
            })

            render(
              <TaskAssignee
                {...propsForUserCanSelectAssignee}
                status={TaskStatusEnum.Completed}
                hasReclassificationRequest={false}
                workGroup={getWorkGroup({
                  seniorEngineerId: authenticatedUserId,
                })}
              />,
              { store },
            )

            expect(queryTakeTaskButton()).not.toBeInTheDocument()
          })
        })

        test('Если для заявки создан запрос на переклассификацию', () => {
          const authenticatedUserId = generateId()

          const store = getStoreWithAuth({
            userId: authenticatedUserId,
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <TaskAssignee
              {...propsForUserCanSelectAssignee}
              status={TaskStatusEnum.Awaiting}
              hasReclassificationRequest={true}
              workGroup={getWorkGroup({
                seniorEngineerId: authenticatedUserId,
              })}
            />,
            { store },
          )

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
              status={TaskStatusEnum.Awaiting}
              hasReclassificationRequest={false}
              workGroup={getWorkGroup()}
            />,
            { store },
          )

          expect(queryTakeTaskButton()).not.toBeInTheDocument()
        })
      })
    })

    describe('Не активна', () => {
      test(`Если статус заявки не "${TaskStatusEnum.New}"`, async () => {
        const store = getStoreWithAuth({
          userId: fakeAssignee.id,
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <TaskAssignee
            {...propsForUserCanNotSelectAssignee}
            assignee={fakeAssignee}
            status={TaskStatusEnum.Awaiting}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
          { store },
        )

        expect(getTakeTaskButton()).toBeDisabled()
      })
    })
  })
})
