import { screen, waitFor, within } from '@testing-library/react'

import {
  SuspendReasonEnum,
  SuspendRequestStatusEnum,
} from 'modules/task/constants/taskSuspendRequest'
import { UserRoleEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import { MimetypeEnum } from 'shared/constants/mimetype'
import * as base64Utils from 'shared/utils/common/base64'
import * as downloadFileUtils from 'shared/utils/file/downloadFile'

import taskFixtures from '_tests_/fixtures/task'
import workGroupFixtures from '_tests_/fixtures/workGroup'
import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  buttonTestUtils,
  cardTestUtils,
  fakeWord,
  getStoreWithAuth,
  render,
  spinnerTestUtils,
} from '_tests_/utils'

import { testUtils as confirmExecuteTaskModalTestUtils } from '../../ConfirmExecuteTaskModal/ConfirmExecuteTaskModal.test'
import { testUtils as executeTaskModalTestUtils } from '../../ExecuteTaskModal/ExecuteTaskModal.test'
import {
  availableReasons,
  testUtils as taskReclassificationModalTestUtils,
} from '../../RequestTaskReclassificationModal/RequestTaskReclassificationModal.test'
import { testUtils as requestTaskSuspendModalTestUtils } from '../../RequestTaskSuspendModal/RequestTaskSuspendModal.test'
import { testUtils as taskFirstLineModalTestUtils } from '../../TaskFirstLineModal/TaskFirstLineModal.test'
import { testUtils as taskReclassificationRequestTestUtils } from '../../TaskReclassificationRequest/TaskReclassificationRequest.test'
import { testUtils as taskSecondLineModalTestUtils } from '../../TaskSecondLineModal/TaskSecondLineModal.test'
import { testUtils as taskSuspendRequestTestUtils } from '../../TaskSuspendRequest/TaskSuspendRequest.test'
import { testUtils as additionalInfoTestUtils } from '../AdditionalInfo/AdditionalInfo.test'
import {
  activeAssignButtonProps,
  activeAssignOnMeButtonProps,
  activeTakeTaskButtonProps,
  canSelectAssigneeProps,
  testUtils as assigneeBlockTestUtils,
} from '../AssigneeBlock/AssigneeBlock.test'
import { testUtils as mainDetailsTestUtils } from '../MainDetails/MainDetails.test'
import { testUtils as secondaryDetailsTestUtils } from '../SecondaryDetails/SecondaryDetails.test'
import { testUtils as cardTabsTestUtils } from '../Tabs/Tabs.test'
import {
  activeExecuteTaskItemProps,
  activeRequestReclassificationItemProps,
  activeRequestSuspendItemProps,
  testUtils as cardTitleTestUtils,
} from '../Title/Title.test'
import {
  activeFirstLineButtonProps,
  activeSecondLineButtonProps,
  showFirstLineButtonProps,
  showSecondLineButtonProps,
  testUtils as workGroupBlockTestUtils,
} from '../WorkGroupBlock/WorkGroupBlock.test'
import TaskCard, { TaskCardProps } from './index'

const props: Readonly<TaskCardProps> = {
  task: taskFixtures.task(),
  refetchTask: jest.fn(),
  closeTaskCard: jest.fn(),

  taskIsLoading: false,
  isGetTaskError: false,

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

  getTaskWorkPerformedAct: jest.fn(),
  taskWorkPerformedActIsLoading: false,

  reclassificationRequest: null,
  reclassificationRequestIsLoading: false,
  createReclassificationRequest: jest.fn(),
  createReclassificationRequestIsLoading: false,

  createSuspendRequest: jest.fn(),
  createSuspendRequestIsLoading: false,
  cancelSuspendRequest: jest.fn(),
  cancelSuspendRequestIsLoading: false,

  onExpandAdditionalInfo: jest.fn(),
  additionalInfoExpanded: false,
}

const getContainer = () => screen.getByTestId('task-card')
const findContainer = () => screen.findByTestId('task-card')

const expectLoadingStarted = () => cardTestUtils.expectLoadingStarted(getContainer())
const expectLoadingNotStarted = () => cardTestUtils.expectLoadingNotStarted(getContainer())
const expectLoadingFinished = () => cardTestUtils.expectLoadingFinished(getContainer())

