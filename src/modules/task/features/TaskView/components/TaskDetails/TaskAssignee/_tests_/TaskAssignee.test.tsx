import { getStoreWithAuth, render } from '_tests_/utils'
import { taskFixtures } from 'fixtures/task'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import { UserRolesEnum } from 'shared/constants/roles'

import TaskAssignee, { TaskAssigneeProps } from '../index'
import testUtils from './utils'

describe('Блок "Исполнитель заявки"', () => {
  describe('Кнопка "В работу"', () => {
    const requiredProps: Readonly<
      Pick<
        TaskAssigneeProps,
        | 'takeTask'
        | 'takeTaskIsLoading'
        | 'updateAssignee'
        | 'updateAssigneeIsLoading'
        | 'status'
        | 'extendedStatus'
        | 'assignee'
        | 'workGroupListIsLoading'
      >
    > = {
      takeTask: async () => {},
      takeTaskIsLoading: false,
      updateAssignee: async () => {},
      updateAssigneeIsLoading: false,
      workGroupListIsLoading: false,
      status: TaskStatusEnum.New,
      extendedStatus: TaskExtendedStatusEnum.New,
      assignee: null,
    }

    describe('Отображается для пользователя с ролью', () => {
      test(`${UserRolesEnum.FirstLineSupport}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<TaskAssignee {...requiredProps} />, {
          store,
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.Engineer}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.Engineer,
        })

        render(<TaskAssignee {...requiredProps} />, {
          store,
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.SeniorEngineer}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<TaskAssignee {...requiredProps} />, { store })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test(`${UserRolesEnum.HeadOfDepartment}`, () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<TaskAssignee {...requiredProps} />, { store })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe('Не активна если все условия соблюдены', () => {
      const activeBtnProps: Readonly<
        Pick<TaskDetailsModel, 'status' | 'extendedStatus' | 'assignee'>
      > = {
        status: TaskStatusEnum.New,
        extendedStatus: TaskExtendedStatusEnum.New,
        assignee: taskFixtures.getTaskAssignee(),
      }

      test(`Но статус заявки не "${TaskStatusEnum.New}"`, async () => {
        const store = getStoreWithAuth({
          userId: activeBtnProps.assignee!.id,
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <TaskAssignee
            {...requiredProps}
            {...activeBtnProps}
            status={TaskStatusEnum.InProgress}
          />,
          { store },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но исполнитель заявки назначен и не является авторизованным пользователем', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<TaskAssignee {...requiredProps} {...activeBtnProps} />, {
          store,
        })

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test(`Но расширенный статус заявки "${TaskExtendedStatusEnum.InReclassification}"`, async () => {
        const store = getStoreWithAuth({
          userId: activeBtnProps.assignee!.id,
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <TaskAssignee
            {...requiredProps}
            {...activeBtnProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          { store },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })
    })
  })
})
