import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as taskFirstLineModalTestUtils } from 'modules/task/components/TaskFirstLineModal/TaskFirstLineModal.test'
import { testUtils as taskSecondLineModalTestUtils } from 'modules/task/components/TaskSecondLineModal/TaskSecondLineModal.test'
import {
  TaskActionsPermissionsEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import { getFullUserName } from 'modules/user/utils'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import { mockGetWorkGroupsSuccess } from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  fakeIdStr,
  fakeWord,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'

import WorkGroupBlock, { WorkGroupBlockProps } from './index'

const props: Readonly<WorkGroupBlockProps> = {
  id: fakeId(),
  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  userActions: userFixtures.userActions(),
}

// first line button
export const showFirstLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup' | 'status'> = {
  workGroup: taskFixtures.workGroup(),
  status: TaskStatusEnum.New,
}

export const activeFirstLineButtonProps: Pick<WorkGroupBlockProps, 'userActions'> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanPutOnFirstLine]: [props.id],
    },
  }),
}

// second line button
export const showSecondLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup'> = {
  workGroup: null,
}

export const activeSecondLineButtonProps: Pick<WorkGroupBlockProps, 'userActions'> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanPutOnSecondLine]: [props.id],
    },
  }),
}

const getContainer = () => screen.getByTestId('task-work-group')
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// first line button
const getFirstLineButton = () => buttonTestUtils.getButtonIn(getContainer(), /вернуть на I линию/i)

const findFirstLineButton = () =>
  buttonTestUtils.findButtonIn(getContainer(), /вернуть на I линию/i)

const queryFirstLineButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /вернуть на I линию/i)

const clickFirstLineButton = async (user: UserEvent) => user.click(getFirstLineButton())

const expectFirstLineLoadingStarted = async () =>
  buttonTestUtils.expectLoadingStarted(getFirstLineButton())

// second line button
const getSecondLineButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /перевести на II линию/i)

const querySecondLineButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /перевести на II линию/i)

const clickSecondLineButton = async (user: UserEvent) => user.click(getSecondLineButton())

const expectSecondLineLoadingStarted = async () => {
  await buttonTestUtils.expectLoadingStarted(getSecondLineButton())
}

export const testUtils = {
  getContainer,
  getChildByText,

  getFirstLineButton,
  findFirstLineButton,
  queryFirstLineButton,
  clickFirstLineButton,
  expectFirstLineLoadingStarted,

  getSecondLineButton,
  querySecondLineButton,
  clickSecondLineButton,
  expectSecondLineLoadingStarted,
}

setupApiTests()

describe('Блок рабочей группы', () => {
  test('Заголовок отображается', () => {
    render(<WorkGroupBlock {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    expect(testUtils.getChildByText(/рабочая группа/i)).toBeInTheDocument()
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

        expect(testUtils.getChildByText(workGroup.name)).toBeInTheDocument()
      })

      test('Информация о рабочей группе отображается при наведении', async () => {
        const workGroup = taskFixtures.workGroup()

        const { user } = render(<WorkGroupBlock {...props} workGroup={workGroup} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        const name = testUtils.getChildByText(workGroup.name)
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

      expect(testUtils.getChildByText('I линия поддержки')).toBeInTheDocument()
    })
  })

  describe('Кнопка перевода на 2-ю линию', () => {
    test('Отображается если условия соблюдены', () => {
      render(<WorkGroupBlock {...props} {...showSecondLineButtonProps} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      expect(testUtils.getSecondLineButton()).toBeInTheDocument()
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

        expect(testUtils.querySecondLineButton()).not.toBeInTheDocument()
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      expect(testUtils.getSecondLineButton()).toBeEnabled()
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      expect(testUtils.getSecondLineButton()).toBeDisabled()
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.clickSecondLineButton(user)
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.clickSecondLineButton(user)
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const button = testUtils.getFirstLineButton()

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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      expect(testUtils.getFirstLineButton()).toBeDisabled()
    })

    test('При клике открывается модальное окно', async () => {
      const { user } = render(
        <WorkGroupBlock {...props} {...showFirstLineButtonProps} {...activeFirstLineButtonProps} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.clickFirstLineButton(user)
      expect(await taskFirstLineModalTestUtils.findContainer()).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но нет рабочей группы', () => {
        render(<WorkGroupBlock {...props} {...showFirstLineButtonProps} workGroup={undefined} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
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
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
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
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })
    })
  })

  describe('Модалка перевода на 1-ю линию', () => {
    test('При отправке обработчик вызывается', async () => {
      const { user } = render(
        <WorkGroupBlock {...props} {...showFirstLineButtonProps} {...activeFirstLineButtonProps} />,
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await testUtils.clickFirstLineButton(user)
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
