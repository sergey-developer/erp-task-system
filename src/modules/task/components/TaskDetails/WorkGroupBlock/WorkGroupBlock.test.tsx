import { screen, within } from '@testing-library/react'

import { testUtils as taskFirstLineModalTestUtils } from 'modules/task/components/TaskFirstLineModal/TaskFirstLineModal.test'
import { testUtils as taskSecondLineModalTestUtils } from 'modules/task/components/TaskSecondLineModal/TaskSecondLineModal.test'
import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { UserPermissionsEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import {
  activeFirstLineButtonProps,
  activeSecondLineButtonProps,
  disableFirstLineButtonProps,
  forceActiveFirstLineButtonProps,
  props,
  showFirstLineButtonProps,
  showSecondLineButtonProps,
} from '_tests_/features/tasks/TaskDetails/WorkGroupBlock/constants'
import { workGroupBlockTestUtils } from '_tests_/features/tasks/TaskDetails/WorkGroupBlock/testUtils'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import { mockGetWorkGroupsSuccess } from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { fakeWord, getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import WorkGroupBlock from './index'

setupApiTests()

describe('Блок рабочей группы', () => {
  test('Заголовок отображается', () => {
    render(<WorkGroupBlock {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    expect(workGroupBlockTestUtils.getChildByText(/рабочая группа/i)).toBeInTheDocument()
  })

  describe('Рабочая группа', () => {
    describe('Если установлена', () => {
      test('Отображается корректно', () => {
        const workGroup = taskFixtures.workGroup()

        render(<WorkGroupBlock {...props} workGroup={workGroup} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        expect(workGroupBlockTestUtils.getChildByText(workGroup.name)).toBeInTheDocument()
      })

      test('Информация о рабочей группе отображается при наведении', async () => {
        const workGroup = taskFixtures.workGroup()

        const { user } = render(<WorkGroupBlock {...props} workGroup={workGroup} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        const name = workGroupBlockTestUtils.getChildByText(workGroup.name)
        await user.hover(name)

        const groupLeadInfo = await screen.findByTestId('user-short-info-group-lead')
        const groupLeadTitle = within(groupLeadInfo).getByText('Руководитель группы')
        const groupLeadEmail = within(groupLeadInfo).getByText(workGroup.groupLead.email)
        const groupLeadPhone = within(groupLeadInfo).getByText(workGroup.groupLead.phone!)
        const groupLeadPosition = within(groupLeadInfo).getByText(workGroup.groupLead.position!)
        const groupLeadFio = within(groupLeadInfo).queryByText(
          getFullUserName({
            firstName: workGroup.groupLead.firstName,
            lastName: workGroup.groupLead.lastName,
            middleName: workGroup.groupLead.middleName,
          }),
        )

        const seniorEngineerInfo = await screen.findByTestId('user-short-info-senior-engineer')
        const seniorEngineerTitle = within(seniorEngineerInfo).getByText('Старший инженер группы')
        const seniorEngineerEmail = within(seniorEngineerInfo).getByText(
          workGroup.seniorEngineer.email,
        )
        const seniorEngineerPhone = within(seniorEngineerInfo).getByText(
          workGroup.seniorEngineer.phone!,
        )
        const seniorEngineerPosition = within(seniorEngineerInfo).getByText(
          workGroup.seniorEngineer.position!,
        )
        const seniorEngineerFio = within(seniorEngineerInfo).queryByText(
          getFullUserName({
            firstName: workGroup.seniorEngineer.firstName,
            lastName: workGroup.seniorEngineer.lastName,
            middleName: workGroup.seniorEngineer.middleName,
          }),
        )

        expect(groupLeadTitle).toBeInTheDocument()
        expect(groupLeadEmail).toBeInTheDocument()
        expect(groupLeadPhone).toBeInTheDocument()
        expect(groupLeadPosition).toBeInTheDocument()
        expect(groupLeadFio).toBeInTheDocument()
        expect(seniorEngineerTitle).toBeInTheDocument()
        expect(seniorEngineerEmail).toBeInTheDocument()
        expect(seniorEngineerPhone).toBeInTheDocument()
        expect(seniorEngineerPosition).toBeInTheDocument()
        expect(seniorEngineerFio).toBeInTheDocument()
      })
    })

    test('Отображается значение по умолчанию если нет группы', () => {
      render(<WorkGroupBlock {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(workGroupBlockTestUtils.getChildByText('I линия поддержки')).toBeInTheDocument()
    })
  })

  describe('Кнопка перевода на 2-ю линию', () => {
    test('Отображается если условия соблюдены', () => {
      render(<WorkGroupBlock {...props} {...showSecondLineButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(workGroupBlockTestUtils.getSecondLineButton()).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но есть рабочая группа', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            workGroup={taskFixtures.workGroup()}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.querySecondLineButton()).not.toBeInTheDocument()
      })
    })

    test('Активна если условия соблюдены', () => {
      render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          {...activeSecondLineButtonProps}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
              }),
            },
          }),
        },
      )

      expect(workGroupBlockTestUtils.getSecondLineButton()).toBeEnabled()
    })

    test('Всегда активна если статус запроса на ожидание "Одобрено"', () => {
      render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          taskSuspendRequestStatus={SuspendRequestStatusEnum.Approved}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        },
      )

      expect(workGroupBlockTestUtils.getSecondLineButton()).toBeEnabled()
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но есть запрос на переклассификацию', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
                }),
              },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getSecondLineButton()).toBeDisabled()
      })

      test('Но статус заявки не "Новая" и не "В процессе"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
            status={TaskStatusEnum.Awaiting}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
                }),
              },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getSecondLineButton()).toBeDisabled()
      })

      test('Но статус запроса на ожидание "Новый"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
                }),
              },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getSecondLineButton()).toBeDisabled()
      })

      test('Но статус запроса на ожидание "В процессе"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({
                  permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
                }),
              },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getSecondLineButton()).toBeDisabled()
      })

      test('Но нет прав', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getSecondLineButton()).toBeDisabled()
      })
    })

    test('Отображает состоянии загрузки во время перевода на 2-ю линию', async () => {
      render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          {...activeSecondLineButtonProps}
          transferTaskToSecondLineIsLoading
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        },
      )

      await workGroupBlockTestUtils.expectSecondLineLoadingStarted()
    })

    test('При клике открывается модальное окно', async () => {
      mockGetWorkGroupsSuccess()

      const { user } = render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          {...activeSecondLineButtonProps}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
              }),
            },
          }),
        },
      )

      await workGroupBlockTestUtils.clickSecondLineButton(user)
      const modal = await taskSecondLineModalTestUtils.findContainer()

      expect(modal).toBeInTheDocument()
    })
  })

  describe('Модалка перевода на 2-ю линию', () => {
    test('При отправке обработчик вызывается', async () => {
      const workGroupList = workGroupFixtures.workGroupList()
      mockGetWorkGroupsSuccess({ body: workGroupList })

      const { user } = render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          {...activeSecondLineButtonProps}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({
                permissions: [UserPermissionsEnum.PutFirstLineTasksOnSecondLine],
              }),
            },
          }),
        },
      )

      await workGroupBlockTestUtils.clickSecondLineButton(user)
      await taskSecondLineModalTestUtils.findContainer()
      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)
      await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroupList[0].name)
      await taskSecondLineModalTestUtils.clickSubmitButton(user)

      expect(props.transferTaskToSecondLine).toBeCalledTimes(1)
      expect(props.transferTaskToSecondLine).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })
  })

  describe('Кнопка перевода на 1-ю линию', () => {
    test('Отображается и активна если условия соблюдены', () => {
      render(
        <WorkGroupBlock {...props} {...showFirstLineButtonProps} {...activeFirstLineButtonProps} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        },
      )

      const button = workGroupBlockTestUtils.getFirstLineButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('Всегда активна если', () => {
      test(`Статус запроса на ожидание "Одобрено" и id заявки есть в ${TaskActionsPermissionsEnum.CanPutOnFirstLine}`, () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...forceActiveFirstLineButtonProps}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeEnabled()
      })

      test(`Статуса запроса на ожидание нет и id заявки есть в ${TaskActionsPermissionsEnum.CanPutOnFirstLine}`, () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...forceActiveFirstLineButtonProps}
            taskSuspendRequestStatus={undefined}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeEnabled()
      })
    })

    describe('Не может быть всегда активна если', () => {
      test('Статус запроса на ожидание "Одобрено" но id заявки нет в "CAN_PUT_ON_FIRST_LINE"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...disableFirstLineButtonProps}
            {...forceActiveFirstLineButtonProps}
            userActions={userFixtures.userActions()}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeDisabled()
      })

      test('id заявки есть в "CAN_PUT_ON_FIRST_LINE" но статус запроса на ожидание не "Одобрено"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...disableFirstLineButtonProps}
            {...forceActiveFirstLineButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeDisabled()
      })
    })

    describe('Не активна если условия соблюдены', () => {
      test('Но есть запрос на переклассификацию', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeDisabled()
      })

      test('Но статус заявки "В ожидании"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            status={TaskStatusEnum.Awaiting}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeDisabled()
      })

      test('Но статус запроса на ожидание "Новый"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.New}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeDisabled()
      })

      test('Но статус запроса на ожидание "В процессе"', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            taskSuspendRequestStatus={SuspendRequestStatusEnum.InProgress}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.getFirstLineButton()).toBeDisabled()
      })
    })

    test('В состоянии загрузки во время перевода на 1-ю линию', async () => {
      render(
        <WorkGroupBlock
          {...props}
          {...showFirstLineButtonProps}
          {...activeFirstLineButtonProps}
          transferTaskToFirstLineIsLoading
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        },
      )

      await workGroupBlockTestUtils.expectFirstLineLoadingStarted()
    })

    test('При клике открывается модальное окно', async () => {
      const { user } = render(
        <WorkGroupBlock {...props} {...showFirstLineButtonProps} {...activeFirstLineButtonProps} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        },
      )

      await workGroupBlockTestUtils.clickFirstLineButton(user)
      expect(await taskFirstLineModalTestUtils.findContainer()).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но нет рабочей группы', () => {
        render(<WorkGroupBlock {...props} {...showFirstLineButtonProps} workGroup={undefined} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        expect(workGroupBlockTestUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })

      test('Но заявка закрыта', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            status={TaskStatusEnum.Closed}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })

      test('Но заявка завершена', () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            status={TaskStatusEnum.Completed}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          },
        )

        expect(workGroupBlockTestUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })
    })
  })

  describe('Модалка перевода на 1-ю линию', () => {
    test('При отправке обработчик вызывается', async () => {
      const { user } = render(
        <WorkGroupBlock {...props} {...showFirstLineButtonProps} {...activeFirstLineButtonProps} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        },
      )

      await workGroupBlockTestUtils.clickFirstLineButton(user)
      await taskFirstLineModalTestUtils.findContainer()
      await taskFirstLineModalTestUtils.setDescription(user, fakeWord())
      await taskFirstLineModalTestUtils.clickSubmitButton(user)

      expect(props.transferTaskToFirstLine).toBeCalledTimes(1)
      expect(props.transferTaskToFirstLine).toBeCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
      )
    })
  })
})
