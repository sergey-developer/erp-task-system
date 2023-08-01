import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/components/TaskAssignee/TaskAssignee.test'
import { UserRoleEnum } from 'modules/user/constants/roles'
import { WorkGroupListItemModel } from 'modules/workGroup/models'

import { ArrayFirst, NonNullableObject } from 'shared/interfaces/utils'

import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'

import {
  clickSelectOption,
  expectOptionDisabled,
  findSelect,
  fakeId,
  getAllSelectOption,
  getButtonIn,
  getSelect,
  getSelectOptionById,
  getSelectedOption,
  getStoreWithAuth,
  expectLoadingFinishedByButton,
  expectLoadingStartedByButton,
  expectLoadingStartedBySelect,
  queryButtonIn,
  querySelect,
  render,
  selectDisabledIn,
  selectNotDisabledIn,
  openSelect,
} from '_tests_/utils'

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
      | 'taskSuspendRequestStatus'
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
  assignee: taskFixtures.fakeAssignee(),
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
}

export const activeTakeTaskButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const activeAssignOnMeButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const activeAssignButtonProps: Readonly<
  NonNullableObject<
    Pick<AssigneeBlockProps, 'status' | 'extendedStatus' | 'assignee'>
  >
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  assignee: taskFixtures.fakeAssignee(),
}

const showRefuseTaskButtonProps: Readonly<
  NonNullableObject<Pick<AssigneeBlockProps, 'assignee'>>
> = {
  assignee: taskFixtures.fakeAssignee(),
}

const activeRefuseTaskButtonProps: Readonly<
  Pick<AssigneeBlockProps, 'status' | 'extendedStatus'>
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

export const canSelectAssigneeProps: Readonly<
  NonNullableObject<Pick<AssigneeBlockProps, 'status' | 'workGroup'>>
> = {
  status: TaskStatusEnum.New,
  workGroup: workGroupFixtures.fakeWorkGroup(),
}

const getContainer = () => screen.getByTestId('task-assignee-block')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// take task
const getTakeTaskButton = () => getButtonIn(getContainer(), /в работу/i)

const clickTakeTaskButton = async (user: UserEvent) => {
  const button = getTakeTaskButton()
  await user.click(button)
  return button
}

const takeTaskExpectLoadingStarted = () =>
  expectLoadingStartedByButton(getTakeTaskButton())

// assign on me button
const getAssignOnMeButton = () =>
  getButtonIn(getContainer(), /назначить на себя$/i)

const clickAssignOnMeButton = async (user: UserEvent) => {
  const button = getAssignOnMeButton()
  await user.click(button)
  return button
}

const assignOnMeExpectLoadingStarted = () =>
  expectLoadingStartedByButton(getAssignOnMeButton())

const assignOnMeExpectLoadingFinished = () =>
  expectLoadingFinishedByButton(getAssignOnMeButton())

// assign button
const getAssignButton = () => getButtonIn(getContainer(), /назначить$/i)

const queryAssignButton = () => queryButtonIn(getContainer(), /назначить$/i)

const clickAssignButton = async (user: UserEvent) => {
  const button = getAssignButton()
  await user.click(button)
  return button
}

const assignExpectLoadingStarted = () =>
  expectLoadingStartedByButton(getAssignButton())

// refuse task
const getRefuseTaskButton = () =>
  getButtonIn(getContainer(), /отказаться от заявки/i)

const userClickRefuseTaskButton = async (user: UserEvent) => {
  const button = getRefuseTaskButton()
  await user.click(button)
  return button
}

const refuseTaskExpectLoadingStarted = () =>
  expectLoadingStartedByButton(getRefuseTaskButton())

// assignee select
const getAssigneeSelect = () => getSelect(getContainer())

const queryAssigneeSelect = () => querySelect(getContainer())

const findAssigneeSelect = () => findSelect(getContainer())

const getSelectedAssignee = () => getSelectedOption(getContainer())

const openAssigneeSelect = (user: UserEvent) => openSelect(user, getContainer())

const selectAssignee = clickSelectOption

const getAssigneeOption = getSelectOptionById

const getAllAssigneeOption = getAllSelectOption

const expectAssigneeSelectLoadingStarted = () =>
  expectLoadingStartedBySelect(getContainer())

const expectAssigneeSelectDisabled = () => selectDisabledIn(getContainer())

