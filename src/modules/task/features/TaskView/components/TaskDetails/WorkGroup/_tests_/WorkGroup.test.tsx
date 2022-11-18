import { getStoreWithAuth, loadingStartedByButton, render } from '_tests_/utils'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { UserRolesEnum } from 'shared/constants/roles'

import taskFirstLineModalTestUtils from '../../../TaskFirstLineModal/_tests_/utils'
import WorkGroup from '../index'
import { firstLineButtonProps, requiredProps } from './constants'
import workGroupTestUtils from './utils'

jest.setTimeout(10000)

describe('Блок рабочей группы', () => {
  describe('Кнопка перевода на 1-ю линию', () => {
    describe('Роль - старший инженер', () => {
      test('Отображается', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(<WorkGroup {...requiredProps} {...firstLineButtonProps} />, {
          store,
        })

        expect(workGroupTestUtils.getFirstLineButton()).toBeInTheDocument()
      })

      test('Не активна если есть запрос на переклассификацию', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...firstLineButtonProps}
            hasReclassificationRequest
          />,
          {
            store,
          },
        )

        expect(workGroupTestUtils.getFirstLineButton()).toBeDisabled()
      })

      test('В состоянии загрузки во время перевода на 1-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.SeniorEngineer,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...firstLineButtonProps}
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
          <WorkGroup {...requiredProps} {...firstLineButtonProps} />,
          {
            store,
          },
        )

        await user.click(workGroupTestUtils.getFirstLineButton())

        expect(
          await taskFirstLineModalTestUtils.findContainer(),
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
              {...firstLineButtonProps}
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
              {...firstLineButtonProps}
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
              {...firstLineButtonProps}
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

        render(<WorkGroup {...requiredProps} {...firstLineButtonProps} />, {
          store,
        })

        expect(workGroupTestUtils.getFirstLineButton()).toBeInTheDocument()
      })

      test('Не активна если есть запрос на переклассификацию', () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...firstLineButtonProps}
            hasReclassificationRequest
          />,
          {
            store,
          },
        )

        expect(workGroupTestUtils.getFirstLineButton()).toBeDisabled()
      })

      test('В состоянии загрузки во время перевода на 1-ю линию', async () => {
        const store = getStoreWithAuth({
          userRole: UserRolesEnum.HeadOfDepartment,
        })

        render(
          <WorkGroup
            {...requiredProps}
            {...firstLineButtonProps}
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
          <WorkGroup {...requiredProps} {...firstLineButtonProps} />,
          {
            store,
          },
        )

        await user.click(workGroupTestUtils.getFirstLineButton())

        expect(
          await taskFirstLineModalTestUtils.findContainer(),
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
              {...firstLineButtonProps}
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
              {...firstLineButtonProps}
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
              {...firstLineButtonProps}
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

        render(<WorkGroup {...requiredProps} {...firstLineButtonProps} />, {
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

        render(<WorkGroup {...requiredProps} {...firstLineButtonProps} />, {
          store,
        })

        expect(
          workGroupTestUtils.queryFirstLineButton(),
        ).not.toBeInTheDocument()
      })
    })
  })
})
