import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as taskAssigneeTestUtils } from 'modules/task/components/TaskAssignee/TaskAssignee.test'
import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { TaskWorkGroupModel } from 'modules/task/models'
import { UserPermissionsEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import { ArrayFirst, SetNonNullable } from 'shared/types/utils'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { buttonTestUtils, fakeId, getStoreWithAuth, render, selectTestUtils } from '_tests_/utils'

import AssigneeBlock, { AssigneeBlockProps } from './index'

const props: Readonly<SetNonNullable<AssigneeBlockProps>> = {
  id: fakeId(),
  userActions: userFixtures.userActions(),
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  assignee: taskFixtures.assignee(),
  workGroup: taskFixtures.workGroup(),
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
}

export const activeTakeTaskButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'assignee' | 'status' | 'extendedStatus' | 'userActions'>
> = {
  assignee: null,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanExecute]: [props.id],
    },
  }),
}

export const activeAssignOnMeButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const activeAssignButtonProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'status' | 'extendedStatus' | 'assignee'>>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  assignee: taskFixtures.assignee(),
}

const showRefuseTaskButtonProps: Readonly<SetNonNullable<Pick<AssigneeBlockProps, 'assignee'>>> = {
  assignee: taskFixtures.assignee(),
}

const activeRefuseTaskButtonProps: Readonly<Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>> =
  {
    status: TaskStatusEnum.New,
    extendedStatus: TaskExtendedStatusEnum.New,
  }

export const canSelectAssigneeProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'status' | 'workGroup'>>
> = {
  status: TaskStatusEnum.New,
  workGroup: taskFixtures.workGroup(),
}

const getContainer = () => screen.getByTestId('task-assignee-block')
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// take task
const getTakeTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), /в работу/i)

const clickTakeTaskButton = async (user: UserEvent) => {
  const button = getTakeTaskButton()
  await user.click(button)
  return button
}

const takeTaskExpectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getTakeTaskButton())

// assign on me button
const getAssignOnMeButton = () => buttonTestUtils.getButtonIn(getContainer(), /назначить на себя$/i)

const clickAssignOnMeButton = async (user: UserEvent) => {
  const button = getAssignOnMeButton()
  await user.click(button)
  return button
}

const assignOnMeExpectLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getAssignOnMeButton())

const assignOnMeExpectLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getAssignOnMeButton())

// assign button
const getAssignButton = () => buttonTestUtils.getButtonIn(getContainer(), /назначить$/i)

const queryAssignButton = () => buttonTestUtils.queryButtonIn(getContainer(), /назначить$/i)

const clickAssignButton = async (user: UserEvent) => {
  const button = getAssignButton()
  await user.click(button)
  return button
}

const assignExpectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getAssignButton())

// refuse task
const getRefuseTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /отказаться от заявки/i)

const userClickRefuseTaskButton = async (user: UserEvent) => {
  const button = getRefuseTaskButton()
  await user.click(button)
  return button
}

const refuseTaskExpectLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getRefuseTaskButton())

// assignee select
const getAssigneeSelect = () => selectTestUtils.getSelect(getContainer())
const queryAssigneeSelect = () => selectTestUtils.querySelect(getContainer())
const findAssigneeSelect = () => selectTestUtils.findSelect(getContainer())
const getSelectedAssignee = () => selectTestUtils.getSelectedOption(getContainer())
const openAssigneeSelect = (user: UserEvent) => selectTestUtils.openSelect(user, getContainer())
const selectAssignee = selectTestUtils.clickSelectOption
const getAssigneeOption = selectTestUtils.getSelectOptionById
const getAllAssigneeOption = selectTestUtils.getAllSelectOption

const expectAssigneeSelectLoadingStarted = () =>
  selectTestUtils.expectLoadingStarted(getContainer())

const expectAssigneeSelectDisabled = () => selectTestUtils.selectDisabledIn(getContainer())
const expectAssigneeSelectNotDisabled = () => selectTestUtils.selectNotDisabledIn(getContainer())