const expectAssigneeSelectNotDisabled = () =>
  selectNotDisabledIn(getContainer())

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
    render(<AssigneeBlock {...requiredProps} />, { store: getStoreWithAuth() })

    expect(testUtils.getChildByText(/исполнитель/i)).toBeInTheDocument()
  })

  describe('Кнопка "Назначить на себя"', () => {
    test('Отображается', () => {
      render(<AssigneeBlock {...requiredProps} />, {
        store: getStoreWithAuth(),
      })

      expect(testUtils.getAssignOnMeButton()).toBeInTheDocument()
    })

    test('Отображает состояние загрузки во время обновления исполнителя', async () => {
      render(<AssigneeBlock {...requiredProps} updateAssigneeIsLoading />, {
        store: getStoreWithAuth(),
      })

      await testUtils.assignOnMeExpectLoadingStarted()
    })

    test('Активна если условия соблюдены', () => {
      render(
        <AssigneeBlock {...requiredProps} {...activeAssignOnMeButtonProps} />,
        { store: getStoreWithAuth() },
      )

      expect(testUtils.getAssignOnMeButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки "Закрыта"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
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
            {...activeAssignOnMeButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          { store: getStoreWithAuth() },
        )

        expect(testUtils.getAssignOnMeButton()).toBeDisabled()
      })
    })

    test('Переданный обработчик вызывается корректно', async () => {
      const currentUserId = fakeId()

      const { user } = render(
        <AssigneeBlock {...requiredProps} {...activeAssignOnMeButtonProps} />,
        { store: getStoreWithAuth({ userId: currentUserId }) },
      )

      await testUtils.clickAssignOnMeButton(user)

      expect(requiredProps.updateAssignee).toBeCalledTimes(1)
      expect(requiredProps.updateAssignee).toBeCalledWith(currentUserId)
    })

    describe('После назначения на себя', () => {
      test('Кнопка "Назначить" становится не активна', async () => {
        const { user } = render(
          <AssigneeBlock
            {...requiredProps}
            {...activeAssignOnMeButtonProps}
            {...canSelectAssigneeProps}
            {...activeAssignButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )

        await testUtils.openAssigneeSelect(user)
        await testUtils.selectAssignee(
          user,
          canSelectAssigneeProps.workGroup.members[0].fullName,
        )

        const button = testUtils.getAssignButton()
        expect(button).toBeEnabled()

        await testUtils.clickAssignOnMeButton(user)
        expect(button).toBeDisabled()
      })
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

    test('Отображает состояние загрузки во время обновления исполнителя', async () => {
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
      test(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test(`Роль - ${UserRoleEnum.Engineer}`, () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      test(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.HeadOfDepartment,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    test('Активна если условия соблюдены', () => {
      render(
        <AssigneeBlock {...requiredProps} {...activeTakeTaskButtonProps} />,
        {
          store: getStoreWithAuth({
            userId: requiredProps.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        },
      )

      expect(testUtils.getTakeTaskButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но статус заявки не "Новая"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...activeTakeTaskButtonProps}
            status={TaskStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но исполнитель заявки назначен и не является авторизованным пользователем', () => {
        render(
          <AssigneeBlock {...requiredProps} {...activeTakeTaskButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })

      test('Но расширенный статус заявки "На переклассификации"', () => {
        render(
          <AssigneeBlock
            {...requiredProps}
            {...activeTakeTaskButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.assignee!.id,
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(testUtils.getTakeTaskButton()).toBeDisabled()
      })
    })

    test('Отображает состояние загрузки во время взятия заявки в работу', async () => {
      render(
        <AssigneeBlock
          {...requiredProps}
          {...activeTakeTaskButtonProps}
          takeTaskIsLoading
        />,
        {
          store: getStoreWithAuth({
            userId: requiredProps.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        },
      )

      await testUtils.takeTaskExpectLoadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <AssigneeBlock {...requiredProps} {...activeTakeTaskButtonProps} />,
        {
          store: getStoreWithAuth({
            userId: requiredProps.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        },
      )

      await testUtils.clickTakeTaskButton(user)
      expect(requiredProps.takeTask).toBeCalledTimes(1)
    })
  })

  describe('Блок выбора исполнителя', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Исполнитель отображается если он есть', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        expect(
          taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
        ).toBeInTheDocument()
      })

      test('Исполнитель не отображается если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Отображается соответствующий текст если исполнителя нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
      })

      test('Отображается кнопка "В работу"', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      test('Исполнитель отображается если он есть', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        expect(
          taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
        ).toBeInTheDocument()
      })

      test('Исполнитель не отображается если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        expect(
          taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
        ).not.toBeInTheDocument()
      })

      test('Отображается соответствующий текст если исполнителя нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
      })

      test('Отображается кнопка "В работу"', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      describe('Выбор исполнителя', () => {
        describe('Отображается корректно если условия соблюдены', () => {
          test('И старший инженер из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.getAssigneeSelect()).toBeInTheDocument()
            await testUtils.expectAssigneeSelectNotDisabled()
          })

          test('И глава отдела из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.SeniorEngineer,
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
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Closed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })

          test('Но статус заявки "Завершена"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Completed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })

          test('Но старший инженер или глава отдела из рабочей группы не являются авторизованным пользователем', () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })
        })

        test('Имеет значение по умолчанию если есть исполнитель', () => {
          render(
            <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRoleEnum.SeniorEngineer,
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
              {...canSelectAssigneeProps}
              assignee={null}
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()
        })

        test('Отображает состояние загрузки во время загрузки рабочих групп', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              workGroupListIsLoading
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          await testUtils.expectAssigneeSelectLoadingStarted()
        })

        test('Не активен во время обновления исполнителя', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              updateAssigneeIsLoading
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          await testUtils.expectAssigneeSelectDisabled()
        })

        test('Корректно отображает варианты выбора', async () => {
          const { user } = render(
            <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)

          expect(testUtils.getAllAssigneeOption()).toHaveLength(
            canSelectAssigneeProps.workGroup.members.length,
          )
        })

        test('Можно выбрать исполнителя', async () => {
          const { user } = render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              assignee={null}
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()

          await testUtils.openAssigneeSelect(user)
          await testUtils.selectAssignee(
            user,
            canSelectAssigneeProps.workGroup.members[0].fullName,
          )

          expect(testUtils.getSelectedAssignee()).toBeInTheDocument()
        })

        describe('Вариант исполнителя не активен', () => {
          test('Если выбранный исполнитель является исполнителем заявки', async () => {
            const assigneeOption: ArrayFirst<
              WorkGroupListItemModel['members']
            > = {
              ...canSelectAssigneeProps.workGroup.members[0],
              id: requiredProps.assignee.id,
            }

            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                workGroup={{
                  ...canSelectAssigneeProps.workGroup,
                  members: [assigneeOption],
                }}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            await testUtils.openAssigneeSelect(user)
            await expectOptionDisabled(
              testUtils.getAssigneeOption(assigneeOption.id),
            )
          })

          test('Если выбранный исполнитель является авторизованным пользователем', async () => {
            const assigneeOption: ArrayFirst<
              WorkGroupListItemModel['members']
            > = {
              ...canSelectAssigneeProps.workGroup.members[0],
              id: canSelectAssigneeProps.workGroup.seniorEngineer.id,
            }

            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                workGroup={{
                  ...canSelectAssigneeProps.workGroup,
                  members: [assigneeOption],
                }}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
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

      describe('Исполнитель отображается', () => {
        test('Если его нельзя выбрать и если он есть', () => {
          render(<AssigneeBlock {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          expect(
            taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
          ).toBeInTheDocument()
        })
      })

      describe('Исполнитель не отображается', () => {
        test('Если его можно выбрать и если он есть', () => {
          render(
            <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
              }),
            },
          )

          expect(
            taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
          ).not.toBeInTheDocument()
        })

        test('Если его нельзя выбрать и если его нет', () => {
          render(<AssigneeBlock {...requiredProps} assignee={null} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          expect(
            taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
          ).not.toBeInTheDocument()
        })
      })

      test('Отображается соответствующий текст если исполнителя нельзя выбрать и если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
      })

      test('Отображается кнопка "В работу"', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      describe('Кнопка "Назначить"', () => {
        describe('Отображается корректно если условия соблюдены', () => {
          test('И старший инженер из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeInTheDocument()
          })

          test('И глава отдела из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeInTheDocument()
          })
        })

        describe('Не отображается если условия соблюдены', () => {
          test('Но статус заявки "Закрыта"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Closed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
          })

          test('Но статус заявки "Завершена"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Completed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
          })

          test('Но старший инженер или глава отдела из рабочей группы не являются авторизованным пользователем', () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
          })
        })

        describe('Активна если условия соблюдены', () => {
          test('И если есть исполнитель заявки и если выбрать другого', async () => {
            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                }),
              },
            )

            await testUtils.openAssigneeSelect(user)
            await testUtils.selectAssignee(
              user,
              canSelectAssigneeProps.workGroup.members[0].fullName,
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
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но выбранный исполнитель является авторизованным пользователем', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                assignee={{
                  ...activeAssignButtonProps.assignee,
                  id: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                }}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но нет исполнителя заявки', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                assignee={null}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но статус заявки "В ожидании"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                status={TaskStatusEnum.Awaiting}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но расширенный статус заявки "На переклассификации"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                extendedStatus={TaskExtendedStatusEnum.InReclassification}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })
        })

        test('Отображает состояние загрузки во время обновления исполнителя', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              {...activeAssignButtonProps}
              updateAssigneeIsLoading
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
              }),
            },
          )

          await testUtils.assignExpectLoadingStarted()
        })

        test('Переданный обработчик вызывается корректно', async () => {
          const { user } = render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              {...activeAssignButtonProps}
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
                userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)
          await testUtils.selectAssignee(
            user,
            canSelectAssigneeProps.workGroup.members[0].fullName,
          )
          await testUtils.clickAssignButton(user)

          expect(requiredProps.updateAssignee).toBeCalledTimes(1)
          expect(requiredProps.updateAssignee).toBeCalledWith(
            canSelectAssigneeProps.workGroup.members[0].id,
          )
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      describe('Выбор исполнителя', () => {
        describe('Отображается корректно если условия соблюдены', () => {
          test('И старший инженер из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.getAssigneeSelect()).toBeInTheDocument()
            await testUtils.expectAssigneeSelectNotDisabled()
          })

          test('И глава отдела из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
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
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Closed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })

          test('Но статус заявки "Завершена"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Completed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })

          test('Но старший инженер или глава отдела из рабочей группы не являются авторизованным пользователем', () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.queryAssigneeSelect()).not.toBeInTheDocument()
          })
        })

        test('Имеет значение по умолчанию если есть исполнитель', () => {
          render(
            <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
                userRole: UserRoleEnum.HeadOfDepartment,
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
              {...canSelectAssigneeProps}
              assignee={null}
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()
        })

        test('Отображает состояние загрузки во время загрузки рабочих групп', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              workGroupListIsLoading
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          await testUtils.expectAssigneeSelectLoadingStarted()
        })

        test('Не активен во время обновления исполнителя', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              updateAssigneeIsLoading
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          await testUtils.expectAssigneeSelectDisabled()
        })

        test('Корректно отображает варианты выбора', async () => {
          const { user } = render(
            <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)

          expect(testUtils.getAllAssigneeOption()).toHaveLength(
            canSelectAssigneeProps.workGroup.members.length,
          )
        })

        test('Можно выбрать исполнителя', async () => {
          const { user } = render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              assignee={null}
            />,
            {
              store: getStoreWithAuth({
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          expect(testUtils.getSelectedAssignee()).not.toBeInTheDocument()

          await testUtils.openAssigneeSelect(user)
          await testUtils.selectAssignee(
            user,
            canSelectAssigneeProps.workGroup.members[0].fullName,
          )

          expect(testUtils.getSelectedAssignee()).toBeInTheDocument()
        })

        describe('Вариант исполнителя не активен', () => {
          test('Если выбранный исполнитель является исполнителем заявки', async () => {
            const assigneeOption: ArrayFirst<
              WorkGroupListItemModel['members']
            > = {
              ...canSelectAssigneeProps.workGroup.members[0],
              id: requiredProps.assignee.id,
            }

            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                workGroup={{
                  ...canSelectAssigneeProps.workGroup,
                  members: [assigneeOption],
                }}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            await testUtils.openAssigneeSelect(user)
            await expectOptionDisabled(
              testUtils.getAssigneeOption(assigneeOption.id),
            )
          })

          test('Если выбранный исполнитель является авторизованным пользователем', async () => {
            const assigneeOption: ArrayFirst<
              WorkGroupListItemModel['members']
            > = {
              ...canSelectAssigneeProps.workGroup.members[0],
              id: canSelectAssigneeProps.workGroup.groupLead.id,
            }

            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                workGroup={{
                  ...canSelectAssigneeProps.workGroup,
                  members: [assigneeOption],
                }}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
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

      describe('Исполнитель отображается', () => {
        test('Если его нельзя выбрать и если он есть', () => {
          render(<AssigneeBlock {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          expect(
            taskAssigneeTestUtils.getContainerIn(testUtils.getContainer()),
          ).toBeInTheDocument()
        })
      })

      describe('Исполнитель не отображается', () => {
        test('Если его можно выбрать и если он есть', () => {
          render(
            <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
              }),
            },
          )

          expect(
            taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
          ).not.toBeInTheDocument()
        })

        test('Если его нельзя выбрать и если его нет', () => {
          render(<AssigneeBlock {...requiredProps} assignee={null} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          })

          expect(
            taskAssigneeTestUtils.queryContainerIn(testUtils.getContainer()),
          ).not.toBeInTheDocument()
        })
      })

      test('Отображается соответствующий текст если исполнителя нельзя выбрать и если его нет', () => {
        render(<AssigneeBlock {...requiredProps} assignee={null} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.HeadOfDepartment,
          }),
        })

        expect(testUtils.getChildByText('Не назначен')).toBeInTheDocument()
      })

      test('Отображается кнопка "В работу"', () => {
        render(<AssigneeBlock {...requiredProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.HeadOfDepartment,
          }),
        })

        expect(testUtils.getTakeTaskButton()).toBeInTheDocument()
      })

      describe('Кнопка "Назначить"', () => {
        describe('Отображается корректно если условия соблюдены', () => {
          test('И старший инженер из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeInTheDocument()
          })

          test('И глава отдела из рабочей группы является авторизованным пользователем', async () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeInTheDocument()
          })
        })

        describe('Не отображается если условия соблюдены', () => {
          test('Но статус заявки "Закрыта"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Closed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
          })

          test('Но статус заявки "Завершена"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                status={TaskStatusEnum.Completed}
              />,
              {
                store: getStoreWithAuth({
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
          })

          test('Но старший инженер или глава отдела из рабочей группы не являются авторизованным пользователем', () => {
            render(
              <AssigneeBlock {...requiredProps} {...canSelectAssigneeProps} />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            expect(testUtils.queryAssignButton()).not.toBeInTheDocument()
          })
        })

        describe('Активна если условия соблюдены', () => {
          test('И если есть исполнитель заявки и если выбрать другого', async () => {
            const { user } = render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                }),
              },
            )

            await testUtils.openAssigneeSelect(user)
            await testUtils.selectAssignee(
              user,
              canSelectAssigneeProps.workGroup.members[0].fullName,
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
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но выбранный исполнитель является авторизованным пользователем', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                assignee={{
                  ...activeAssignButtonProps.assignee,
                  id: canSelectAssigneeProps.workGroup.groupLead.id,
                }}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но нет исполнителя заявки', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                assignee={null}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но статус заявки "В ожидании"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                status={TaskStatusEnum.Awaiting}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })

          test('Но расширенный статус заявки "На переклассификации"', () => {
            render(
              <AssigneeBlock
                {...requiredProps}
                {...canSelectAssigneeProps}
                {...activeAssignButtonProps}
                extendedStatus={TaskExtendedStatusEnum.InReclassification}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                  userId: canSelectAssigneeProps.workGroup.groupLead.id,
                }),
              },
            )

            expect(testUtils.getAssignButton()).toBeDisabled()
          })
        })

        test('Отображает состояние загрузки во время обновления исполнителя', async () => {
          render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              {...activeAssignButtonProps}
              updateAssigneeIsLoading
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
              }),
            },
          )

          await testUtils.assignExpectLoadingStarted()
        })

        test('Переданный обработчик вызывается корректно', async () => {
          const { user } = render(
            <AssigneeBlock
              {...requiredProps}
              {...canSelectAssigneeProps}
              {...activeAssignButtonProps}
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
                userId: canSelectAssigneeProps.workGroup.groupLead.id,
              }),
            },
          )

          await testUtils.openAssigneeSelect(user)
          await testUtils.selectAssignee(
            user,
            canSelectAssigneeProps.workGroup.members[0].fullName,
          )
          await testUtils.clickAssignButton(user)

          expect(requiredProps.updateAssignee).toBeCalledTimes(1)
          expect(requiredProps.updateAssignee).toBeCalledWith(
            canSelectAssigneeProps.workGroup.members[0].id,
          )
        })
      })
    })
  })
})
