import {
  expectLoadingNotStartedByCard,
  generateWord,
  getStoreWithAuth,
  loadingFinishedByCard,
  loadingStartedByCard,
  loadingStartedBySpinner,
  render,
} from '_tests_/utils'
import modalTestUtils from '_tests_/utils/modal'
import { screen, waitFor, within } from '@testing-library/react'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import { UserRoleEnum } from 'shared/constants/roles'

import additionalInfoTestUtils from '../AdditionalInfo/_tests_/utils'
import {
  activeAssignButtonProps,
  activeAssignOnMeButtonProps,
  activeTakeTaskButtonProps,
  testUtils as assigneeBlockTestUtils,
  canSelectAssigneeProps,
} from '../AssigneeBlock/AssigneeBlock.test'
import cardTabsTestUtils from '../CardTabs/_tests_/utils'
import {
  activeFirstItemProps,
  activeSecondItemProps,
} from '../CardTitle/_tests_/constants'
import cardTitleTestUtils from '../CardTitle/_tests_/utils'
import mainDetailsTestUtils from '../MainDetails/_tests_/utils'
import secondaryDetailsTestUtils from '../SecondaryDetails/_tests_/utils'
import taskFirstLineModalTestUtils from '../TaskFirstLineModal/_tests_/utils'
import { availableReasons } from '../TaskReclassificationModal/_tests_/constants'
import taskReclassificationModalTestUtils from '../TaskReclassificationModal/_tests_/utils'
import taskReclassificationRequestTestUtils from '../TaskReclassificationRequest/_tests_/utils'
import taskResolutionModalTestUtils from '../TaskResolutionModal/_tests_/utils'
import taskSecondLineModalTestUtils from '../TaskSecondLineModal/_tests_/utils'
import {
  activeFirstLineButtonProps,
  activeSecondLineButtonProps,
  showFirstLineButtonProps,
  showSecondLineButtonProps,
  testUtils as workGroupBlockTestUtils,
} from '../WorkGroupBlock/WorkGroupBlock.test'
import TaskCard, { TaskCardProps } from './index'

const requiredProps: TaskCardProps = {
  details: taskFixtures.getTask(),
  closeTaskCard: jest.fn(),

  taskIsLoading: false,
  isGetTaskError: false,

  workGroupList: [],
  workGroupListIsLoading: false,

  deleteWorkGroup: jest.fn(),
  deleteWorkGroupIsLoading: false,

  updateWorkGroup: jest.fn(),
  updateWorkGroupIsLoading: false,

  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,

  resolveTask: jest.fn(),
  isTaskResolving: false,

  takeTask: jest.fn(),
  takeTaskIsLoading: false,

  reclassificationRequest: null,
  reclassificationRequestIsLoading: false,
  createReclassificationRequest: jest.fn(),
  createReclassificationRequestIsLoading: false,

  onExpandAdditionalInfo: jest.fn(),
  additionalInfoExpanded: false,
}

const getContainer = () => screen.getByTestId('task-card')

const findContainer = () => screen.findByTestId('task-card')

const expectLoadingStarted = () => loadingStartedByCard(getContainer())

const expectLoadingNotStarted = () =>
  expectLoadingNotStartedByCard(getContainer())

const expectLoadingFinished = () => loadingFinishedByCard(getContainer())

const getCardDetails = () =>
  within(getContainer()).getByTestId('task-card-details')

const queryCardDetails = () =>
  within(getContainer()).queryByTestId('task-card-details')

const expectReclassificationRequestLoadingStarted = () =>
  loadingStartedBySpinner('task-card-reclassification-request-spinner')

export const testUtils = {
  getContainer,
  findContainer,
  expectLoadingStarted,
  expectLoadingNotStarted,
  expectLoadingFinished,

  getCardDetails,
  queryCardDetails,

  expectReclassificationRequestLoadingStarted,
}

