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
import { UserRolesEnum } from 'shared/constants/roles'

import taskFirstLineModalTestUtils from '../TaskFirstLineModal/_tests_/utils'
import taskSecondLineModalTestUtils from '../TaskSecondLineModal/_tests_/utils'
import WorkGroupBlock, { WorkGroupBlockProps } from './index'

const requiredProps: Omit<WorkGroupBlockProps, 'workGroup'> = {
  id: generateId(),
  recordId: generateWord(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  workGroupList: workGroupFixtures.getWorkGroupList(),
  workGroupListIsLoading: false,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
}

const notRequiredProps: Omit<WorkGroupBlockProps, keyof typeof requiredProps> =
  {
    workGroup: taskFixtures.getTaskWorkGroup(),
  }

// first line button
export const showFirstLineButtonProps: Pick<
  WorkGroupBlockProps,
  'workGroup' | 'status'
> = {
  workGroup: taskFixtures.getTaskWorkGroup(),
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

const userClickFirstLineButton = async (user: UserEvent) => {
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

const userClickSecondLineButton = async (user: UserEvent) => {
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
  userClickFirstLineButton,
  firstLineLoadingStarted,

  getSecondLineButton,
  querySecondLineButton,
  userClickSecondLineButton,
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
    describe('Роль - специалист 1-й линии', () => {
      test('Отображается если условия соблюдены', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          { store },
        )

        expect(testUtils.getSecondLineButton()).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но есть рабочая группа', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showSecondLineButtonProps}
              workGroup={workGroupFixtures.getWorkGroup()}
            />,
            { store },
          )

          expect(testUtils.querySecondLineButton()).not.toBeInTheDocument()
        })
      })

      test('Активна если условия соблюдены', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <WorkGroupBlock
            {...requiredProps}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
          />,
          { store },
        )

        expect(testUtils.getSecondLineButton()).toBeEnabled()
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showSecondLineButtonProps}
              {...activeSecondLineButtonProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store },
          )

          expect(testUtils.getSecondLineButton()).toBeDisabled()
        })

        test('Но статус заявки не "Новая" и не "В процессе"', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showSecondLineButtonProps}
              {...activeSecondLineButtonProps}
              status={TaskStatusEnum.Awaiting}
            />,
            { store },
          )

          expect(testUtils.getSecondLineButton()).toBeDisabled()
        })
      })

      test('Отображает состоянии загрузки во время перевода на 2-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <WorkGroupBlock
            {...requiredProps}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
            transferTaskToSecondLineIsLoading
          />,
          { store },
        )

        await testUtils.secondLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        const { user } = render(
          <WorkGroupBlock
            {...requiredProps}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
          />,
          { store },
        )

        await testUtils.userClickSecondLineButton(user)

        expect(
          await taskSecondLineModalTestUtils.findContainer(),
        ).toBeInTheDocument()
      })
    })

    describe('Роль - инженер', () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRolesEnum.Engineer,
            }),
          },
        )
      })
    })

    describe('Роль - старший инженер', () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRolesEnum.SeniorEngineer,
            }),
          },
        )
      })
    })

    describe('Роль - глава отдела', () => {
      test('Не отображается', () => {
        render(
          <WorkGroupBlock {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRolesEnum.HeadOfDepartment,
            }),
          },
        )
      })
    })
  })

  describe('Модалка перевода на 2-ю линию', () => {
    test('При отправке обработчик вызывается корректно', async () => {
      const store = getStoreWithAuth({
        userRole: UserRolesEnum.FirstLineSupport,
      })

      const { user } = render(
        <WorkGroupBlock
          {...requiredProps}
          {...showSecondLineButtonProps}
          {...activeSecondLineButtonProps}
        />,
        { store },
      )

      await testUtils.userClickSecondLineButton(user)
      await taskSecondLineModalTestUtils.findContainer()
      const workGroup = requiredProps.workGroupList[0]
      await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
      await taskSecondLineModalTestUtils.userSelectWorkGroup(
        user,
        workGroup.name,
      )
      await taskSecondLineModalTestUtils.userClickSubmitButton(user)

      expect(requiredProps.transferTaskToSecondLine).toBeCalledTimes(1)
    })
  })

  describe('Кнопка перевода на 1-ю линию', () => {
    describe('Роль - старший инженер', () => {
      test('Отображается если условия соблюдены', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store,
          },
        )

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
        })

        test('Но статус заявки "В ожидании"', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              status={TaskStatusEnum.Awaiting}
            />,
            { store },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
        })
      })

      test('В состоянии загрузки во время перевода на 1-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(
          <WorkGroupBlock
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            transferTaskToFirstLineIsLoading
          />,
          { store },
        )

        await testUtils.firstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(
          <WorkGroupBlock
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          { store },
        )

        await testUtils.userClickFirstLineButton(user)

        expect(
          await taskFirstLineModalTestUtils.findModal(),
        ).toBeInTheDocument()
      })

      describe('Не отображается если условия соблюдены', () => {
        test('Но нет рабочей группы', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              workGroup={null}
            />,
            {
              store,
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })

        test('Но заявка закрыта', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Closed}
            />,
            { store },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })

        test('Но заявка завершена', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Completed}
            />,
            { store },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })
      })
    })

    describe('Роль - глава отдела', () => {
      test('Отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store,
          },
        )

        expect(testUtils.getFirstLineButton()).toBeInTheDocument()
      })

      describe('Не активна если условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
        })

        test('Но статус заявки "В ожидании"', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              status={TaskStatusEnum.Awaiting}
            />,
            { store },
          )

          expect(testUtils.getFirstLineButton()).toBeDisabled()
        })
      })

      test('Отображает состояние загрузки во время перевода на 1-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(
          <WorkGroupBlock
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            transferTaskToFirstLineIsLoading
          />,
          { store },
        )

        await testUtils.firstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        const { user } = render(
          <WorkGroupBlock
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          { store },
        )

        await testUtils.userClickFirstLineButton(user)

        expect(
          await taskFirstLineModalTestUtils.findModal(),
        ).toBeInTheDocument()
      })

      describe('Не отображается', () => {
        test('Если нет рабочей группы', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              workGroup={null}
            />,
            {
              store,
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })

        test('Если заявка закрыта', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Closed}
            />,
            {
              store,
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })

        test('Если заявка завершена', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroupBlock
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Completed}
            />,
            {
              store,
            },
          )

          expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
        })
      })
    })

    describe('Роль - специалист 1-й линии', () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store,
          },
        )

        expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })
    })

    describe('Роль - инженер', () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.Engineer,
        })

        render(
          <WorkGroupBlock {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store,
          },
        )

        expect(testUtils.queryFirstLineButton()).not.toBeInTheDocument()
      })
    })
  })

  describe('Модалка перевода на 1-ю линию', () => {
    test('При отправке обработчик вызывается корректно', async () => {
      const store = getStoreWithAuth({
        userRole: UserRolesEnum.SeniorEngineer,
      })

      const { user } = render(
        <WorkGroupBlock
          {...requiredProps}
          {...showFirstLineButtonProps}
          {...activeFirstLineButtonProps}
        />,
        { store },
      )

      await testUtils.userClickFirstLineButton(user)
      await taskFirstLineModalTestUtils.findModal()
      await taskFirstLineModalTestUtils.userSetDescription(user, generateWord())
      await taskFirstLineModalTestUtils.userClickSubmitButton(user)

      expect(requiredProps.transferTaskToFirstLine).toBeCalledTimes(1)
    })
  })
})
