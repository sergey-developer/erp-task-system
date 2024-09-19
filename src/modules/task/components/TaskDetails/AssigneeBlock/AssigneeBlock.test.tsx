import { waitFor } from '@testing-library/react'

import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { TaskWorkGroupModel } from 'modules/task/models'
import { UserPermissionsEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'
import { ArrayFirst } from 'shared/types/utils'

import { taskAssigneeTestUtils } from '_tests_/features/tasks/TaskAssignee/testUtils'
import {
  activeAssignButtonProps,
  activeAssignOnMeButtonProps,
  activeRefuseTaskButtonProps,
  activeTakeTaskButtonProps,
  canSelectAssigneeProps,
  props,
  showRefuseTaskButtonProps,
} from '_tests_/features/tasks/TaskDetails/AssigneeBlock/constants'
import { assigneeBlockTestUtils } from '_tests_/features/tasks/TaskDetails/AssigneeBlock/testUtils'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { fakeId, getStoreWithAuth, render, selectTestUtils } from '_tests_/utils'

import AssigneeBlock from './index'

describe('Блок "Исполнитель заявки"', () => {
  test('Заголовок блока отображается', () => {
    render(<AssigneeBlock {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    expect(assigneeBlockTestUtils.getChildByText(/исполнитель/i)).toBeInTheDocument()
  })

  describe('Кнопка "Назначить на себя"', () => {
    test('Отображается если текущий пользователь не исполнитель заявки', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeInTheDocument()
    })

    test(`Активна если условия соблюдены и есть права ${UserPermissionsEnum.SelfAssigneeTasksUpdate}`, () => {
      render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate] }),
          },
        }),
      })

      expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeEnabled()
    })

    test(`Активна если условия соблюдены и есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
      render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
          },
        }),
      })

      expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeEnabled()
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

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
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

      await assigneeBlockTestUtils.clickAssignOnMeButton(user)

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

        await assigneeBlockTestUtils.openAssigneeSelect(user)
        await assigneeBlockTestUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )

        const button = assigneeBlockTestUtils.getAssignButton()
        expect(button).toBeEnabled()

        await assigneeBlockTestUtils.clickAssignOnMeButton(user)
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

      expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeInTheDocument()
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

      expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeEnabled()
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

        expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeDisabled()
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

      const button = assigneeBlockTestUtils.getTakeTaskButton()
      expect(button).toBeInTheDocument()
    })

    test('Активна если условия соблюдены', () => {
      render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(props.assignee!, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      const button = assigneeBlockTestUtils.getTakeTaskButton()
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

        expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeDisabled()
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

        const button = assigneeBlockTestUtils.getTakeTaskButton()
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

        expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeDisabled()
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

        expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeDisabled()
      })
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(props.assignee!, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await assigneeBlockTestUtils.clickTakeTaskButton(user)
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

        expect(assigneeBlockTestUtils.getAssigneeSelect()).toBeInTheDocument()
        await assigneeBlockTestUtils.expectAssigneeSelectNotDisabled()
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

          expect(assigneeBlockTestUtils.queryAssigneeSelect()).not.toBeInTheDocument()
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

          expect(assigneeBlockTestUtils.queryAssigneeSelect()).not.toBeInTheDocument()
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

          expect(assigneeBlockTestUtils.queryAssigneeSelect()).not.toBeInTheDocument()
        })

        test('Но нет прав', () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} workGroup={null} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          })

          expect(assigneeBlockTestUtils.queryAssigneeSelect()).not.toBeInTheDocument()
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

        expect(assigneeBlockTestUtils.getSelectedAssignee()).toHaveTextContent(
          getFullUserName(props.assignee),
        )
      })

      test('Не имеет значения по умолчанию если нет исполнителя', () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} assignee={null} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(assigneeBlockTestUtils.getSelectedAssignee()).not.toBeInTheDocument()
      })

      test('Верно отображает варианты выбора если нет исполнителя', async () => {
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

        await assigneeBlockTestUtils.openAssigneeSelect(user)

        expect(assigneeBlockTestUtils.getAllAssigneeOption()).toHaveLength(
          canSelectAssigneeProps.workGroup.members.length,
        )
      })

      test('Верно отображает варианты выбора если есть исполнитель', async () => {
        const { user } = render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
              }),
            },
          }),
        })

        await assigneeBlockTestUtils.openAssigneeSelect(user)

        expect(assigneeBlockTestUtils.getAllAssigneeOption()).toHaveLength(
          canSelectAssigneeProps.workGroup.members.length + 1,
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

        expect(assigneeBlockTestUtils.getSelectedAssignee()).not.toBeInTheDocument()

        await assigneeBlockTestUtils.openAssigneeSelect(user)
        await assigneeBlockTestUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )

        expect(assigneeBlockTestUtils.getSelectedAssignee()).toBeInTheDocument()
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

          await assigneeBlockTestUtils.openAssigneeSelect(user)
          await selectTestUtils.expectOptionDisabled(
            assigneeBlockTestUtils.getAssigneeOption(assigneeOption.id),
          )
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

          await assigneeBlockTestUtils.openAssigneeSelect(user)
          await selectTestUtils.expectOptionDisabled(
            assigneeBlockTestUtils.getAssigneeOption(assigneeOption.id),
          )
        })
      })
    })

    test('Исполнитель отображается если его нельзя выбрать и если он есть', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(
        taskAssigneeTestUtils.getContainerIn(assigneeBlockTestUtils.getContainer()),
      ).toBeInTheDocument()
    })

    describe('Исполнитель не отображается', () => {
      test('Если его можно выбрать и если он есть', () => {
        render(
          <AssigneeBlock
            {...props}
            {...canSelectAssigneeProps}
            assignee={null}
            workGroup={{ ...canSelectAssigneeProps.workGroup, members: [] }}
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

        expect(
          taskAssigneeTestUtils.queryContainerIn(assigneeBlockTestUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Если его нельзя выбрать и если его нет', () => {
        render(<AssigneeBlock {...props} assignee={null} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(assigneeBlockTestUtils.getContainer()),
        ).not.toBeInTheDocument()
      })
    })

    test('Отображается соответствующий текст если исполнителя нельзя выбрать и если его нет', () => {
      render(<AssigneeBlock {...props} assignee={null} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(assigneeBlockTestUtils.getChildByText(NO_ASSIGNEE_TEXT)).toBeInTheDocument()
    })

    test('Отображается кнопка "В работу"', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeInTheDocument()
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

        expect(assigneeBlockTestUtils.getAssignButton()).toBeInTheDocument()
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

          expect(assigneeBlockTestUtils.queryAssignButton()).not.toBeInTheDocument()
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

          expect(assigneeBlockTestUtils.queryAssignButton()).not.toBeInTheDocument()
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

          expect(assigneeBlockTestUtils.queryAssignButton()).not.toBeInTheDocument()
        })

        test('Но нет прав', () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          })

          expect(assigneeBlockTestUtils.queryAssignButton()).not.toBeInTheDocument()
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

          await assigneeBlockTestUtils.openAssigneeSelect(user)
          await assigneeBlockTestUtils.selectAssignee(
            user,
            getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
          )

          const button = assigneeBlockTestUtils.getAssignButton()

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

          expect(assigneeBlockTestUtils.getAssignButton()).toBeDisabled()
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

          expect(assigneeBlockTestUtils.getAssignButton()).toBeDisabled()
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

          expect(assigneeBlockTestUtils.getAssignButton()).toBeDisabled()
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

          expect(assigneeBlockTestUtils.getAssignButton()).toBeDisabled()
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

          expect(assigneeBlockTestUtils.getAssignButton()).toBeDisabled()
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

        await assigneeBlockTestUtils.openAssigneeSelect(user)
        await assigneeBlockTestUtils.selectAssignee(
          user,
          getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
        )
        await assigneeBlockTestUtils.clickAssignButton(user)

        expect(props.updateAssignee).toBeCalledTimes(1)
        expect(props.updateAssignee).toBeCalledWith(canSelectAssigneeProps.workGroup.members[0].id)
      })
    })
  })
})