describe('Детальная карточка заявки', () => {
  test('Отображает состояние загрузки', async () => {
    render(<TaskCard {...requiredProps} taskIsLoading />)
    await testUtils.expectLoadingStarted()
  })

  describe('Заголовок', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(cardTitleTestUtils.getContainer()).toBeInTheDocument()
    })

    describe('Не отображается', () => {
      test('Во время загрузки заявки', () => {
        render(<TaskCard {...requiredProps} taskIsLoading />)
        expect(cardTitleTestUtils.queryContainer()).not.toBeInTheDocument()
      })

      test('Если нет данных заявки', () => {
        render(<TaskCard {...requiredProps} details={null} />)
        expect(cardTitleTestUtils.queryContainer()).not.toBeInTheDocument()
      })
    })

    test('При клике на кнопку закрытия обработчик вызывается корректно', async () => {
      const { user } = render(<TaskCard {...requiredProps} />)

      await cardTitleTestUtils.userClickCloseButton(user)

      await waitFor(() => {
        expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
      })
    })
  })

  describe('Основной блок заявки', () => {
    test('Отображается если есть данные', () => {
      render(<TaskCard {...requiredProps} />)
      expect(testUtils.getCardDetails()).toBeInTheDocument()
    })

    describe('Не отображается', () => {
      test('Если нет данных', () => {
        render(<TaskCard {...requiredProps} details={null} />)
        expect(testUtils.queryCardDetails()).not.toBeInTheDocument()
      })

      test('Во время загрузки заявки', () => {
        render(<TaskCard {...requiredProps} taskIsLoading />)
        expect(testUtils.queryCardDetails()).not.toBeInTheDocument()
      })
    })
  })

  describe('Блок первичной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(mainDetailsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...requiredProps} details={null} />)
      expect(mainDetailsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Блок вторичной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(secondaryDetailsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...requiredProps} details={null} />)
      expect(secondaryDetailsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Блок дополнительной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(additionalInfoTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...requiredProps} details={null} />)
      expect(additionalInfoTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Вкладки', () => {
    test('Отображаются', () => {
      render(<TaskCard {...requiredProps} />)
      expect(cardTabsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...requiredProps} details={null} />)
      expect(cardTabsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Переклассификация заявки', () => {
    describe('Запрос на переклассификацию', () => {
      test('Отображается если он есть', async () => {
        render(
          <TaskCard
            {...requiredProps}
            reclassificationRequest={taskFixtures.getTaskReclassificationRequest()}
          />,
        )

        expect(
          await taskReclassificationRequestTestUtils.findContainer(),
        ).toBeInTheDocument()
      })

      test('Не отображается если его нет', () => {
        render(<TaskCard {...requiredProps} />)

        expect(
          taskReclassificationRequestTestUtils.queryContainer(),
        ).not.toBeInTheDocument()
      })

      describe('Отображается состояние загрузки', () => {
        test('При получении запроса на переклассификацию', async () => {
          render(
            <TaskCard {...requiredProps} reclassificationRequestIsLoading />,
          )
          await testUtils.expectReclassificationRequestLoadingStarted()
        })

        test('При создании запроса на переклассификацию', async () => {
          render(
            <TaskCard
              {...requiredProps}
              createReclassificationRequestIsLoading
            />,
          )

          await testUtils.expectReclassificationRequestLoadingStarted()
        })
      })
    })

    describe('Модалка переклассификации заявки', () => {
      test('Открывается', async () => {
        const { user } = render(
          <TaskCard
            {...requiredProps}
            details={{
              ...requiredProps.details!,
              ...activeSecondItemProps,
            }}
          />,
          { store: getStoreWithAuth() },
        )

        await cardTitleTestUtils.userOpenMenu(user)
        await cardTitleTestUtils.userClickSecondMenuItem(user)
        const modal = await taskReclassificationModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })

      describe('Закрывается', () => {
        test('При клике на кнопку "Отмена"', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeSecondItemProps,
              }}
            />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickSecondMenuItem(user)
          const modal = await taskReclassificationModalTestUtils.findContainer()
          await taskReclassificationModalTestUtils.userClickCancelButton(user)

          expect(modal).not.toBeInTheDocument()
        })

        test('При клике на кнопку закрытия', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeSecondItemProps,
              }}
            />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickSecondMenuItem(user)
          const modal = await taskReclassificationModalTestUtils.findContainer()
          await taskReclassificationModalTestUtils.userClickCloseButton(user)

          expect(modal).not.toBeInTheDocument()
        })

        test('При клике вне модалки', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeSecondItemProps,
              }}
            />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickSecondMenuItem(user)
          const modal = await taskReclassificationModalTestUtils.findContainer()
          await modalTestUtils.userClickOutOfModal(user)

          expect(modal).not.toBeInTheDocument()
        })
      })

      describe('При успешном запросе', () => {
        test('Переданный обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeSecondItemProps,
              }}
            />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickSecondMenuItem(user)
          await taskReclassificationModalTestUtils.findContainer()

          await taskReclassificationModalTestUtils.userSetComment(
            user,
            generateWord(),
          )
          await taskReclassificationModalTestUtils.userSetReclassificationReason(
            user,
            availableReasons[0],
          )
          await taskReclassificationModalTestUtils.userClickSubmitButton(user)

          expect(requiredProps.createReclassificationRequest).toBeCalledTimes(1)
          expect(requiredProps.createReclassificationRequest).toBeCalledWith(
            expect.anything(),
          )
        })

        test('Модалка закрывается', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeSecondItemProps,
              }}
            />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickSecondMenuItem(user)
          const modal = await taskReclassificationModalTestUtils.findContainer()

          await taskReclassificationModalTestUtils.userSetComment(
            user,
            generateWord(),
          )
          await taskReclassificationModalTestUtils.userSetReclassificationReason(
            user,
            availableReasons[0],
          )
          await taskReclassificationModalTestUtils.userClickSubmitButton(user)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
        })
      })
    })
  })

  describe('Выполнение заявки', () => {
    describe('Модалка решения по заявке', () => {
      test('Открывается', async () => {
        const { user } = render(
          <TaskCard
            {...requiredProps}
            details={{
              ...requiredProps.details!,
              ...activeFirstItemProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userId: requiredProps.details!.assignee!.id,
            }),
          },
        )

        await cardTitleTestUtils.userOpenMenu(user)
        await cardTitleTestUtils.userClickFirstMenuItem(user)
        const modal = await taskResolutionModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })

      describe('Закрывается', () => {
        test('При клике на кнопку "Отмена"', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeFirstItemProps,
              }}
            />,
            {
              store: getStoreWithAuth({
                userId: requiredProps.details!.assignee!.id,
              }),
            },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickFirstMenuItem(user)
          const modal = await taskResolutionModalTestUtils.findContainer()
          await taskResolutionModalTestUtils.userClickCancelButton(user)

          expect(modal).not.toBeInTheDocument()
        })

        test('При клике на кнопку закрытия', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeFirstItemProps,
              }}
            />,
            {
              store: getStoreWithAuth({
                userId: requiredProps.details!.assignee!.id,
              }),
            },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickFirstMenuItem(user)
          const modal = await taskResolutionModalTestUtils.findContainer()
          await taskResolutionModalTestUtils.userClickCloseButton(user)

          expect(modal).not.toBeInTheDocument()
        })

        test('При клике вне модалки', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeFirstItemProps,
              }}
            />,
            {
              store: getStoreWithAuth({
                userId: requiredProps.details!.assignee!.id,
              }),
            },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickFirstMenuItem(user)
          const modal = await taskResolutionModalTestUtils.findContainer()
          await modalTestUtils.userClickOutOfModal(user)

          expect(modal).not.toBeInTheDocument()
        })
      })

      describe('При успешном запросе', () => {
        test('Переданные обработчики вызываются корректно', async () => {
          const { user } = render(
            <TaskCard
              {...requiredProps}
              details={{
                ...requiredProps.details!,
                ...activeFirstItemProps,
              }}
            />,
            {
              store: getStoreWithAuth({
                userId: requiredProps.details!.assignee!.id,
              }),
            },
          )

          await cardTitleTestUtils.userOpenMenu(user)
          await cardTitleTestUtils.userClickFirstMenuItem(user)
          await taskResolutionModalTestUtils.findContainer()

          await taskResolutionModalTestUtils.userSetTechResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.userSetUserResolution(
            user,
            generateWord(),
          )
          await taskResolutionModalTestUtils.userClickSubmitButton(user)

          expect(requiredProps.resolveTask).toBeCalledTimes(1)
          expect(requiredProps.resolveTask).toBeCalledWith(expect.anything())
          expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
        })
      })
    })
  })

  describe('Получение заявки', () => {
    describe('При ошибке получения', () => {
      test('Вызывается обработчик закрытия карточки', () => {
        render(<TaskCard {...requiredProps} isGetTaskError />)
        expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
      })
    })
  })

  describe('Взятие заявки в работу', () => {
    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskCard {...requiredProps} {...activeTakeTaskButtonProps} />,
        {
          store: getStoreWithAuth({
            userId: requiredProps.details!.assignee!.id,
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        },
      )

      await assigneeBlockTestUtils.userClickTakeTaskButton(user)

      expect(requiredProps.takeTask).toBeCalledTimes(1)
      expect(requiredProps.takeTask).toBeCalledWith(expect.anything())
    })
  })

  describe('Назначение исполнителя заявки', () => {
    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskCard
          {...requiredProps}
          workGroupList={[canSelectAssigneeProps.workGroup]}
          details={{
            ...requiredProps.details!,
            ...canSelectAssigneeProps,
            ...activeAssignButtonProps,
          }}
        />,
        {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
            userId: canSelectAssigneeProps.workGroup.seniorEngineer.id,
          }),
        },
      )

      await assigneeBlockTestUtils.openAssigneeSelect(user)
      await assigneeBlockTestUtils.selectAssignee(
        user,
        canSelectAssigneeProps.workGroup.members[0].fullName,
      )
      await assigneeBlockTestUtils.userClickAssignButton(user)

      expect(requiredProps.updateAssignee).toBeCalledTimes(1)
      expect(requiredProps.updateAssignee).toBeCalledWith(expect.anything())
    })
  })

  describe('Назначение заявки на себя', () => {
    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskCard
          {...requiredProps}
          details={{
            ...requiredProps.details!,
            ...activeAssignOnMeButtonProps,
          }}
        />,
        {
          store: getStoreWithAuth(),
        },
      )

      await assigneeBlockTestUtils.userClickAssignOnMeButton(user)

      expect(requiredProps.updateAssignee).toBeCalledTimes(1)
      expect(requiredProps.updateAssignee).toBeCalledWith(expect.anything())
    })
  })

  describe('Перевод заявки на 1-ю линию', () => {
    test('Переданные обработчики вызываются корректно', async () => {
      const { user } = render(
        <TaskCard
          {...requiredProps}
          workGroupList={[
            workGroupFixtures.getWorkGroup({
              id: showFirstLineButtonProps.workGroup!.id,
            }),
          ]}
          details={{
            ...requiredProps.details!,
            ...showFirstLineButtonProps,
            ...activeFirstLineButtonProps,
          }}
        />,
        {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          }),
        },
      )

      await workGroupBlockTestUtils.userClickFirstLineButton(user)
      await taskFirstLineModalTestUtils.findModal()
      await taskFirstLineModalTestUtils.userSetDescription(user, generateWord())
      await taskFirstLineModalTestUtils.userClickSubmitButton(user)

      expect(requiredProps.deleteWorkGroup).toBeCalledTimes(1)
      expect(requiredProps.deleteWorkGroup).toBeCalledWith(expect.anything())
      expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
    })
  })

  describe('Перевод заявки на 2-ю линию', () => {
    test('Переданные обработчики вызываются корректно', async () => {
      const workGroupList = workGroupFixtures.getWorkGroupList()

      const { user } = render(
        <TaskCard
          {...requiredProps}
          workGroupList={workGroupList}
          details={{
            ...requiredProps.details!,
            ...showSecondLineButtonProps,
            ...activeSecondLineButtonProps,
          }}
        />,
        {
          store: getStoreWithAuth({
            userRole: UserRoleEnum.FirstLineSupport,
          }),
        },
      )

      await workGroupBlockTestUtils.userClickSecondLineButton(user)
      await taskSecondLineModalTestUtils.findContainer()
      const workGroup = workGroupList[0]
      await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
      await taskSecondLineModalTestUtils.userSelectWorkGroup(
        user,
        workGroup.name,
      )
      await taskSecondLineModalTestUtils.userClickSubmitButton(user)

      expect(requiredProps.updateWorkGroup).toBeCalledTimes(1)
      expect(requiredProps.updateWorkGroup).toBeCalledWith(expect.anything())
      expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
    })
  })
})
