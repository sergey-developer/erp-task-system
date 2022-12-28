import {
  generateId,
  getButtonIn,
  getStoreWithAuth,
  loadingStartedByButton,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/features/TaskAssignee/TaskAssignee.test'
import { UserRolesEnum } from 'shared/constants/roles'
import { NonNullableObject } from 'shared/interfaces/utils'

import AssigneeBlock, { AssigneeBlockProps } from './index'

const requiredProps: Readonly<
  Pick<
    AssigneeBlockProps,
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
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
  workGroupListIsLoading: false,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  assignee: taskFixtures.getTaskAssignee(),
}

const activeTakeTaskButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

const showAssignOnMeButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'assignee'>
> = {
  assignee: null,
}

const activeAssignOnMeButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

const showRefuseTaskButtonProps: Readonly<
  NonNullableObject<Pick<AssigneeBlockProps, 'assignee'>>
> = {
  assignee: taskFixtures.getTaskAssignee(),
}

const activeRefuseTaskButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

const canSelectAssignee: Readonly<
  NonNullableObject<Pick<AssigneeBlockProps, 'status' | 'workGroup'>>
> = {
  status: TaskStatusEnum.New,
  workGroup: workGroupFixtures.getWorkGroup(),
}

const getContainer = () => screen.getByTestId('task-assignee-block')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const getTakeTaskButton = () => getButtonIn(getContainer(), /в работу/i)

const userClickTakeTaskButton = async (user: UserEvent) => {
  const button = getTakeTaskButton()
  await user.click(button)
  return button
}

const getAssignOnMeButton = () =>
  getButtonIn(getContainer(), /назначить на себя/i)

const userClickAssignOnMeButton = async (user: UserEvent) => {
  const button = getAssignOnMeButton()
  await user.click(button)
  return button
}

const getRefuseTaskButton = () =>
  getButtonIn(getContainer(), /отказаться от заявки/i)

const userClickRefuseTaskButton = async (user: UserEvent) => {
  const button = getRefuseTaskButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  getChildByText,

  getTakeTaskButton,
  userClickTakeTaskButton,
  takeTaskExpectLoadingStarted: () =>
    loadingStartedByButton(getTakeTaskButton()),

  getAssignOnMeButton,
  userClickAssignOnMeButton,
  assignOnMeExpectLoadingStarted: () =>
    loadingStartedByButton(getAssignOnMeButton()),

  getRefuseTaskButton,
  userClickRefuseTaskButton,
  refuseTaskExpectLoadingStarted: () =>
    loadingStartedByButton(getRefuseTaskButton()),
}

