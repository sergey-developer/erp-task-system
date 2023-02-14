import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  findButtonIn,
  generateId,
  generateWord,
  getButtonIn,
  getStoreWithAuth,
  loadingStartedByButton,
  queryButtonIn,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { UserRoleEnum } from 'shared/constants/roles'

import { testUtils as taskFirstLineModalTestUtils } from '../TaskFirstLineModal/TaskFirstLineModal.test'
import { testUtils as taskSecondLineModalTestUtils } from '../TaskSecondLineModal/TaskSecondLineModal.test'
import WorkGroupBlock, { WorkGroupBlockProps } from './index'

const requiredProps: Omit<WorkGroupBlockProps, 'workGroup'> = {
  id: generateId(),
  recordId: generateWord(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
}

const notRequiredProps: Omit<WorkGroupBlockProps, keyof typeof requiredProps> =
  {
    workGroup: taskFixtures.getWorkGroup(),
  }

// first line button
export const showFirstLineButtonProps: Pick<
  WorkGroupBlockProps,
  'workGroup' | 'status'
> = {
  workGroup: taskFixtures.getWorkGroup(),
  status: TaskStatusEnum.New,
}

export const activeFirstLineButtonProps: Pick<
  WorkGroupBlockProps,
  'status' | 'extendedStatus'
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

// second line button
export const showSecondLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup'> =
  {
    workGroup: null,
  }

export const activeSecondLineButtonProps: Pick<
  WorkGroupBlockProps,
  'status' | 'extendedStatus'
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

const getContainer = () => screen.getByTestId('task-work-group')
const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// first line button
const getFirstLineButton = () =>
  getButtonIn(getContainer(), /вернуть на I линию/i)

const findFirstLineButton = () =>
  findButtonIn(getContainer(), /вернуть на I линию/i)

const queryFirstLineButton = () =>
  queryButtonIn(getContainer(), /вернуть на I линию/i)

const clickFirstLineButton = async (user: UserEvent) => {
  const button = getFirstLineButton()
  await user.click(button)
  return button
}

const firstLineLoadingStarted = async () => {
  await loadingStartedByButton(getFirstLineButton())
}

// second line button
const getSecondLineButton = () =>
  getButtonIn(getContainer(), /перевести на II линию/i)

const querySecondLineButton = () =>
  queryButtonIn(getContainer(), /перевести на II линию/i)

const clickSecondLineButton = async (user: UserEvent) => {
  const button = getSecondLineButton()
  await user.click(button)
  return button
}

const secondLineLoadingStarted = async () => {
  await loadingStartedByButton(getSecondLineButton())
}

export const testUtils = {
  getContainer,
  getChildByText,

  getFirstLineButton,
  findFirstLineButton,
  queryFirstLineButton,
  clickFirstLineButton,
  firstLineLoadingStarted,

  getSecondLineButton,
  querySecondLineButton,
  clickSecondLineButton,
  secondLineLoadingStarted,
}

describe('Блок рабочей группы', () => {
  test('Заголовок отображается', () => {
    render(<WorkGroupBlock {...requiredProps} />)
    expect(testUtils.getChildByText(/рабочая группа/i)).toBeInTheDocument()
  })

  describe('Рабочая группа', () => {
    test('Отображается если есть установленное значение', () => {
      render(
        <WorkGroupBlock
          {...requiredProps}
          workGroup={notRequiredProps.workGroup}
        />,
      )

      expect(
        testUtils.getChildByText(notRequiredProps.workGroup!.name),
      ).toBeInTheDocument()
    })

    test('Отображается значение по умолчанию если нет группы', () => {
      render(<WorkGroupBlock {...requiredProps} />)
      expect(testUtils.getChildByText('I линия поддержки')).toBeInTheDocument()
    })
  })

  describe('Кнопка перевода на 2-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Отображается если условия соблюдены', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(testUtils.getSecondLineButton()).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но есть рабочая группа', () => {
          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showSecondLineButtonProps}
              workGroup={workGroupFixtures.getWorkGroup()}
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
            {...requiredProps}
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
              {...requiredProps}
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
              {...requiredProps}
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
            {...requiredProps}
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

        await testUtils.secondLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...requiredProps}
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

        expect(
          await taskSecondLineModalTestUtils.findContainer(),
        ).toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          },
        )
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          },
        )
      })
    })
  })

  describe('Модалка перевода на 2-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('При отправке обработчик вызывается корректно', async () => {
        const workGroupList = workGroupFixtures.getWorkGroupList()
        mockGetWorkGroupListSuccess({ body: workGroupList })

        const { user } = render(
          <WorkGroupBlock
            {...requiredProps}
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
        await taskSecondLineModalTestUtils.openWorkGroup(user)
        await taskSecondLineModalTestUtils.selectWorkGroup(
          user,
          workGroupList[0].name,
        )
        await taskSecondLineModalTestUtils.clickSubmitButton(user)

        expect(requiredProps.transferTaskToSecondLine).toBeCalledTimes(1)
        expect(requiredProps.transferTaskToSecondLine).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })
    })
  })

  describe('Кнопка перевода на 1-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          },
        )

        expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      test('Отображается если условия соблюдены', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          },
        )

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          render(
            <WorkGroupBlock
              {...requiredProps}
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
              {...requiredProps}
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
            {...requiredProps}
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

        await testUtils.firstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...requiredProps}
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

        expect(
          await taskFirstLineModalTestUtils.findModal(),
        ).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но нет рабочей группы', () => {
          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              workGroup={null}
            />,
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
              {...requiredProps}
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
              {...requiredProps}
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
        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          },
        )

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          render(
            <WorkGroupBlock
              {...requiredProps}
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
              {...requiredProps}
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
            {...requiredProps}
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

        await testUtils.firstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const { user } = render(
          <WorkGroupBlock
            {...requiredProps}
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

        expect(
          await taskFirstLineModalTestUtils.findModal(),
        ).toBeInTheDocument()
      })

      describe('Не отображается', () => {
        test('Если нет рабочей группы', () => {
          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              workGroup={null}
            />,
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
              {...requiredProps}
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
              {...requiredProps}
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
            {...requiredProps}
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
        await taskFirstLineModalTestUtils.findModal()
        await taskFirstLineModalTestUtils.setDescription(user, generateWord())
        await taskFirstLineModalTestUtils.clickSubmitButton(user)

        expect(requiredProps.transferTaskToFirstLine).toBeCalledTimes(1)
        expect(requiredProps.transferTaskToFirstLine).toBeCalledWith(
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
            {...requiredProps}
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
        await taskFirstLineModalTestUtils.findModal()
        await taskFirstLineModalTestUtils.setDescription(user, generateWord())
        await taskFirstLineModalTestUtils.clickSubmitButton(user)

        expect(requiredProps.transferTaskToFirstLine).toBeCalledTimes(1)
        expect(requiredProps.transferTaskToFirstLine).toBeCalledWith(
          expect.anything(),
          expect.anything(),
          expect.anything(),
        )
      })
    })
  })
})
