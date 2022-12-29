import {
  expectOptionDisabled,
  generateId,
  getAllSelectOption,
  getButtonIn,
  getSelect,
  getSelectOption_new,
  getSelectedOption,
  getStoreWithAuth,
  loadingStartedByButton,
  loadingStartedBySelect,
  querySelect,
  render,
  selectDisabled,
  selectNotDisabled,
  userClickOption,
  userOpenSelect,
} from '_tests_/utils'
import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/features/TaskAssignee/TaskAssignee.test'
import { WorkGroupListItemModel } from 'modules/workGroup/models'
import { UserRolesEnum } from 'shared/constants/roles'
import { ArrayItem, NonNullableObject } from 'shared/interfaces/utils'

import AssigneeBlock, { AssigneeBlockProps } from './index'

const requiredProps: Readonly<
  NonNullableObject<
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

const showSelectAssigneeProps: Readonly<
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

const takeTaskExpectLoadingStarted = () =>
  loadingStartedByButton(getTakeTaskButton())

const getAssignOnMeButton = () =>
  getButtonIn(getContainer(), /назначить на себя/i)

const userClickAssignOnMeButton = async (user: UserEvent) => {
  const button = getAssignOnMeButton()
  await user.click(button)
  return button
}

const assignOnMeExpectLoadingStarted = () =>
  loadingStartedByButton(getAssignOnMeButton())

const getRefuseTaskButton = () =>
  getButtonIn(getContainer(), /отказаться от заявки/i)

const userClickRefuseTaskButton = async (user: UserEvent) => {
  const button = getRefuseTaskButton()
  await user.click(button)
  return button
}

const refuseTaskExpectLoadingStarted = () =>
  loadingStartedByButton(getRefuseTaskButton())

const getAssigneeSelect = (opts?: ByRoleOptions) =>
  getSelect(getContainer(), opts)

const queryAssigneeSelect = () => querySelect(getContainer())

const getSelectedAssignee = () => getSelectedOption(getContainer())

const openAssigneeSelect = (user: UserEvent) =>
  userOpenSelect(user, getContainer())

const selectAssignee = userClickOption

const getAssigneeOption = getSelectOption_new

const getAllAssigneeOption = getAllSelectOption

const expectAssigneeSelectLoadingStarted = () =>
  loadingStartedBySelect(getContainer())

const expectAssigneeSelectDisabled = () => selectDisabled(getContainer())

const expectAssigneeSelectNotDisabled = () => selectNotDisabled(getContainer())

