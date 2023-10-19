import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TaskExtendedStatusEnum, TaskStatusEnum } from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { UserRoleEnum } from 'modules/user/constants'

import taskFixtures from '_tests_/fixtures/task'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  render,
  fakeIdStr,
} from '_tests_/utils'

import { testUtils as taskFirstLineModalTestUtils } from '../../TaskFirstLineModal/TaskFirstLineModal.test'
import { testUtils as taskSecondLineModalTestUtils } from '../../TaskSecondLineModal/TaskSecondLineModal.test'
import WorkGroupBlock, { WorkGroupBlockProps } from './index'

const props: Readonly<
  Omit<WorkGroupBlockProps, 'workGroup'> & {
    taskSuspendRequestStatus: SuspendRequestStatusEnum
  }
> = {
  id: fakeId(),
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
}

const notRequiredProps: Omit<WorkGroupBlockProps, keyof typeof props> = {
  workGroup: taskFixtures.workGroup(),
}

// first line button
export const showFirstLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup' | 'status'> = {
  workGroup: taskFixtures.workGroup(),
  status: TaskStatusEnum.New,
}

export const activeFirstLineButtonProps: Pick<WorkGroupBlockProps, 'status' | 'extendedStatus'> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

// second line button
export const showSecondLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup'> = {
  workGroup: undefined,
}

export const activeSecondLineButtonProps: Pick<WorkGroupBlockProps, 'status' | 'extendedStatus'> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

const getContainer = () => screen.getByTestId('task-work-group')
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

// first line button
const getFirstLineButton = () => buttonTestUtils.getButtonIn(getContainer(), /вернуть на I линию/i)

const findFirstLineButton = () =>
  buttonTestUtils.findButtonIn(getContainer(), /вернуть на I линию/i)

const queryFirstLineButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /вернуть на I линию/i)

const clickFirstLineButton = async (user: UserEvent) => {
  const button = getFirstLineButton()
  await user.click(button)
  return button
}

const expectFirstLineLoadingStarted = async () => {
  await buttonTestUtils.expectLoadingStarted(getFirstLineButton())
}

// second line button
const getSecondLineButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /перевести на II линию/i)

const querySecondLineButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /перевести на II линию/i)

const clickSecondLineButton = async (user: UserEvent) => {
  const button = getSecondLineButton()
  await user.click(button)
  return button
}

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

describe('Блок рабочей группы', () => {
  test('Заголовок отображается', () => {
    render(<WorkGroupBlock {...props} />)
    expect(testUtils.getChildByText(/рабочая группа/i)).toBeInTheDocument()
  })

  describe('Рабочая группа', () => {
    test('Отображается если есть установленное значение', () => {
      render(<WorkGroupBlock {...props} workGroup={notRequiredProps.workGroup} />)

      expect(testUtils.getChildByText(notRequiredProps.workGroup!.name)).toBeInTheDocument()
    })

    test('Отображается значение по умолчанию если нет группы', () => {
      render(<WorkGroupBlock {...props} />)
      expect(testUtils.getChildByText('I линия поддержки')).toBeInTheDocument()
    })
  })

  describe('Кнопка перевода на 2-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Отображается если условия соблюдены', () => {
        render(<WorkGroupBlock {...props} {...showSecondLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          expect(testUtils.querySecondLineButton()).not.toBeInTheDocument()
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
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(testUtils.getSecondLineButton()).toBeEnabled()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          expect(testUtils.getSecondLineButton()).toBeDisabled()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          expect(testUtils.getSecondLineButton()).toBeDisabled()
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
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        await testUtils.expectSecondLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        await testUtils.clickSecondLineButton(user)

        expect(await taskSecondLineModalTestUtils.findContainer()).toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      test('Не отображается', () => {
        render(<WorkGroupBlock {...props} {...showSecondLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      test('Не отображается', () => {
        render(<WorkGroupBlock {...props} {...showSecondLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      test('Не отображается', () => {
        render(<WorkGroupBlock {...props} {...showSecondLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.HeadOfDepartment,
          }),
        })
      })
    })
  })

  describe('Модалка перевода на 2-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('При отправке обработчик вызывается корректно', async () => {
        const workGroupList = workGroupFixtures.workGroupList()
        mockGetWorkGroupListSuccess({ body: workGroupList })

        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
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
  })

  describe('Кнопка перевода на 1-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Отображается если условия соблюдены', () => {
        render(<WorkGroupBlock {...props} {...showFirstLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        })

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
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
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        await testUtils.expectFirstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        await testUtils.clickFirstLineButton(user)

        expect(await taskFirstLineModalTestUtils.findContainer()).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но нет рабочей группы', () => {
          render(
            <WorkGroupBlock {...props} {...showFirstLineButtonProps} workGroup={undefined} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      test('Отображается если условия соблюдены', () => {
        render(<WorkGroupBlock {...props} {...showFirstLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.Engineer,
          }),
        })

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
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
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          },
        )

        await testUtils.expectFirstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          },
        )

        await testUtils.clickFirstLineButton(user)

        expect(await taskFirstLineModalTestUtils.findContainer()).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но нет рабочей группы', () => {
          render(
            <WorkGroupBlock {...props} {...showFirstLineButtonProps} workGroup={undefined} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            },
          )

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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.Engineer,
              }),
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      test('Отображается если условия соблюдены', () => {
        render(<WorkGroupBlock {...props} {...showFirstLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        })

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
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
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )

        await testUtils.expectFirstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )

        await testUtils.clickFirstLineButton(user)

        expect(await taskFirstLineModalTestUtils.findContainer()).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но нет рабочей группы', () => {
          render(
            <WorkGroupBlock {...props} {...showFirstLineButtonProps} workGroup={undefined} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.SeniorEngineer,
              }),
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      test('Отображается', () => {
        render(<WorkGroupBlock {...props} {...showFirstLineButtonProps} />, {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.HeadOfDepartment,
          }),
        })

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
        })
      })

      test('Отображает состояние загрузки во время перевода на 1-ю линию', async () => {
        render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            transferTaskToFirstLineIsLoading
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          },
        )

        await testUtils.expectFirstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          },
        )

        await testUtils.clickFirstLineButton(user)

        expect(await taskFirstLineModalTestUtils.findContainer()).toBeInTheDocument()
      })

      describe('Не отображается', () => {
        test('Если нет рабочей группы', () => {
          render(
            <WorkGroupBlock {...props} {...showFirstLineButtonProps} workGroup={undefined} />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })

        test('Если заявка закрыта', () => {
          render(
            <WorkGroupBlock
              {...props}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Closed}
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })

        test('Если заявка завершена', () => {
          render(
            <WorkGroupBlock
              {...props}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Completed}
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.HeadOfDepartment,
              }),
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('Модалка перевода на 1-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      test('При отправке обработчик вызывается корректно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
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

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      test('При отправке обработчик вызывается корректно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...props}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
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
})
