import { getStoreWithAuth, render } from '_tests_/utils'
import { workGroupFixtures } from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { UserRolesEnum } from 'shared/constants/roles'

import taskFirstLineModalTestUtils from '../../../TaskFirstLineModal/_tests_/utils'
import taskSecondLineModalTestUtils from '../../../TaskSecondLineModal/_tests_/utils'
import WorkGroup from '../index'
import {
  activeFirstLineButtonProps,
  activeSecondLineButtonProps,
  requiredProps,
  showFirstLineButtonProps,
  showSecondLineButtonProps,
} from './constants'
import workGroupTestUtils from './utils'

describe('Блок рабочей группы', () => {
  test('Заголовок отображается', () => {
    render(<WorkGroup {...requiredProps} />)

    expect(
      workGroupTestUtils.getChildByText('Рабочая группа'),
    ).toBeInTheDocument()
  })

  describe('Кнопка перевода на 2-ю линию', () => {
    describe('Роль - специалист 1-й линии', () => {
      test('Отображается если все условия соблюдены', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <WorkGroup {...requiredProps} {...showSecondLineButtonProps} />,
          { store },
        )

        expect(workGroupTestUtils.getSecondLineButton()).toBeInTheDocument()
      })

      describe('Не отображается если все условия соблюдены', () => {
        test('Но есть рабочая группа', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showSecondLineButtonProps}
              workGroup={workGroupFixtures.getWorkGroup()}
            />,
            { store },
          )

          expect(
            workGroupTestUtils.querySecondLineButton(),
          ).not.toBeInTheDocument()
        })
      })

      test('Активна если все условия соблюдены', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
          />,
          { store },
        )

        expect(workGroupTestUtils.getSecondLineButton()).toBeEnabled()
      })

      describe('Не активна если все условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showSecondLineButtonProps}
              {...activeSecondLineButtonProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store },
          )

          expect(workGroupTestUtils.getSecondLineButton()).toBeDisabled()
        })

        test('Но статус заявки не "Новая" и не "В процессе"', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.FirstLineSupport,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showSecondLineButtonProps}
              {...activeSecondLineButtonProps}
              status={TaskStatusEnum.Awaiting}
            />,
            { store },
          )

          expect(workGroupTestUtils.getSecondLineButton()).toBeDisabled()
        })
      })

      test('Отображает состоянии загрузки во время перевода на 2-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
            transferTaskToSecondLineIsLoading
          />,
          { store },
        )

        await workGroupTestUtils.secondLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        const { user } = render(
          <WorkGroup
            {...requiredProps}
            {...showSecondLineButtonProps}
            {...activeSecondLineButtonProps}
          />,
          { store },
        )

        await workGroupTestUtils.userClickSecondLineButton(user)

        expect(
          await taskSecondLineModalTestUtils.findContainer(),
        ).toBeInTheDocument()
      })
    })

    describe('Роль - инженер', () => {
      test('Не отображается', () => {
        render(
          <WorkGroup {...requiredProps} {...showSecondLineButtonProps} />,
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
          <WorkGroup {...requiredProps} {...showSecondLineButtonProps} />,
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
          <WorkGroup {...requiredProps} {...showSecondLineButtonProps} />,
          {
            store: getStoreWithAuth({
              userRole: UserRolesEnum.HeadOfDepartment,
            }),
          },
        )
      })
    })
  })

  describe('Кнопка перевода на 1-ю линию', () => {
    describe('Роль - старший инженер', () => {
      test('Отображается если все условия соблюдены', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<WorkGroup {...requiredProps} {...showFirstLineButtonProps} />, {
          store,
        })

        expect(workGroupTestUtils.getFirstLineButton()).toBeInTheDocument()
      })

      describe('Не активна если все условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store },
          )

          expect(workGroupTestUtils.getFirstLineButton()).toBeDisabled()
        })

        test('Но заявка в статусе - "В ожидании"', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              status={TaskStatusEnum.Awaiting}
            />,
            { store },
          )

          expect(workGroupTestUtils.getFirstLineButton()).toBeDisabled()
        })
      })

      test('В состоянии загрузки во время перевода на 1-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            transferTaskToFirstLineIsLoading
          />,
          { store },
        )

        await workGroupTestUtils.firstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(
          <WorkGroup
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          { store },
        )

        await workGroupTestUtils.userClickFirstLineButton(user)

        expect(
          await taskFirstLineModalTestUtils.findModal(),
        ).toBeInTheDocument()
      })

      describe('Не отображается если все условия соблюдены', () => {
        test('Но нет рабочей группы', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              workGroup={null}
            />,
            {
              store,
            },
          )

          expect(
            workGroupTestUtils.queryFirstLineButton(),
          ).not.toBeInTheDocument()
        })

        test('Но заявка закрыта', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Closed}
            />,
            { store },
          )

          expect(
            workGroupTestUtils.queryFirstLineButton(),
          ).not.toBeInTheDocument()
        })

        test('Но заявка завершена', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Completed}
            />,
            { store },
          )

          expect(
            workGroupTestUtils.queryFirstLineButton(),
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('Роль - глава отдела', () => {
      test('Отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(<WorkGroup {...requiredProps} {...showFirstLineButtonProps} />, {
          store,
        })

        expect(workGroupTestUtils.getFirstLineButton()).toBeInTheDocument()
      })

      describe('Не активна если все условия соблюдены', () => {
        test('Но есть запрос на переклассификацию', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store },
          )

          expect(workGroupTestUtils.getFirstLineButton()).toBeDisabled()
        })

        test('Но заявка в статусе - "В ожидании"', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              {...activeFirstLineButtonProps}
              status={TaskStatusEnum.Awaiting}
            />,
            { store },
          )

          expect(workGroupTestUtils.getFirstLineButton()).toBeDisabled()
        })
      })

      test('Отображает состояние загрузки во время перевода на 1-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
            transferTaskToFirstLineIsLoading
          />,
          { store },
        )

        await workGroupTestUtils.firstLineLoadingStarted()
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        const { user } = render(
          <WorkGroup
            {...requiredProps}
            {...showFirstLineButtonProps}
            {...activeFirstLineButtonProps}
          />,
          { store },
        )

        await workGroupTestUtils.userClickFirstLineButton(user)

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
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              workGroup={null}
            />,
            {
              store,
            },
          )

          expect(
            workGroupTestUtils.queryFirstLineButton(),
          ).not.toBeInTheDocument()
        })

        test('Если заявка закрыта', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Closed}
            />,
            {
              store,
            },
          )

          expect(
            workGroupTestUtils.queryFirstLineButton(),
          ).not.toBeInTheDocument()
        })

        test('Если заявка завершена', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.HeadOfDepartment,
          })

          render(
            <WorkGroup
              {...requiredProps}
              {...showFirstLineButtonProps}
              status={TaskStatusEnum.Completed}
            />,
            {
              store,
            },
          )

          expect(
            workGroupTestUtils.queryFirstLineButton(),
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('Роль - специалист 1-й линии', () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<WorkGroup {...requiredProps} {...showFirstLineButtonProps} />, {
          store,
        })

        expect(
          workGroupTestUtils.queryFirstLineButton(),
        ).not.toBeInTheDocument()
      })
    })

    describe('Роль - инженер', () => {
      test('Не отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.Engineer,
        })

        render(<WorkGroup {...requiredProps} {...showFirstLineButtonProps} />, {
          store,
        })

        expect(
          workGroupTestUtils.queryFirstLineButton(),
        ).not.toBeInTheDocument()
      })
    })
  })
})