const getCardDetails = () => within(getContainer()).getByTestId('task')
const queryCardDetails = () => within(getContainer()).queryByTestId('task')

const taskCardReclassificationRequestSpinnerTestId = 'task-reclassification-request-loading'

const expectReclassificationRequestLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  taskCardReclassificationRequestSpinnerTestId,
)

const expectReclassificationRequestLoadingNotStarted = spinnerTestUtils.expectLoadingNotStarted(
  taskCardReclassificationRequestSpinnerTestId,
)

const expectReclassificationRequestLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  taskCardReclassificationRequestSpinnerTestId,
)

export const testUtils = {
  getContainer,
  findContainer,
  expectLoadingStarted,
  expectLoadingNotStarted,
  expectLoadingFinished,

  getCardDetails,
  queryCardDetails,

  expectReclassificationRequestLoadingStarted,
  expectReclassificationRequestLoadingNotStarted,
  expectReclassificationRequestLoadingFinished,
}

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Карточка заявки', () => {
  test('Отображает состояние загрузки', async () => {
    render(<TaskCard {...props} taskIsLoading />)
    await testUtils.expectLoadingStarted()
  })

  describe('Заголовок', () => {
    test('Отображается', () => {
      render(<TaskCard {...props} />)
      expect(cardTitleTestUtils.getContainer()).toBeInTheDocument()
    })

    describe('Не отображается', () => {
      test('Во время загрузки заявки', () => {
        render(<TaskCard {...props} taskIsLoading />)
        expect(cardTitleTestUtils.queryContainer()).not.toBeInTheDocument()
      })

      test('Если нет данных заявки', () => {
        render(<TaskCard {...props} task={null} />)
        expect(cardTitleTestUtils.queryContainer()).not.toBeInTheDocument()
      })
    })

    test('При клике на кнопку закрытия вызывается обработчик', async () => {
      const { user } = render(<TaskCard {...props} />)

      await buttonTestUtils.clickCloseButtonIn(cardTitleTestUtils.getContainer(), user)

      await waitFor(() => {
        expect(props.closeTaskCard).toBeCalledTimes(1)
      })
    })

    test('При клике на кнопку перезапроса заявки обработчик вызывается корректно', async () => {
      const { user } = render(<TaskCard {...props} />)

      await cardTitleTestUtils.clickReloadButton(user)

      await waitFor(() => {
        expect(props.refetchTask).toBeCalledTimes(1)
      })
    })
  })

  describe('Основной блок заявки', () => {
    test('Отображается если есть данные', () => {
      render(<TaskCard {...props} />)
      expect(testUtils.getCardDetails()).toBeInTheDocument()
    })

    describe('Не отображается', () => {
      test('Если нет данных', () => {
        render(<TaskCard {...props} task={null} />)
        expect(testUtils.queryCardDetails()).not.toBeInTheDocument()
      })

      test('Во время загрузки заявки', () => {
        render(<TaskCard {...props} taskIsLoading />)
        expect(testUtils.queryCardDetails()).not.toBeInTheDocument()
      })
    })
  })

  describe('Блок первичной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...props} />)
      expect(mainDetailsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...props} task={null} />)
      expect(mainDetailsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Блок вторичной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...props} />)
      expect(secondaryDetailsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...props} task={null} />)
      expect(secondaryDetailsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Блок дополнительной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...props} />)
      expect(additionalInfoTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...props} task={null} />)
      expect(additionalInfoTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Вкладки', () => {
    test('Отображаются', () => {
      render(<TaskCard {...props} />)
      expect(cardTabsTestUtils.getContainer()).toBeInTheDocument()
    })

    test('Не отображается если нет данных заявки', () => {
      render(<TaskCard {...props} task={null} />)
      expect(cardTabsTestUtils.queryContainer()).not.toBeInTheDocument()
    })
  })

  describe('Переклассификация заявки', () => {
    describe('Запрос на переклассификацию', () => {
      test('Отображается если он есть', async () => {
        render(
          <TaskCard {...props} reclassificationRequest={taskFixtures.reclassificationRequest()} />,
        )

        expect(await taskReclassificationRequestTestUtils.findContainer()).toBeInTheDocument()
      })

      test('Не отображается если его нет', () => {
        render(<TaskCard {...props} />)

        expect(taskReclassificationRequestTestUtils.queryContainer()).not.toBeInTheDocument()
      })

      describe('Отображается состояние загрузки', () => {
        test('При получении запроса на переклассификацию', async () => {
          render(<TaskCard {...props} reclassificationRequestIsLoading />)
          await testUtils.expectReclassificationRequestLoadingStarted()
        })

        test('При создании запроса на переклассификацию', async () => {
          render(<TaskCard {...props} createReclassificationRequestIsLoading />)

          await testUtils.expectReclassificationRequestLoadingStarted()
        })
      })
    })

    describe('Модалка переклассификации заявки', () => {
      test('Открывается если есть обращение', async () => {
        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              ...activeRequestReclassificationItemProps,
              parentInteractionExternalId: fakeWord(),
            }}
          />,
          { store: getStoreWithAuth() },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickRequestReclassificationItem(user)
        const modal = await taskReclassificationModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })

      test('Предупреждение отображается вместо модалки если нет обращения', async () => {
        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              ...activeRequestReclassificationItemProps,
              parentInteractionExternalId: null,
            }}
          />,
          { store: getStoreWithAuth() },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickRequestReclassificationItem(user)
        const modal = taskReclassificationModalTestUtils.queryContainer()
        const warning = within(await screen.findByRole('dialog')).getByText(
          'Невозможно переклассифицировать заявку без обращения',
        )

        expect(modal).not.toBeInTheDocument()
        expect(warning).toBeInTheDocument()
      })

      test('Закрывается', async () => {
        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              ...activeRequestReclassificationItemProps,
            }}
          />,
          { store: getStoreWithAuth() },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickRequestReclassificationItem(user)
        const modal = await taskReclassificationModalTestUtils.findContainer()
        await taskReclassificationModalTestUtils.clickCancelButton(user)

        expect(modal).not.toBeInTheDocument()
      })

      describe('При успешном запросе', () => {
        test('Переданный обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                ...activeRequestReclassificationItemProps,
              }}
            />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickRequestReclassificationItem(user)
          await taskReclassificationModalTestUtils.findContainer()

          await taskReclassificationModalTestUtils.setComment(user, fakeWord())
          await taskReclassificationModalTestUtils.setReclassificationReason(
            user,
            availableReasons[0],
          )
          await taskReclassificationModalTestUtils.clickSubmitButton(user)

          expect(props.createReclassificationRequest).toBeCalledTimes(1)
          expect(props.createReclassificationRequest).toBeCalledWith(expect.anything())
        })

        test('Модалка закрывается', async () => {
          const { user } = render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                ...activeRequestReclassificationItemProps,
              }}
            />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickRequestReclassificationItem(user)
          const modal = await taskReclassificationModalTestUtils.findContainer()

          await taskReclassificationModalTestUtils.setComment(user, fakeWord())
          await taskReclassificationModalTestUtils.setReclassificationReason(
            user,
            availableReasons[0],
          )
          await taskReclassificationModalTestUtils.clickSubmitButton(user)
          await waitFor(() => expect(modal).not.toBeInTheDocument())
        })
      })
    })
  })

  describe('Выполнение заявки', () => {
    describe('Модалка выполнения заявки', () => {
      test('Открывается если у заявки есть заявки на перемещение', async () => {
        const task = taskFixtures.task({ hasRelocationTasks: true })

        const { user } = render(
          <TaskCard {...props} task={{ ...task, ...activeExecuteTaskItemProps }} />,
          {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
            }),
          },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickExecuteTaskItem(user)
        const modal = await executeTaskModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })

      test('Закрывается при клике на кнопку отмены', async () => {
        const task = taskFixtures.task({ hasRelocationTasks: true })

        const { user } = render(
          <TaskCard {...props} task={{ ...task, ...activeExecuteTaskItemProps }} />,
          {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
            }),
          },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickExecuteTaskItem(user)
        const modal = await executeTaskModalTestUtils.findContainer()
        await executeTaskModalTestUtils.clickCancelButton(user)

        await waitFor(() => expect(modal).not.toBeInTheDocument())
      })
    })

    describe('Модалка подтверждения выполнения', () => {
      test('Открывается если у заявки нет заявок на перемещение', async () => {
        const task = taskFixtures.task({ hasRelocationTasks: false })

        const { user } = render(
          <TaskCard {...props} task={{ ...task, ...activeExecuteTaskItemProps }} />,
          {
            store: getStoreWithAuth({ userId: task.assignee!.id }),
          },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickExecuteTaskItem(user)
        const modal = await confirmExecuteTaskModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })

      test('Закрывается при клике на кнопку отмены', async () => {
        const task = taskFixtures.task({ hasRelocationTasks: false })

        const { user } = render(
          <TaskCard {...props} task={{ ...task, ...activeExecuteTaskItemProps }} />,
          {
            store: getStoreWithAuth({ userId: task.assignee!.id }),
          },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickExecuteTaskItem(user)
        const modal = await confirmExecuteTaskModalTestUtils.findContainer()
        await confirmExecuteTaskModalTestUtils.clickCancelButton(user)

        await waitFor(() => expect(modal).not.toBeInTheDocument())
      })

      test('Закрывается при клике на кнопку подтверждения и открывается модалка выполнения заявки', async () => {
        const task = taskFixtures.task({ hasRelocationTasks: false })

        const { user } = render(
          <TaskCard {...props} task={{ ...task, ...activeExecuteTaskItemProps }} />,
          {
            store: getStoreWithAuth({ userId: task.assignee!.id }),
          },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickExecuteTaskItem(user)
        const confirmModal = await confirmExecuteTaskModalTestUtils.findContainer()
        await confirmExecuteTaskModalTestUtils.clickConfirmButton(user)
        const executeTaskModal = await executeTaskModalTestUtils.findContainer()

        await waitFor(() => expect(confirmModal).not.toBeInTheDocument())
        expect(executeTaskModal).toBeInTheDocument()
      })
    })

    describe('При успешном запросе', () => {
      test('Переданные обработчики вызываются', async () => {
        const task = taskFixtures.task({ hasRelocationTasks: true })

        const { user } = render(
          <TaskCard {...props} task={{ ...task, ...activeExecuteTaskItemProps }} />,
          {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
            }),
          },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickExecuteTaskItem(user)
        await executeTaskModalTestUtils.findContainer()

        await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
        await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
        await executeTaskModalTestUtils.setAttachment(user)
        await executeTaskModalTestUtils.clickSubmitButton(user)

        expect(props.resolveTask).toBeCalledTimes(1)
        expect(props.resolveTask).toBeCalledWith(expect.anything())
        expect(props.closeTaskCard).toBeCalledTimes(1)
      })
    })

    test.todo('При не успешном запросе')

    describe('Формирование акта', () => {
      test('Корректно отрабатывает успешный вызов', async () => {
        const downloadFileSpy = jest.spyOn(downloadFileUtils, 'downloadFile')

        const base64ToArrayBufferSpy = jest.spyOn(base64Utils, 'base64ToArrayBuffer')
        const fakeArrayBuffer = new Uint8Array()
        base64ToArrayBufferSpy.mockReturnValueOnce(fakeArrayBuffer)

        const fakeFile = fakeWord()
        const getTaskWorkPerformedActMock = jest.fn(() => ({
          unwrap: jest.fn(() => fakeFile),
        }))

        const task = taskFixtures.task({ hasRelocationTasks: true })

        const { user } = render(
          <TaskCard
            {...props}
            task={{ ...task, ...activeExecuteTaskItemProps }}
            getTaskWorkPerformedAct={getTaskWorkPerformedActMock as any}
          />,
          {
            store: getStoreWithAuth({
              userId: task.assignee!.id,
            }),
          },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickExecuteTaskItem(user)
        await executeTaskModalTestUtils.findContainer()

        await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
        await executeTaskModalTestUtils.clickGetActButton(user)

        expect(getTaskWorkPerformedActMock).toBeCalledTimes(1)
        expect(getTaskWorkPerformedActMock).toBeCalledWith(expect.anything())

        expect(base64ToArrayBufferSpy).toBeCalledTimes(1)
        expect(base64ToArrayBufferSpy).toBeCalledWith(fakeFile)

        expect(downloadFileSpy).toBeCalledTimes(1)
        expect(downloadFileSpy).toBeCalledWith(
          fakeArrayBuffer,
          MimetypeEnum.Pdf,
          `Акт о выполненных работах ${task!.id}`,
        )
      })

      test.todo('При не успешном запросе')
    })
  })

  describe('Получение заявки', () => {
    test('При ошибке вызывается обработчик закрытия карточки', () => {
      render(<TaskCard {...props} isGetTaskError />)
      expect(props.closeTaskCard).toBeCalledTimes(1)
    })
  })

  describe('Взятие заявки в работу', () => {
    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskCard {...props} {...activeTakeTaskButtonProps} />, {
        store: getStoreWithAuth({
          userId: props.task!.assignee!.id,
          userRole: UserRoleEnum.FirstLineSupport,
        }),
      })

      await assigneeBlockTestUtils.clickTakeTaskButton(user)

      expect(props.takeTask).toBeCalledTimes(1)
      expect(props.takeTask).toBeCalledWith(expect.anything())
    })
  })

  describe('Назначение исполнителя заявки', () => {
    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskCard
          {...props}
          task={{
            ...props.task!,
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
        getFullUserName(canSelectAssigneeProps.workGroup.members[0]),
      )
      await assigneeBlockTestUtils.clickAssignButton(user)

      expect(props.updateAssignee).toBeCalledTimes(1)
      expect(props.updateAssignee).toBeCalledWith(expect.anything())
    })
  })

  describe('Назначение заявки на себя', () => {
    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskCard
          {...props}
          task={{
            ...props.task!,
            ...activeAssignOnMeButtonProps,
          }}
        />,
        {
          store: getStoreWithAuth(),
        },
      )

      await assigneeBlockTestUtils.clickAssignOnMeButton(user)

      expect(props.updateAssignee).toBeCalledTimes(1)
      expect(props.updateAssignee).toBeCalledWith(expect.anything())
    })
  })

  describe('Перевод заявки на 1-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              ...showFirstLineButtonProps,
              ...activeFirstLineButtonProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        await workGroupBlockTestUtils.clickFirstLineButton(user)
        const modal = await taskFirstLineModalTestUtils.findContainer()
        await taskFirstLineModalTestUtils.setDescription(user, fakeWord())
        await taskFirstLineModalTestUtils.clickSubmitButton(user)

        expect(props.deleteWorkGroup).toBeCalledTimes(1)
        expect(props.deleteWorkGroup).toBeCalledWith(expect.anything())
        expect(props.closeTaskCard).toBeCalledTimes(1)
        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
      test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              ...showFirstLineButtonProps,
              ...activeFirstLineButtonProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.Engineer,
            }),
          },
        )

        await workGroupBlockTestUtils.clickFirstLineButton(user)
        const modal = await taskFirstLineModalTestUtils.findContainer()
        await taskFirstLineModalTestUtils.setDescription(user, fakeWord())
        await taskFirstLineModalTestUtils.clickSubmitButton(user)

        expect(props.deleteWorkGroup).toBeCalledTimes(1)
        expect(props.deleteWorkGroup).toBeCalledWith(expect.anything())
        expect(props.closeTaskCard).toBeCalledTimes(1)
        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
      test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
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

        await workGroupBlockTestUtils.clickFirstLineButton(user)
        const modal = await taskFirstLineModalTestUtils.findContainer()
        await taskFirstLineModalTestUtils.setDescription(user, fakeWord())
        await taskFirstLineModalTestUtils.clickSubmitButton(user)

        expect(props.deleteWorkGroup).toBeCalledTimes(1)
        expect(props.deleteWorkGroup).toBeCalledWith(expect.anything())
        expect(props.closeTaskCard).toBeCalledTimes(1)
        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })
    })

    describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
      test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              ...showFirstLineButtonProps,
              ...activeFirstLineButtonProps,
            }}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.HeadOfDepartment,
            }),
          },
        )

        await workGroupBlockTestUtils.clickFirstLineButton(user)
        const modal = await taskFirstLineModalTestUtils.findContainer()
        await taskFirstLineModalTestUtils.setDescription(user, fakeWord())
        await taskFirstLineModalTestUtils.clickSubmitButton(user)

        expect(props.deleteWorkGroup).toBeCalledTimes(1)
        expect(props.deleteWorkGroup).toBeCalledWith(expect.anything())
        expect(props.closeTaskCard).toBeCalledTimes(1)
        await waitFor(() => expect(modal).not.toBeInTheDocument())
      })
    })
  })

  describe('Перевод заявки на 2-ю линию', () => {
    describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
      test('Переданные обработчики вызываются корректно и закрывается модалка', async () => {
        const workGroupList = workGroupFixtures.workGroupList()
        mockGetWorkGroupListSuccess({ body: workGroupList })

        const { user } = render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
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

        await workGroupBlockTestUtils.clickSecondLineButton(user)
        const modal = await taskSecondLineModalTestUtils.findContainer()
        await taskSecondLineModalTestUtils.expectWorkGroupLoadingFinished()
        await taskSecondLineModalTestUtils.openWorkGroupField(user)
        await taskSecondLineModalTestUtils.selectWorkGroup(user, workGroupList[0].name)
        await taskSecondLineModalTestUtils.setComment(user, fakeWord())
        await taskSecondLineModalTestUtils.clickSubmitButton(user)

        expect(props.updateWorkGroup).toBeCalledTimes(1)
        expect(props.updateWorkGroup).toBeCalledWith(expect.anything())
        expect(props.closeTaskCard).toBeCalledTimes(1)
        await waitFor(() => {
          expect(modal).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('Перевод заявки в ожидание', () => {
    describe('Запрос перевода заявки в ожидание', () => {
      test('Отображается если он есть', async () => {
        render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              suspendRequest: taskFixtures.suspendRequest(),
            }}
          />,
        )

        expect(await taskSuspendRequestTestUtils.findContainer()).toBeInTheDocument()
      })

      test('Не отображается если его нет', () => {
        render(
          <TaskCard
            {...props}
            task={{
              ...props.task!,
              suspendRequest: null,
            }}
          />,
        )

        expect(taskSuspendRequestTestUtils.queryContainer()).not.toBeInTheDocument()
      })

      describe('Заголовок отображается корректно', () => {
        test(`Если статус запроса "${SuspendRequestStatusEnum.New}"`, () => {
          render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.New,
                }),
              }}
            />,
          )

          expect(
            taskSuspendRequestTestUtils.getChildByText(/запрошено ожидание/i),
          ).toBeInTheDocument()
        })

        test(`Если статус запроса "${SuspendRequestStatusEnum.Approved}"`, () => {
          render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.Approved,
                }),
              }}
            />,
          )

          expect(
            taskSuspendRequestTestUtils.getChildByText(/заявка в ожидании/i),
          ).toBeInTheDocument()
        })
      })

      describe('Кнопка отмены запроса', () => {
        test(`Отображается если статус запроса "${SuspendRequestStatusEnum.New}"`, async () => {
          render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.New,
                }),
              }}
            />,
          )

          await taskSuspendRequestTestUtils.findContainer()

          expect(taskSuspendRequestTestUtils.getCancelButton()).toBeInTheDocument()
        })

        test(`Отображается если статус запроса "${SuspendRequestStatusEnum.InProgress}"`, async () => {
          render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.InProgress,
                }),
              }}
            />,
          )

          await taskSuspendRequestTestUtils.findContainer()

          expect(taskSuspendRequestTestUtils.getCancelButton()).toBeInTheDocument()
        })

        describe('Активна', () => {
          test(`Для роли - ${UserRoleEnum.FirstLineSupport}`, async () => {
            render(
              <TaskCard
                {...props}
                task={{
                  ...props.task!,
                  suspendRequest: taskFixtures.suspendRequest({
                    status: SuspendRequestStatusEnum.New,
                  }),
                }}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.FirstLineSupport,
                }),
              },
            )

            await taskSuspendRequestTestUtils.findContainer()

            expect(taskSuspendRequestTestUtils.getCancelButton()).toBeEnabled()
          })

          test(`Для роли - ${UserRoleEnum.SeniorEngineer}`, async () => {
            render(
              <TaskCard
                {...props}
                task={{
                  ...props.task!,
                  suspendRequest: taskFixtures.suspendRequest({
                    status: SuspendRequestStatusEnum.New,
                  }),
                }}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.SeniorEngineer,
                }),
              },
            )

            await taskSuspendRequestTestUtils.findContainer()

            expect(taskSuspendRequestTestUtils.getCancelButton()).toBeEnabled()
          })

          test(`Для роли - ${UserRoleEnum.HeadOfDepartment}`, async () => {
            render(
              <TaskCard
                {...props}
                task={{
                  ...props.task!,
                  suspendRequest: taskFixtures.suspendRequest({
                    status: SuspendRequestStatusEnum.New,
                  }),
                }}
              />,
              {
                store: getStoreWithAuth({
                  userRole: UserRoleEnum.HeadOfDepartment,
                }),
              },
            )

            await taskSuspendRequestTestUtils.findContainer()

            expect(taskSuspendRequestTestUtils.getCancelButton()).toBeEnabled()
          })
        })

        describe('Не активна', () => {
          test(`Для роли - ${UserRoleEnum.Engineer}`, async () => {
            render(
              <TaskCard
                {...props}
                task={{
                  ...props.task!,
                  suspendRequest: taskFixtures.suspendRequest({
                    status: SuspendRequestStatusEnum.New,
                  }),
                }}
              />,
              { store: getStoreWithAuth({ userRole: UserRoleEnum.Engineer }) },
            )

            await taskSuspendRequestTestUtils.findContainer()

            expect(taskSuspendRequestTestUtils.getCancelButton()).toBeDisabled()
          })
        })

        test('Отображает состояние загрузки', async () => {
          render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.New,
                }),
              }}
              cancelSuspendRequestIsLoading
            />,
          )

          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.expectCancelRequestLoadingStarted()
        })

        test('Обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.New,
                }),
              }}
            />,
          )

          await taskSuspendRequestTestUtils.findContainer()
          await taskSuspendRequestTestUtils.clickCancelButton(user)

          await waitFor(() => {
            expect(props.cancelSuspendRequest).toBeCalledTimes(1)
          })

          expect(props.cancelSuspendRequest).toBeCalledWith(expect.anything())
        })
      })

      describe('Кнопка возврата в работу', () => {
        test(`Отображается если статус запроса "${SuspendRequestStatusEnum.Approved}"`, async () => {
          render(
            <TaskCard
              {...props}
              task={{
                ...props.task!,
                suspendRequest: taskFixtures.suspendRequest({
                  status: SuspendRequestStatusEnum.Approved,
                }),
              }}
            />,
          )

          await taskSuspendRequestTestUtils.findContainer()
          const button = taskSuspendRequestTestUtils.getReturnToWorkButton()

          expect(button).toBeInTheDocument()
          expect(button).toBeEnabled()
        })
      })
    })

    describe('Модалка перевода заявки в ожидание', () => {
      test('Открывается', async () => {
        const { user } = render(
          <TaskCard {...props} task={{ ...props.task!, ...activeRequestSuspendItemProps }} />,
          { store: getStoreWithAuth() },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickRequestSuspendItem(user)
        const modal = await requestTaskSuspendModalTestUtils.findContainer()

        expect(modal).toBeInTheDocument()
      })

      test('Закрывается при клике на кнопку "Отмена"', async () => {
        const { user } = render(
          <TaskCard {...props} task={{ ...props.task!, ...activeRequestSuspendItemProps }} />,
          { store: getStoreWithAuth() },
        )

        await cardTitleTestUtils.openMenu(user)
        await cardTitleTestUtils.clickRequestSuspendItem(user)
        const modal = await requestTaskSuspendModalTestUtils.findContainer()
        await requestTaskSuspendModalTestUtils.clickCancelButton(user)

        expect(modal).not.toBeInTheDocument()
      })

      describe('При успешном запросе', () => {
        test('Переданный обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskCard {...props} task={{ ...props.task!, ...activeRequestSuspendItemProps }} />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickRequestSuspendItem(user)
          await requestTaskSuspendModalTestUtils.findContainer()

          await requestTaskSuspendModalTestUtils.setReason(
            user,
            SuspendReasonEnum.AwaitingInformation,
          )
          await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          expect(props.createSuspendRequest).toBeCalledTimes(1)
          expect(props.createSuspendRequest).toBeCalledWith(expect.anything())
        })

        test('Модалка закрывается', async () => {
          const { user } = render(
            <TaskCard {...props} task={{ ...props.task!, ...activeRequestSuspendItemProps }} />,
            { store: getStoreWithAuth() },
          )

          await cardTitleTestUtils.openMenu(user)
          await cardTitleTestUtils.clickRequestSuspendItem(user)
          const modal = await requestTaskSuspendModalTestUtils.findContainer()

          await requestTaskSuspendModalTestUtils.setReason(
            user,
            SuspendReasonEnum.AwaitingInformation,
          )
          await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
        })
      })
    })
  })
})
