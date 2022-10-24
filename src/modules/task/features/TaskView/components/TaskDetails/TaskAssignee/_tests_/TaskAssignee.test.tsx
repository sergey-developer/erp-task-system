import { render } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { getTaskAssignee } from 'fixtures/task'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { UserRolesEnum } from 'shared/constants/roles'
import { asyncNoop } from 'shared/utils/common/noop'

import TaskAssignee, { TaskAssigneeProps } from '../index'
import { getTakeTaskButton } from './utils'

describe('Блок "Исполнитель заявки"', () => {
  describe('Кнопка "В работу"', () => {
    const baseProps: Readonly<
      Pick<
        TaskAssigneeProps,
        | 'takeTask'
        | 'takeTaskIsLoading'
        | 'updateAssignee'
        | 'updateAssigneeIsLoading'
        | 'status'
        | 'extendedStatus'
        | 'workGroupListIsLoading'
        | 'hasReclassificationRequest'
      >
    > = {
      takeTask: asyncNoop,
      takeTaskIsLoading: false,
      updateAssignee: asyncNoop,
      updateAssigneeIsLoading: false,
      workGroupListIsLoading: false,
      hasReclassificationRequest: false,
      status: TaskStatusEnum.New,
      extendedStatus: TaskExtendedStatusEnum.New,
    }

    describe('Отображается для пользователя с ролью', () => {
      test(`${UserRolesEnum.FirstLineSupport}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<TaskAssignee {...baseProps} />, {
          store,
        })

        expect(getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.Engineer}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.Engineer,
        })

        render(<TaskAssignee {...baseProps} />, {
          store,
        })

        expect(getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.SeniorEngineer}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<TaskAssignee {...baseProps} />, { store })

        expect(getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.HeadOfDepartment}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<TaskAssignee {...baseProps} />, { store })

        expect(getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe('Не активна', () => {
      const activeBtnProps: Readonly<
        Pick<TaskDetailsModel, 'status' | 'extendedStatus' | 'assignee'>
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

          render(
            <TaskAssignee
              {...baseProps}
              {...activeBtnProps}
              status={TaskStatusEnum.InProgress}
            />,
            { store },
          )

          expect(getTakeTaskButton()).toBeDisabled()
        })

        test('Но исполнитель заявки назначен и не является авторизованным пользователем', async () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(<TaskAssignee {...baseProps} {...activeBtnProps} />, { store })

          expect(getTakeTaskButton()).toBeDisabled()
        })

        test(`Но расширенный статус заявки "${TaskExtendedStatusEnum.InReclassification}"`, async () => {
          const store = getStoreWithAuth({
            userId: activeBtnProps.assignee!.id,
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <TaskAssignee
              {...baseProps}
              {...activeBtnProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store },
          )

          expect(getTakeTaskButton()).toBeDisabled()
        })
      })
    })
  })
})
