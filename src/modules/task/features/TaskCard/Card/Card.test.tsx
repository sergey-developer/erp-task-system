import {
  generateWord,
  getStoreWithAuth,
  loadingStartedBySkeletonIn,
  loadingStartedBySpinner,
  render,
} from '_tests_/utils'
import modalTestUtils from '_tests_/utils/modal'
import { screen, waitFor } from '@testing-library/react'
import taskFixtures from 'fixtures/task'

import additionalInfoTestUtils from '../AdditionalInfo/_tests_/utils'
import cardTabsTestUtils from '../CardTabs/_tests_/utils'
import {
  activeFirstItemProps,
  activeSecondItemProps,
} from '../CardTitle/_tests_/constants'
import cardTitleTestUtils from '../CardTitle/_tests_/utils'
import mainDetailsTestUtils from '../MainDetails/_tests_/utils'
import secondaryDetailsTestUtils from '../SecondaryDetails/_tests_/utils'
import { availableReasons } from '../TaskReclassificationModal/_tests_/constants'
import taskReclassificationModalTestUtils from '../TaskReclassificationModal/_tests_/utils'
import taskReclassificationRequestTestUtils from '../TaskReclassificationRequest/_tests_/utils'
import taskResolutionModalTestUtils from '../TaskResolutionModal/_tests_/utils'
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

const expectLoadingStarted = () => loadingStartedBySkeletonIn(getContainer())

const expectReclassificationRequestLoadingStarted = () =>
  loadingStartedBySpinner('task-card-reclassification-request-spinner')

export const testUtils = {
  getContainer,
  findContainer,
  expectLoadingStarted,

  expectReclassificationRequestLoadingStarted,
}

describe('Детальная карточка заявки', () => {
  test('Отображает состояние загрузки', () => {
    render(<TaskCard {...requiredProps} taskIsLoading />)
    testUtils.expectLoadingStarted()
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
        render(<TaskCard {...requiredProps} reclassificationRequestIsLoading />)
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

  describe('Блок первичной детальной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(mainDetailsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...requiredProps} details={null} />)
      expect(mainDetailsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Блок вторичной детальной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(secondaryDetailsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...requiredProps} details={null} />)
      expect(secondaryDetailsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Блок дополнительной детальной информации заявки', () => {
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

    describe('При отправке данных', () => {
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

        expect(requiredProps.closeTaskCard).toBeCalledTimes(1)
        expect(requiredProps.resolveTask).toBeCalledTimes(1)
        expect(requiredProps.resolveTask).toBeCalledWith(expect.anything())
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

    describe('При отправке данных', () => {
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
    })

    describe('После отправки данных', () => {
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