export const testUtils = {
  getContainer,
  getChildByText,

  getTakeTaskButton,
  clickTakeTaskButton,
  takeTaskExpectLoadingStarted,

  getAssignButton,
  queryAssignButton,
  clickAssignButton,
  assignExpectLoadingStarted,

  getAssignOnMeButton,
  clickAssignOnMeButton,
  assignOnMeExpectLoadingStarted,
  assignOnMeExpectLoadingFinished,

  getRefuseTaskButton,
  userClickRefuseTaskButton,
  refuseTaskExpectLoadingStarted,

  getAssigneeSelect,
  queryAssigneeSelect,
  findAssigneeSelect,
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
    render(<AssigneeBlock {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    expect(testUtils.getChildByText(/исполнитель/i)).toBeInTheDocument()
  })

  describe('Кнопка "Назначить на себя"', () => {
    test('Отображается если текущий пользователь не исполнитель заявки', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(testUtils.getAssignOnMeButton()).toBeInTheDocument()
    })

    test(`Активна если условия соблюдены и есть права ${UserPermissionsEnum.SelfAssigneeTasksUpdate}`, () => {
      render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate] }),
          },
        }),
      })

      expect(testUtils.getAssignOnMeButton()).toBeEnabled()
    })

    test(`Активна если условия соблюдены и есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
      render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
          },
        }),
      })

      expect(testUtils.getAssignOnMeButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки "Закрыта"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            status={TaskStatusEnum.Closed}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            status={TaskStatusEnum.Completed}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но статус заявки "В ожидании"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            status={TaskStatusEnum.Awaiting}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но расширенный статус заявки "На переклассификации"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но статус заявки на ожидание "Новый"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но статус заявки на ожидание "В процессе"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test('Но нет прав', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })
    })

    test('Переданный обработчик вызывается корректно', async () => {
      const currentUserId = fakeId()

      const { user } = render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
        store: getStoreWithAuth({ id: currentUserId }, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({
              permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate],
            }),
          },
        }),
      })

      await testUtils.clickAssignOnMeButton(user)

      expect(props.updateAssignee).toBeCalledTimes(1)
      expect(props.updateAssignee).toBeCalledWith(currentUserId)
    })

    describe('После назначения на себя', () => {
      test('Кнопка "Назначить" становится не активна', async () => {
        const { user } = render(
          <AssigneeBlock
            {...props}
            {...activeAssignOnMeButtonProps}
            {...canSelectAssigneeProps}
            {...activeAssignButtonProps}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        await testUtils.openAssigneeSelect(user)
        await testUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )

        const button = testUtils.getAssignButton()
        expect(button).toBeEnabled()

        await testUtils.clickAssignOnMeButton(user)
        expect(button).toBeDisabled()
      })
    })
  })

  describe('Кнопка "Отказаться от заявки"', () => {
    test('Отображается если текущий пользователь исполнитель заявки', () => {
      render(<AssigneeBlock {...props} {...showRefuseTaskButtonProps} />, {
        store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(testUtils.getRefuseTaskButton()).toBeInTheDocument()
    })

    test('Активна если условия соблюдены', () => {
      render(
        <AssigneeBlock
          {...props}
          {...showRefuseTaskButtonProps}
          {...activeRefuseTaskButtonProps}
        />,
        {
          store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        },
      )

      expect(testUtils.getRefuseTaskButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки "Закрыта"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            status={TaskStatusEnum.Closed}
          />,
          {
            store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но статус заявки "Завершена"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            status={TaskStatusEnum.Completed}
          />,
          {
            store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но статус заявки "В ожидании"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            status={TaskStatusEnum.Awaiting}
          />,
          {
            store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но расширенный статус заявки "На переклассификации"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но статус заявки на ожидание "Новый"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
          {
            store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })

      test('Но статус заявки на ожидание "В процессе"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...showRefuseTaskButtonProps}
            {...activeRefuseTaskButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getRefuseTaskButton()).toBeDisabled()
      })
    })
  })

  describe('Кнопка "В работу"', () => {
    test('Отображается', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      const button = testUtils.getTakeTaskButton()
      expect(button).toBeInTheDocument()
    })

    test('Активна если условия соблюдены', () => {
      render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(props.assignee!, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      const button = testUtils.getTakeTaskButton()
      expect(button).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки не "Новая"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeTakeTaskButtonProps}
            status={TaskStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth(props.assignee!, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но исполнитель назначен и не является авторизованным пользователем', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeTakeTaskButtonProps}
            assignee={taskFixtures.assignee()}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но расширенный статус заявки "На переклассификации"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeTakeTaskButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth(props.assignee!, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test(`Но ${TaskActionsPermissionsEnum.CanExecute} не содержит id заявки`, () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeTakeTaskButtonProps}
            userActions={userFixtures.userActions()}
          />,
          {
            store: getStoreWithAuth(props.assignee!, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        const button = testUtils.getTakeTaskButton()
        expect(button).toBeDisabled()
      })

      test('Но статус заявки на ожидание "Новый"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeTakeTaskButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
          {
            store: getStoreWithAuth(props.assignee!, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но статус заявки на ожидание "В процессе"', () => {
        render(
          <AssigneeBlock
            {...props}
            {...activeTakeTaskButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth(props.assignee!, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(props.assignee!, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.clickTakeTaskButton(user)
      expect(props.takeTask).toBeCalledTimes(1)
    })
  })

  describe('Блок выбора исполнителя', () => {
    describe('Выбор исполнителя', () => {
      test('Отображается если условия соблюдены', async () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(testUtils.getAssigneeSelect()).toBeInTheDocument()
        await testUtils.expectAssigneeSelectNotDisabled()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но статус заявки "Закрыта"', () => {
          render(
            <AssigneeBlock {...props} {...canSelectAssigneeProps} status={TaskStatusEnum.Closed} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
        })

        test('Но статус заявки "Завершена"', () => {
          render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              status={TaskStatusEnum.Completed}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
        })

        test('Но нет рабочей группы', () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} workGroup={null} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                }),
              },
            }),
          })

          expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
        })

        test('Но нет прав', () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} workGroup={null} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          })

          expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
        })
      })

      test('Имеет значение по умолчанию если есть исполнитель', () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(testUtils.getSelectedAssignee()).toHaveTextContent(String(props.assignee.id))
      })

      test('Не имеет значения по умолчанию если нет исполнителя', () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} assignee={null} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()
      })

      test('Верно отображает варианты выбора', async () => {
        const { user } = render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        await testUtils.openAssigneeSelect(user)

        expect(testUtils.getAllAssigneeOption()).toHaveLength(
          canSelectAssigneeProps.workGroup.members.length,
        )
      })

      test('Можно выбрать исполнителя', async () => {
        const { user } = render(
          <AssigneeBlock {...props} {...canSelectAssigneeProps} assignee={null} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()

        await testUtils.openAssigneeSelect(user)
        await testUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )

        expect(testUtils.getSelectedAssignee()).toBeInTheDocument()
      })

      describe('Вариант исполнителя не активен', () => {
        test('Если выбранный исполнитель является исполнителем заявки', async () => {
          const assigneeOption: ArrayFirst<TaskWorkGroupModel['members']> = {
            ...canSelectAssigneeProps.workGroup.members[0],
            id: props.assignee.id,
          }

          const { user } = render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              workGroup={{
                ...canSelectAssigneeProps.workGroup,
                members: [assigneeOption],
              }}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)
          await selectTestUtils.expectOptionDisabled(testUtils.getAssigneeOption(assigneeOption.id))
        })

        test('Если выбранный исполнитель является авторизованным пользователем', async () => {
          const assigneeOption: ArrayFirst<TaskWorkGroupModel['members']> = {
            ...canSelectAssigneeProps.workGroup.members[0],
            id: props.assignee.id,
          }

          const { user } = render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              workGroup={{
                ...canSelectAssigneeProps.workGroup,
                members: [assigneeOption],
              }}
            />,
            {
              store: getStoreWithAuth(props.assignee, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)
          await selectTestUtils.expectOptionDisabled(testUtils.getAssigneeOption(assigneeOption.id))
        })
      })
    })

    test('Исполнитель отображается если его нельзя выбрать и если он есть', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(taskAssigneeTestUtils.getContainerIn(testUtils.getContainer())).toBeInTheDocument()
    })

    describe('Исполнитель не отображается', () => {
      test('Если его можно выбрать и если он есть', () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Если его нельзя выбрать и если его нет', () => {
        render(<AssigneeBlock {...props} assignee={null} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })
    })

    test('Отображается соответствующий текст если исполнителя нельзя выбрать и если его нет', () => {
      render(<AssigneeBlock {...props} assignee={null} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
    })

    test('Отображается кнопка "В работу"', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
    })

    describe('Кнопка "Назначить"', () => {
      test('Отображается если условия соблюдены', async () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(testUtils.getAssignButton()).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но статус заявки "Закрыта"', () => {
          render(
            <AssigneeBlock {...props} {...canSelectAssigneeProps} status={TaskStatusEnum.Closed} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
        })

        test('Но статус заявки "Завершена"', () => {
          render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              status={TaskStatusEnum.Completed}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
        })

        test('Но нет рабочей группы', () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} workGroup={null} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                }),
              },
            }),
          })

          expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
        })

        test('Но нет прав', () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          })

          expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
        })
      })

      describe('Активна если условия соблюдены', () => {
        test('И если есть исполнитель заявки и если выбрать другого', async () => {
          const { user } = render(
            <AssigneeBlock {...props} {...canSelectAssigneeProps} {...activeAssignButtonProps} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)
          await testUtils.selectAssignee(
            user,
            getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
          )

          const button = testUtils.getAssignButton()

          await waitFor(() => {
            expect(button).toBeEnabled()
          })
        })
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но есть исполнитель заявки и другой не выбран', () => {
          render(
            <AssigneeBlock {...props} {...canSelectAssigneeProps} {...activeAssignButtonProps} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.getAssignButton()).toBeDisabled()
        })

        test('Но выбранный исполнитель является авторизованным пользователем', () => {
          render(
            <AssigneeBlock {...props} {...canSelectAssigneeProps} {...activeAssignButtonProps} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.getAssignButton()).toBeDisabled()
        })

        test('Но нет исполнителя заявки', () => {
          render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              {...activeAssignButtonProps}
              assignee={null}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.getAssignButton()).toBeDisabled()
        })

        test('Но статус заявки "В ожидании"', () => {
          render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              {...activeAssignButtonProps}
              status={TaskStatusEnum.Awaiting}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.getAssignButton()).toBeDisabled()
        })

        test('Но расширенный статус заявки "На переклассификации"', () => {
          render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              {...activeAssignButtonProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock({
                    permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                  }),
                },
              }),
            },
          )

          expect(testUtils.getAssignButton()).toBeDisabled()
        })
      })

      test('Переданный обработчик вызывается корректно', async () => {
        const { user } = render(
          <AssigneeBlock {...props} {...canSelectAssigneeProps} {...activeAssignButtonProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
                }),
              },
            }),
          },
        )

        await testUtils.openAssigneeSelect(user)
        await testUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )
        await testUtils.clickAssignButton(user)

        expect(props.updateAssignee).toBeCalledTimes(1)
        expect(props.updateAssignee).toBeCalledWith(canSelectAssigneeProps.workGroup.members[0].id)
      })
    })
  })
})
