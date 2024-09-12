import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as taskAssigneeTestUtils } from 'modules/task/components/TaskAssignee/TaskAssignee.test'
import { TaskActionsPermissionsEnum } from 'modules/task/constants/task'
import { TaskWorkGroupModel } from 'modules/task/models'
import { UserPermissionsEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'
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
  assignee: taskFixtures.assignee(),
  workGroup: taskFixtures.workGroup(),
}

export const activeTakeTaskButtonProps: Readonly<Pick<AssigneeBlockProps, 'userActions'>> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanExecute]: [props.id],
    },
  }),
}

export const activeAssignOnMeButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'userActions'> & { permissions: UserPermissionsEnum[] }
> = {
  userActions: {
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSelfAssignee]: [props.id],
    },
  },
  permissions: [
    UserPermissionsEnum.AnyAssigneeTasksUpdate,
    UserPermissionsEnum.SelfAssigneeTasksUpdate,
  ],
}

const showRefuseTaskButtonProps: Readonly<SetNonNullable<Pick<AssigneeBlockProps, 'assignee'>>> = {
  assignee: taskFixtures.assignee(),
}

const activeRefuseTaskButtonProps: Readonly<Pick<AssigneeBlockProps, 'userActions'>> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSelfAssignee]: [props.id],
    },
  }),
}

export const canSelectAssigneeProps: Readonly<
  SetNonNullable<Pick<AssigneeBlockProps, 'userActions'> & { permissions: UserPermissionsEnum[] }>
> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanAssignee]: [props.id],
    },
  }),
  permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate],
}

const getContainer = () => screen.getByTestId('task-assignee-block')
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// take task
const getTakeTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), /в работу/i)

const clickTakeTaskButton = async (user: UserEvent) => {
  const button = getTakeTaskButton()
  await user.click(button)
}

const takeTaskExpectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getTakeTaskButton())

// assign on me button
const getAssignOnMeButton = () => buttonTestUtils.getButtonIn(getContainer(), /назначить на себя$/i)
const clickAssignOnMeButton = async (user: UserEvent) => user.click(getAssignOnMeButton())

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
const setAssignee = selectTestUtils.clickSelectOption
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
  setAssignee,
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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(testUtils.getAssignOnMeButton()).toBeInTheDocument()
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

        expect(testUtils.getAssignOnMeButton()).toBeEnabled()
      })

      test(`Если userActions содержит id заявки и есть права ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
        render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.AnyAssigneeTasksUpdate] }),
            },
          }),
        })

        expect(testUtils.getAssignOnMeButton()).toBeEnabled()
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

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })

      test(`Если userActions содержит id но нет прав ${UserPermissionsEnum.SelfAssigneeTasksUpdate} или ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
        render(<AssigneeBlock {...props} {...activeAssignOnMeButtonProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
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

      await testUtils.clickAssignOnMeButton(user)

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

      expect(testUtils.getRefuseTaskButton()).toBeInTheDocument()
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

      expect(testUtils.getRefuseTaskButton()).toBeEnabled()
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

      expect(testUtils.getRefuseTaskButton()).toBeDisabled()
    })
  })

  describe('Кнопка "В работу"', () => {
    test('Отображается', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = testUtils.getTakeTaskButton()
      expect(button).toBeInTheDocument()
    })

    test('Активна если userActions содержит id заявки', () => {
      render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = testUtils.getTakeTaskButton()
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

      expect(testUtils.getTakeTaskButton()).toBeDisabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<AssigneeBlock {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.clickTakeTaskButton(user)
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

        expect(testUtils.getAssigneeSelect()).toBeInTheDocument()
        await testUtils.expectAssigneeSelectNotDisabled()
      })

      describe('Не отображается', () => {
        test(`Если userActions содержит id заявки но нет прав ${UserPermissionsEnum.AnyAssigneeTasksUpdate}`, () => {
          render(<AssigneeBlock {...props} {...canSelectAssigneeProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
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

          expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
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

        expect(testUtils.getSelectedAssignee()).toHaveTextContent(getFullUserName(props.assignee))
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

        expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()
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

        await testUtils.openAssigneeSelect(user)

        expect(testUtils.getAllAssigneeOption()).toHaveLength(props.workGroup.members.length)
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

        await testUtils.openAssigneeSelect(user)

        expect(testUtils.getAllAssigneeOption()).toHaveLength(props.workGroup.members.length + 1)
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

        expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()

        await testUtils.openAssigneeSelect(user)
        await testUtils.setAssignee(user, getFullUserName(props.workGroup.members[0]))

        expect(testUtils.getSelectedAssignee()).toBeInTheDocument()
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

          await testUtils.openAssigneeSelect(user)
          await selectTestUtils.expectOptionDisabled(testUtils.getAssigneeOption(assigneeOption.id))
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

          await testUtils.openAssigneeSelect(user)
          await selectTestUtils.expectOptionDisabled(testUtils.getAssigneeOption(assigneeOption.id))
        })
      })
    })

    test('Исполнитель отображается если его нельзя выбрать и если он есть', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(taskAssigneeTestUtils.getContainerIn(testUtils.getContainer())).toBeInTheDocument()
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
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Если его нельзя выбрать и если его нет', () => {
        render(<AssigneeBlock {...props} assignee={null} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(testUtils.getChildByText(NO_ASSIGNEE_TEXT)).toBeInTheDocument()
    })

    test('Отображается кнопка "В работу"', () => {
      render(<AssigneeBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
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

        const button = testUtils.getAssignButton()

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

          expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
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

          expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
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

        await testUtils.openAssigneeSelect(user)
        await testUtils.setAssignee(user, getFullUserName(props.workGroup.members[0]))
        await testUtils.clickAssignButton(user)

        expect(props.updateAssignee).toBeCalledTimes(1)
        expect(props.updateAssignee).toBeCalledWith(props.workGroup.members[0].id)
      })
    })
  })
})
