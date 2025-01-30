import { TaskActionsPermissionsEnum } from 'features/task/constants/task'
import { TaskWorkGroupModel } from 'features/task/models'
import { UserPermissionsEnum } from 'features/user/constants'
import { getFullUserName } from 'features/user/utils'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'
import { ArrayFirst } from 'shared/types/utils'

import { taskAssigneeTestUtils } from '_tests_/features/tasks/components/TaskAssignee/testUtils'
import {
  activeAssignOnMeButtonProps,
  activeRefuseTaskButtonProps,
  activeTakeTaskButtonProps,
  canSelectAssigneeProps,
  props,
  showRefuseTaskButtonProps,
} from '_tests_/features/tasks/components/TaskDetails/AssigneeBlock/constants'
import { assigneeBlockTestUtils } from '_tests_/features/tasks/components/TaskDetails/AssigneeBlock/testUtils'
import userFixtures from '_tests_/fixtures/user'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, render, selectTestUtils } from '_tests_/utils'

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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeInTheDocument()
    })

    describe('Активна', () => {
      test(`Если userActions содержит id заявки и есть права ${UserPermissionsEnum.SelfAssigneeTasksUpdate}`, () => {
        render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.SelfAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeEnabled()
      })

      test(`Если userActions содержит id заявки и есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
        render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeEnabled()
      })
    })

    describe('Не активна', () => {
      test(`Если есть права ${UserPermissionsEnum.SelfAssigneeTasksUpdate} и ${UserPermissionsEnum.AnyAssigneeTasksUpdate} но userActions не содержит id`, () => {
        render(
          <AssigneeBlock
            {...props}
            userActions={{
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanSelfAssignee]: [],
              },
            }}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock(
                  userFixtures.user({
                    permissions: [
                      UserPermissionsEnum.SelfAssigneeTasksUpdate,
                      UserPermissionsEnum.AnyAssigneeTasksUpdate,
                    ],
                  }),
                ),
              },
            }),
          },
        )

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test(`Если userActions содержит id но нет прав ${UserPermissionsEnum.SelfAssigneeTasksUpdate} или ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
        render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        expect(assigneeBlockTestUtils.getAssignOnMeButton()).toBeDisabled()
      })
    })

    test('Переданный обработчик вызывается корректно', async () => {
      const currentUser = userFixtures.user()

      const { user } = render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: activeAssignOnMeButtonProps.permissions }),
          },
        }),
      })

      await assigneeBlockTestUtils.clickAssignOnMeButton(user)

      expect(props.updateAssignee).toBeCalledTimes(1)
      expect(props.updateAssignee).toBeCalledWith(currentUser.id)
    })
  })

  describe('Кнопка "Отказаться от заявки"', () => {
    test('Отображается если текущий пользователь исполнитель заявки', () => {
      render(<AssigneeBlock {...props} {...showRefuseTaskButtonProps} />, {
        store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeInTheDocument()
    })

    test('Активна если userActions содержит id заявки', () => {
      render(
        <AssigneeBlock
          {...props}
          {...showRefuseTaskButtonProps}
          {...activeRefuseTaskButtonProps}
        />,
        {
          store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeEnabled()
    })

    test('Не активна если userActions не содержит id заявки', () => {
      render(
        <AssigneeBlock
          {...props}
          {...showRefuseTaskButtonProps}
          userActions={{
            tasks: {
              ...userFixtures.taskActionsPermissions,
              [TaskActionsPermissionsEnum.CanSelfAssignee]: [],
            },
          }}
        />,
        {
          store: getStoreWithAuth(showRefuseTaskButtonProps.assignee, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      expect(assigneeBlockTestUtils.getRefuseTaskButton()).toBeDisabled()
    })
  })

  describe('Кнопка "В работу"', () => {
    test('Отображается', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = assigneeBlockTestUtils.getTakeTaskButton()
      expect(button).toBeInTheDocument()
    })

    test('Активна если userActions содержит id заявки', () => {
      render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = assigneeBlockTestUtils.getTakeTaskButton()
      expect(button).toBeEnabled()
    })

    test('Не активна если userActions не содержит id заявки', () => {
      render(
        <AssigneeBlock
          {...props}
          userActions={{
            tasks: {
              ...userFixtures.taskActionsPermissions,
              [TaskActionsPermissionsEnum.CanExecute]: [],
            },
          }}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeDisabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await assigneeBlockTestUtils.clickTakeTaskButton(user)
      expect(props.takeTask).toBeCalledTimes(1)
    })
  })

  describe('Блок выбора исполнителя', () => {
    describe('Поле выбора исполнителя', () => {
      test(`Отображается и активно если userActions содержит id заявки и есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, async () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
              ),
            },
          }),
        })

        expect(assigneeBlockTestUtils.getAssigneeSelect()).toBeInTheDocument()
        await assigneeBlockTestUtils.expectAssigneeSelectNotDisabled()
      })

      describe('Не отображается', () => {
        test(`Если userActions содержит id заявки но нет прав ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          expect(assigneeBlockTestUtils.queryAssigneeSelect()).not.toBeInTheDocument()
        })

        test(`Если есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate} но userActions не содержит id заявки`, () => {
          render(
            <AssigneeBlock
              {...props}
              userActions={{
                tasks: {
                  ...userFixtures.taskActionsPermissions,
                  [TaskActionsPermissionsEnum.CanAssignee]: [],
                },
              }}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock(
                    userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
                  ),
                },
              }),
            },
          )

          expect(assigneeBlockTestUtils.queryAssigneeSelect()).not.toBeInTheDocument()
        })
      })

      test('Имеет значение по умолчанию если есть исполнитель', () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} assignee={props.assignee} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
              ),
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
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
              ),
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
                ...getUserMeQueryMock(
                  userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
                ),
              },
            }),
          },
        )

        await assigneeBlockTestUtils.openAssigneeSelect(user)

        expect(assigneeBlockTestUtils.getAllAssigneeOption()).toHaveLength(
          props.workGroup.members.length,
        )
      })

      test('Верно отображает варианты выбора если есть исполнитель', async () => {
        const { user } = render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
              ),
            },
          }),
        })

        await assigneeBlockTestUtils.openAssigneeSelect(user)

        expect(assigneeBlockTestUtils.getAllAssigneeOption()).toHaveLength(
          props.workGroup.members.length + 1,
        )
      })

      test('Можно выбрать исполнителя', async () => {
        const { user } = render(
          <AssigneeBlock {...props} {...canSelectAssigneeProps} assignee={null} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock(
                  userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
                ),
              },
            }),
          },
        )

        expect(assigneeBlockTestUtils.getSelectedAssignee()).not.toBeInTheDocument()

        await assigneeBlockTestUtils.openAssigneeSelect(user)
        await assigneeBlockTestUtils.setAssignee(user, getFullUserName(props.workGroup.members[0]))

        expect(assigneeBlockTestUtils.getSelectedAssignee()).toBeInTheDocument()
      })

      describe('Вариант исполнителя не активен', () => {
        test('Если выбранный исполнитель является исполнителем заявки', async () => {
          const assigneeOption: ArrayFirst<TaskWorkGroupModel['members']> = {
            ...props.workGroup.members[0],
            id: props.assignee.id,
          }

          const { user } = render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              workGroup={{ ...props.workGroup, members: [assigneeOption] }}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock(
                    userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
                  ),
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
            ...props.workGroup.members[0],
            id: props.assignee.id,
          }

          const { user } = render(
            <AssigneeBlock
              {...props}
              {...canSelectAssigneeProps}
              workGroup={{
                ...props.workGroup,
                members: [assigneeOption],
              }}
            />,
            {
              store: getStoreWithAuth(props.assignee, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock(
                    userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
                  ),
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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
            workGroup={{ ...props.workGroup, members: [] }}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock(
                  userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
                ),
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(assigneeBlockTestUtils.getChildByText(NO_ASSIGNEE_TEXT)).toBeInTheDocument()
    })

    test('Отображается кнопка "В работу"', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(assigneeBlockTestUtils.getTakeTaskButton()).toBeInTheDocument()
    })

    describe('Кнопка "Назначить"', () => {
      test(`Отображается и активна если userActions содержит id заявки и есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, async () => {
        render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
              ),
            },
          }),
        })

        const button = assigneeBlockTestUtils.getAssignButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      describe('Не отображается', () => {
        test(`Если userActions содержит id заявки но нет прав ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          expect(assigneeBlockTestUtils.queryAssignButton()).not.toBeInTheDocument()
        })

        test(`Если есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate} но userActions не содержит id заявки`, () => {
          render(
            <AssigneeBlock
              {...props}
              userActions={{
                tasks: {
                  ...userFixtures.taskActionsPermissions,
                  [TaskActionsPermissionsEnum.CanAssignee]: [],
                },
              }}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: {
                  ...getUserMeQueryMock(
                    userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
                  ),
                },
              }),
            },
          )

          expect(assigneeBlockTestUtils.queryAssignButton()).not.toBeInTheDocument()
        })
      })

      test('Переданный обработчик вызывается', async () => {
        const { user } = render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock(
                userFixtures.user({ permissions: canSelectAssigneeProps.permissions }),
              ),
            },
          }),
        })

        await assigneeBlockTestUtils.openAssigneeSelect(user)
        await assigneeBlockTestUtils.setAssignee(user, getFullUserName(props.workGroup.members[0]))
        await assigneeBlockTestUtils.clickAssignButton(user)

        expect(props.updateAssignee).toBeCalledTimes(1)
        expect(props.updateAssignee).toBeCalledWith(props.workGroup.members[0].id)
      })
    })
  })
})
