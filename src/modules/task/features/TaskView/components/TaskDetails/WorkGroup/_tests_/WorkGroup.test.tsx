import { getStoreWithAuth, loadingStartedByButton, render } from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { UserRolesEnum } from 'shared/constants/roles'

import taskFirstLineModalTestUtils from '../../../TaskFirstLineModal/_tests_/utils'
import WorkGroup from '../index'
import {
  activeFirstLineButtonProps,
  requiredProps,
  showFirstLineButtonProps,
} from './constants'
import workGroupTestUtils from './utils'

jest.setTimeout(10000)

describe('Блок рабочей группы', () => {
  describe('Кнопка перевода на 1-ю линию', () => {
    describe('Роль - старший инженер', () => {
      test('Отображается', () => {
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
            transferTaskToFirstLineIsLoading
          />,
          {
            store,
          },
        )

        await loadingStartedByButton(workGroupTestUtils.getFirstLineButton())
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        const { user } = render(
          <WorkGroup {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store,
          },
        )

        await user.click(workGroupTestUtils.getFirstLineButton())

        expect(
          await taskFirstLineModalTestUtils.findModal(),
        ).toBeInTheDocument()
      })

      describe('Не отображается', () => {
        test('Если нет рабочей группы', () => {
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

        test('Если заявка закрыта', () => {
          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
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
            userRole: UserRolesEnum.SeniorEngineer,
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

      test('В состоянии загрузки во время перевода на 1-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...showFirstLineButtonProps}
            transferTaskToFirstLineIsLoading
          />,
          {
            store,
          },
        )

        await loadingStartedByButton(workGroupTestUtils.getFirstLineButton())
      })

      test('При клике открывается модальное окно', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        const { user } = render(
          <WorkGroup {...requiredProps} {...showFirstLineButtonProps} />,
          {
            store,
          },
        )

        await user.click(workGroupTestUtils.getFirstLineButton())

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
