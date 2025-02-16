import { screen, within } from '@testing-library/react'
import { TaskActionsPermissionsEnum, TaskStatusEnum } from 'features/tasks/api/constants'
import { getFullUserName } from 'features/users/helpers'

import {
  activeFirstLineButtonProps,
  activeSecondLineButtonProps,
  props,
  showFirstLineButtonProps,
  showSecondLineButtonProps,
} from '_tests_/features/tasks/components/TaskDetails/WorkGroupBlock/constants'
import { workGroupBlockTestUtils } from '_tests_/features/tasks/components/TaskDetails/WorkGroupBlock/testUtils'
import { taskFirstLineModalTestUtils } from '_tests_/features/tasks/components/TaskFirstLineModal/testUtils'
import { taskSecondLineModalTestUtils } from '_tests_/features/tasks/components/TaskSecondLineModal/testUtils'
import taskFixtures from '_tests_/fixtures/tasks'
import userFixtures from '_tests_/fixtures/users'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import { fakeWord, getStoreWithAuth, render, setupApiTests } from '_tests_/helpers'
import { mockGetWorkGroupsSuccess } from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

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

    test('Активна если userActions содержит id заявки', () => {
      render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          {...activeSecondLineButtonProps}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      expect(workGroupBlockTestUtils.getSecondLineButton()).toBeEnabled()
    })

    test('Не активна если userActions не содержит id заявки', () => {
      render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          userActions={userFixtures.userActions({
            tasks: {
              ...userFixtures.taskActionsPermissions,
              [TaskActionsPermissionsEnum.CanPutOnSecondLine]: [],
            },
          })}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      expect(workGroupBlockTestUtils.getSecondLineButton()).toBeDisabled()
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
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
      const workGroups = workGroupFixtures.workGroups()
      mockGetWorkGroupsSuccess({ body: workGroups })

      const { user } = render(
        <WorkGroupBlock
          {...props}
          {...showSecondLineButtonProps}
          {...activeSecondLineButtonProps}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await workGroupBlockTestUtils.clickSecondLineButton(user)
      await taskSecondLineModalTestUtils.findContainer()
      await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
      await taskSecondLineModalTestUtils.openWorkGroupField(user)
      await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroups[0].name)
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
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      const button = workGroupBlockTestUtils.getFirstLineButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не активна если userActions не содержит id заявки', () => {
      render(
        <WorkGroupBlock
          {...props}
          {...showFirstLineButtonProps}
          userActions={{
            tasks: {
              ...userFixtures.taskActionsPermissions,
              [TaskActionsPermissionsEnum.CanPutOnFirstLine]: [],
            },
          }}
        />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      expect(workGroupBlockTestUtils.getFirstLineButton()).toBeDisabled()
    })

    test('При клике открывается модальное окно', async () => {
      const { user } = render(
        <WorkGroupBlock {...props} {...showFirstLineButtonProps} {...activeFirstLineButtonProps} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
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