export const testUtils = {
  getContainer,
  getChildByText,

  getTakeTaskButton,
  userClickTakeTaskButton,
  takeTaskExpectLoadingStarted,

  getAssignOnMeButton,
  userClickAssignOnMeButton,
  assignOnMeExpectLoadingStarted,

  getRefuseTaskButton,
  userClickRefuseTaskButton,
  refuseTaskExpectLoadingStarted,

  getAssigneeSelect,
  queryAssigneeSelect,
  getSelectedAssignee,
  openAssigneeSelect,
  selectAssignee,
  getAssigneeOption,
  getAllAssigneeOption,
  expectAssigneeSelectLoadingStarted,
  expectAssigneeSelectDisabled,
  expectAssigneeSelectNotDisabled,
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
      describe('Выбор исполнителя', () => {
        describe('Отображается корректно если условия соблюдены', () => {
          test('И старший инженер из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...showSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRolesEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.getAssigneeSelect()).toBeInTheDocument()
            await testUtils.expectAssigneeSelectNotDisabled()
          })

          test('И глава отдела из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...showSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: showSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRolesEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.getAssigneeSelect()).toBeInTheDocument()
            await testUtils.expectAssigneeSelectNotDisabled()
          })
        })

        describe('Не отображается если условия соблюдены', () => {
          test('Но статус заявки "Закрыта"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...showSelectAssigneeProps}
                status={TaskStatusEnum.Closed}
              />,
              {
                store: getStoreWithAuth({
                  userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRolesEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })

          test('Но статус заявки "Завершена"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...showSelectAssigneeProps}
                status={TaskStatusEnum.Completed}
              />,
              {
                store: getStoreWithAuth({
                  userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRolesEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })

          test('Но старший инженер или глава отдела из рабочей группы не являются авторизованным пользователем', () => {
            render(
              <AssigneeBlock {...requiredProps} {...showSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userRole: UserRolesEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })
        })

        test('Имеет значение по умолчанию если есть исполнитель', () => {
          render(
            <AssigneeBlock {...requiredProps} {...showSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRolesEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.getSelectedAssignee()).toHaveTextContent(
            String(requiredProps.assignee.id),
          )
        })

        test('Не имеет значения по умолчанию если нет исполнителя', () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...showSelectAssigneeProps}
              assignee={null}
            />,
            {
              store: getStoreWithAuth({
                userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRolesEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()
        })

        test('Отображает состояние загрузки во время загрузки рабочих групп', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...showSelectAssigneeProps}
              workGroupListIsLoading
            />,
            {
              store: getStoreWithAuth({
                userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRolesEnum.SeniorEngineer,
              }),
            },
          )

          await testUtils.expectAssigneeSelectLoadingStarted()
        })

        test('Не активен во время обновления исполнителя', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...showSelectAssigneeProps}
              updateAssigneeIsLoading
            />,
            {
              store: getStoreWithAuth({
                userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRolesEnum.SeniorEngineer,
              }),
            },
          )

          await testUtils.expectAssigneeSelectDisabled()
        })

        test('Корректно отображает варианты выбора', async () => {
          const { user } = render(
            <AssigneeBlock {...requiredProps} {...showSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRolesEnum.SeniorEngineer,
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)

          expect(testUtils.getAllAssigneeOption()).toHaveLength(
            showSelectAssigneeProps.workGroup.members.length,
          )
        })

        test('Можно выбрать исполнителя', async () => {
          const { user } = render(
            <AssigneeBlock
              {...requiredProps}
              {...showSelectAssigneeProps}
              assignee={null}
            />,
            {
              store: getStoreWithAuth({
                userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRolesEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()

          await testUtils.openAssigneeSelect(user)
          await testUtils.selectAssignee(
            user,
            showSelectAssigneeProps.workGroup.members[0].fullName,
          )

          expect(testUtils.getSelectedAssignee()).toBeInTheDocument()
        })

        describe('Вариант исполнителя не активен', () => {
          test('Если выбранный исполнитель является исполнителем заявки', async () => {
            const assigneeOption: ArrayItem<WorkGroupListItemModel['members']> =
              {
                ...showSelectAssigneeProps.workGroup.members[0],
                id: requiredProps.assignee.id,
              }

            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...showSelectAssigneeProps}
                workGroup={{
                  ...showSelectAssigneeProps.workGroup,
                  members: [assigneeOption],
                }}
              />,
              {
                store: getStoreWithAuth({
                  userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRolesEnum.SeniorEngineer,
                }),
              },
            )

            await testUtils.openAssigneeSelect(user)
            await expectOptionDisabled(
              testUtils.getAssigneeOption(assigneeOption.id),
            )
          })

          test('Если выбранный исполнитель является авторизованным пользователем', async () => {
            const assigneeOption: ArrayItem<WorkGroupListItemModel['members']> =
              {
                ...showSelectAssigneeProps.workGroup.members[0],
                id: showSelectAssigneeProps.workGroup.seniorEngineer.id,
              }

            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...showSelectAssigneeProps}
                workGroup={{
                  ...showSelectAssigneeProps.workGroup,
                  members: [assigneeOption],
                }}
              />,
              {
                store: getStoreWithAuth({
                  userId: showSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRolesEnum.SeniorEngineer,
                }),
              },
            )

            await testUtils.openAssigneeSelect(user)
            await expectOptionDisabled(
              testUtils.getAssigneeOption(assigneeOption.id),
            )
          })
        })
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
