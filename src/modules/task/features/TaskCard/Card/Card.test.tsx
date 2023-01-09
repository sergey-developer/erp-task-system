import {
  generateWord,
  getStoreWithAuth,
  render,
  setupApiTests,
} from '_tests_/utils'
import { screen } from '@testing-library/react'
import taskFixtures from 'fixtures/task'

import additionalInfoTestUtils from '../AdditionalInfo/_tests_/utils'
import cardTabsTestUtils from '../CardTabs/_tests_/utils'
import { activeFirstItemProps } from '../CardTitle/_tests_/constants'
import cardTitleTestUtils from '../CardTitle/_tests_/utils'
import mainDetailsTestUtils from '../MainDetails/_tests_/utils'
import secondaryDetailsTestUtils from '../SecondaryDetails/_tests_/utils'
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

export const testUtils = {
  getContainer,
  findContainer,
}

setupApiTests()

describe('Детальная карточка заявки', () => {
  describe('Заголовок', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(cardTitleTestUtils.getContainer()).toBeInTheDocument()
    })
  })

  describe('Блок первичной детальной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(mainDetailsTestUtils.getContainer()).toBeInTheDocument()
    })
  })

  describe('Блок вторичной детальной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(secondaryDetailsTestUtils.getContainer()).toBeInTheDocument()
    })
  })

  describe('Блок дополнительной детальной информации заявки', () => {
    test('Отображается', () => {
      render(<TaskCard {...requiredProps} />)
      expect(additionalInfoTestUtils.getContainer()).toBeInTheDocument()
    })
  })

  describe('Вкладки', () => {
    test('Отображаются', () => {
      render(<TaskCard {...requiredProps} />)
      expect(cardTabsTestUtils.getContainer()).toBeInTheDocument()
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
        await taskResolutionModalTestUtils.userClickCloseButton(user)

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
})