describe('Блок "Исполнитель заявки"', () => {
  test('Заголовок блока отображается', () => {
    const store = getStoreWithAuth({
      userRole: UserRolesEnum.FirstLineSupport,
    })

    render(<AssigneeBlock {...requiredProps} />, { store })

    expect(testUtils.getChildByText(/исполнитель/i)).toBeInTheDocument()
  })

  describe('Кнопка "Назначить на себя"', () => {
    test('Отображается', () => {
      render(
        <AssigneeBlock {...requiredProps} {...showAssignOnMeButtonProps} />,
        { store: getStoreWithAuth() },
      )

      expect(testUtils.getAssignOnMeButton()).toBeInTheDocument()
    })

    test('Отображает состояние загрузки', async () => {
      render(
        <AssigneeBlock
          {...requiredProps}
          {...showAssignOnMeButtonProps}
          updateAssigneeIsLoading
        />,
        { store: getStoreWithAuth() },
      )

      await testUtils.assignOnMeExpectLoadingStarted()
    })

    test('Активна если условия соблюдены', () => {
      render(
        <AssigneeBlock
          {...requiredProps}
          {...showAssignOnMeButtonProps}
          {...activeAssignOnMeButtonProps}
        />,
        { store: getStoreWithAuth() },
      )

      expect(testUtils.getAssignOnMeButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки "Закрыта"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showAssignOnMeButtonProps}
            {...activeAssignOnMeButtonProps}
            status={TaskStatusEnum.Closed}
          />,
          { store: getStoreWithAuth() },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showAssignOnMeButtonProps}
            {...activeAssignOnMeButtonProps}
            status={TaskStatusEnum.Completed}
          />,
          { store: getStoreWithAuth() },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но статус заявки "В ожидании"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showAssignOnMeButtonProps}
            {...activeAssignOnMeButtonProps}
            status={TaskStatusEnum.Awaiting}
          />,
          { store: getStoreWithAuth() },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но расширенный статус заявки "На переклассификации"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showAssignOnMeButtonProps}
            {...activeAssignOnMeButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          { store: getStoreWithAuth() },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })
    })

    test('Переданный обработчик вызывается корректно', async () => {
      const currentUserId = generateId()

      const { user } = render(
        <AssigneeBlock
          {...requiredProps}
          {...showAssignOnMeButtonProps}
          {...activeAssignOnMeButtonProps}
        />,
        { store: getStoreWithAuth({ userId: currentUserId }) },
      )

      await testUtils.userClickAssignOnMeButton(user)

      expect(requiredProps.updateAssignee).toBeCalledTimes(1)
      expect(requiredProps.updateAssignee).toBeCalledWith(currentUserId)
    })
  })

  describe('Кнопка "Отказаться от заявки"', () => {
    test('Отображается', () => {
      render(
        <AssigneeBlock {...requiredProps} {...showRefuseTaskButtonProps} />,
        {
          store: getStoreWithAuth({
            userId: showRefuseTaskButtonProps.assignee.id,
          }),
        },
      )

      expect(testUtils.getRefuseTaskButton()).toBeInTheDocument()
    })

    test('Отображает состояние загрузки', async () => {
      render(
        <AssigneeBlock
          {...requiredProps}
          {...showRefuseTaskButtonProps}
          updateAssigneeIsLoading
        />,
        {
          store: getStoreWithAuth({
            userId: showRefuseTaskButtonProps.assignee.id,
          }),
        },
      )

      await testUtils.refuseTaskExpectLoadingStarted()
    })

    test('Активна если условия соблюдены', () => {
      render(
        <AssigneeBlock
          {...requiredProps}
          {...showRefuseTaskButtonProps}
          {...activeRefuseTaskButtonProps}
        />,
        {
          store: getStoreWithAuth({
            userId: showRefuseTaskButtonProps.assignee.id,
          }),
        },
      )

      expect(testUtils.getRefuseTaskButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки "Закрыта"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            status={TaskStatusEnum.Closed}
          />,
          {
            store: getStoreWithAuth({
              userId: showRefuseTaskButtonProps.assignee.id,
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            status={TaskStatusEnum.Completed}
          />,
          {
            store: getStoreWithAuth({
              userId: showRefuseTaskButtonProps.assignee.id,
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но статус заявки "В ожидании"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            status={TaskStatusEnum.Awaiting}
          />,
          {
            store: getStoreWithAuth({
              userId: showRefuseTaskButtonProps.assignee.id,
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но расширенный статус заявки "На переклассификации"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth({
              userId: showRefuseTaskButtonProps.assignee.id,
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })
    })
  })

  describe('Кнопка "В работу"', () => {
    describe('Отображается для пользователя с ролью', () => {
      test('Первая линия поддержки', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<AssigneeBlock {...requiredProps} />, {
          store,
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test('Инженер', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.Engineer,
        })

        render(<AssigneeBlock {...requiredProps} />, {
          store,
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test('Старший инженер', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<AssigneeBlock {...requiredProps} />, { store })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test('Глава отдела', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<AssigneeBlock {...requiredProps} />, { store })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    test('Активна если условия соблюдены', () => {
      const store = getStoreWithAuth({
        userId: requiredProps.assignee!.id,
        userRole: UserRolesEnum.FirstLineSupport,
      })

      render(
        <AssigneeBlock {...requiredProps} {...activeTakeTaskButtonProps} />,
        { store },
      )

      expect(testUtils.getTakeTaskButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки не "Новая"', () => {
        const store = getStoreWithAuth({
          userId: requiredProps.assignee!.id,
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <AssigneeBlock
            {...requiredProps}
            {...activeTakeTaskButtonProps}
            status={TaskStatusEnum.InProgress}
          />,
          { store },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но исполнитель заявки назначен и не является авторизованным пользователем', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <AssigneeBlock {...requiredProps} {...activeTakeTaskButtonProps} />,
          { store },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но расширенный статус заявки "На переклассификации"', () => {
        const store = getStoreWithAuth({
          userId: requiredProps.assignee!.id,
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <AssigneeBlock
            {...requiredProps}
            {...activeTakeTaskButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          { store },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })
    })

    test('Отображает состояние загрузки', async () => {
      const store = getStoreWithAuth({
        userId: requiredProps.assignee!.id,
        userRole: UserRolesEnum.FirstLineSupport,
      })

      render(
        <AssigneeBlock
          {...requiredProps}
          {...activeTakeTaskButtonProps}
          takeTaskIsLoading
        />,
        { store },
      )

      await testUtils.takeTaskExpectLoadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const store = getStoreWithAuth({
        userId: requiredProps.assignee!.id,
        userRole: UserRolesEnum.FirstLineSupport,
      })

      const { user } = render(
        <AssigneeBlock {...requiredProps} {...activeTakeTaskButtonProps} />,
        { store },
      )

      await testUtils.userClickTakeTaskButton(user)
      expect(requiredProps.takeTask).toBeCalledTimes(1)
    })
  })

  describe('Блок выбора исполнителя', () => {
    describe('Роль - первая линия поддержки', () => {
      test('Исполнитель отображается если он есть', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          }),
        })

        expect(
          taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
        ).toBeInTheDocument()
      })

      test('Исполнитель не отображается если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Отображается соответствующий текст если исполнителя нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          }),
        })

        expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
      })

      test('Отображается кнопка "В работу"', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe('Роль - инженер', () => {
      test('Исполнитель отображается если он есть', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.Engineer,
          }),
        })

        expect(
          taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
        ).toBeInTheDocument()
      })

      test('Исполнитель не отображается если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.Engineer,
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Отображается соответствующий текст если исполнителя нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.Engineer,
          }),
        })

        expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
      })

      test('Отображается кнопка "В работу"', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.Engineer,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe('Роль - старший инженер', () => {
      test('Выбор исполнителя отображается если условия соблюдены', () => {})

      describe('Выбор исполнителя не отображается если условия соблюдены', () => {
        test('Но статус заявки "Закрыта"', () => {})

        test('Но статус заявки "Завершена"', () => {})

        test('Но старший инженер или глава отдела из рабочей группы не являются авторизованным пользователем', () => {})
      })

      test('Исполнитель отображается если его нельзя выбрать и если он уже есть', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          }),
        })

        expect(
          taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
        ).toBeInTheDocument()
      })

      test('Исполнитель не отображается если его нельзя выбрать и если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Отображается соответствующий текст если исполнителя нельзя выбрать и если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          }),
        })

        expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
      })

      test('Отображается кнопка "В работу"', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe('Роль - глава отдела', () => {})
  })
})
