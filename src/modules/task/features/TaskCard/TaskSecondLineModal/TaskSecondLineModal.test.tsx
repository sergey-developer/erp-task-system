import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { WorkGroupTypeEnum } from 'modules/workGroup/models'

import { validationMessages } from 'shared/constants/validation'

import workGroupFixtures from 'fixtures/workGroup'

import { mockGetWorkGroupListSuccess } from '_tests_/mocks/api'
import {
  clickSelectOption,
  fakeId,
  fakeIdStr,
  getButtonIn,
  getSelect,
  getSelectOptionById,
  getSelectedOption,
  getSelectedOptionText,
  getStoreWithAuth,
  expectLoadingFinishedBySelect,
  expectLoadingStartedByButton,
  expectLoadingStartedBySelect,
  modalTestUtils,
  querySelect,
  render,
  selectDisabledIn,
  setupApiTests,
  openSelect,
  fakeWord,
} from '_tests_/utils'

import TaskSecondLineModal from './index'
import { TaskSecondLineModalProps } from './interfaces'

const props: Readonly<TaskSecondLineModalProps> = {
  id: fakeId(),
  recordId: fakeIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('task-second-line-modal')
const findContainer = () => screen.findByTestId('task-second-line-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// work group
const getWorkGroupBlock = () => within(getContainer()).getByTestId('work-group')

const getWorkGroupField = (opts?: ByRoleOptions) =>
  getSelect(getWorkGroupBlock(), opts)

const queryWorkGroupField = (opts?: ByRoleOptions) =>
  querySelect(getWorkGroupBlock(), opts)

const findWorkGroupFieldError = (error: string) =>
  within(getWorkGroupBlock()).findByText(error)

const getSelectedWorkGroup = () => getSelectedOption(getWorkGroupBlock())

const getSelectedWorkGroupText = getSelectedOptionText

const getWorkGroupOption = getSelectOptionById
const getWorkGroupOptionText = (option: HTMLElement, text: string) =>
  within(option).getByText(text)

const expectWorkGroupLoadingStarted = () =>
  expectLoadingStartedBySelect(getWorkGroupBlock())

const expectWorkGroupLoadingFinished = () =>
  expectLoadingFinishedBySelect(getWorkGroupBlock())

const expectWorkGroupSelectDisabled = () =>
  selectDisabledIn(getWorkGroupBlock())

const openWorkGroup = async (user: UserEvent) => {
  await openSelect(user, getWorkGroupBlock())
}

const selectWorkGroup = clickSelectOption

// comment
const getCommentFormItem = () =>
  within(getContainer()).getByTestId('comment-form-item')

const getCommentFieldLabel = () =>
  within(getCommentFormItem()).getByText('Комментарий')

const findCommentFieldError = (error: string) =>
  within(getCommentFormItem()).findByText(error)

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Добавьте комментарий')

const setComment = async (user: UserEvent, comment: string) => {
  const input = getCommentField()
  await user.type(input, comment)
  return input
}

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /перевести заявку/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// loading
const expectLoadingStarted = () =>
  expectLoadingStartedByButton(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getWorkGroupField,
  queryWorkGroupField,
  findWorkGroupFieldError,
  getSelectedWorkGroup,
  getSelectedWorkGroupText,
  getWorkGroupOption,
  getWorkGroupOptionText,
  openWorkGroup,
  selectWorkGroup,
  expectWorkGroupSelectDisabled,
  expectWorkGroupLoadingStarted,
  expectWorkGroupLoadingFinished,

  getCommentFormItem,
  findCommentFieldError,
  getCommentFieldLabel,
  getCommentField,
  setComment,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  getCloseButton,
  clickCloseButton,

  expectLoadingStarted,
}

setupApiTests()

describe('Модалка перевода заявки на 2-ю линию', () => {
  test('Заголовок отображается корректно', () => {
    mockGetWorkGroupListSuccess()

    render(<TaskSecondLineModal {...props} />, {
      store: getStoreWithAuth(),
    })

    expect(testUtils.getChildByText(String(props.recordId))).toBeInTheDocument()
    expect(testUtils.getChildByText(/перевод заявки/i)).toBeInTheDocument()
    expect(testUtils.getChildByText(/на II линию/i)).toBeInTheDocument()
  })

  test('Текст отображается корректно', () => {
    mockGetWorkGroupListSuccess()

    render(<TaskSecondLineModal {...props} />, {
      store: getStoreWithAuth(),
    })

    expect(
      testUtils.getChildByText(
        'Выберите рабочую группу II линии, в которую хотите направить заявку для дальнейшей работы. Нажмите кнопку «Перевести заявку».',
      ),
    ).toBeInTheDocument()

    expect(
      testUtils.getChildByText(
        'Заявка исчезнет из вашей очереди заявок. Просмотр заявки и работа с ней будут недоступны.',
      ),
    ).toBeInTheDocument()
  })

  describe('Поле выбора рабочей группы', () => {
    test('Поле отображается корректно', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()

      const title = testUtils.getChildByText('Рабочая группа')
      const placeholder = testUtils.getChildByText('Выберите рабочую группу')
      const input = testUtils.getWorkGroupField()

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(title).toBeInTheDocument()
      expect(placeholder).toBeInTheDocument()
    })

    test('Поле закрыто по умолчанию', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()

      expect(
        testUtils.queryWorkGroupField({ expanded: true }),
      ).not.toBeInTheDocument()
    })

    describe('Имеет верное значение по умолчанию', () => {
      test(`Если есть группа с типом ${WorkGroupTypeEnum.AssociatedWithSapId}`, async () => {
        const workGroupList = [
          workGroupFixtures.workGroup({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.AssociatedWithSapId,
            }),
          }),
          workGroupFixtures.workGroup({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.NoType,
            }),
          }),
        ]

        mockGetWorkGroupListSuccess({ body: workGroupList })

        render(<TaskSecondLineModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectWorkGroupLoadingFinished()

        await waitFor(() => {
          expect(testUtils.getSelectedWorkGroup()).toBeInTheDocument()
        })

        expect(
          testUtils.getSelectedWorkGroupText(
            testUtils.getSelectedWorkGroup()!,
            workGroupList[0].name,
          ),
        ).toBeInTheDocument()
      })

      test(`Если есть группа с типом ${WorkGroupTypeEnum.DefaultForSupportGroup}`, async () => {
        const workGroupList = [
          workGroupFixtures.workGroup({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.DefaultForSupportGroup,
            }),
          }),
          workGroupFixtures.workGroup({
            priority: workGroupFixtures.workGroupPriority({
              type: WorkGroupTypeEnum.NoType,
            }),
          }),
        ]

        mockGetWorkGroupListSuccess({ body: workGroupList })

        render(<TaskSecondLineModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectWorkGroupLoadingFinished()

        await waitFor(() => {
          expect(testUtils.getSelectedWorkGroup()).toBeInTheDocument()
        })

        expect(
          testUtils.getSelectedWorkGroupText(
            testUtils.getSelectedWorkGroup()!,
            workGroupList[0].name,
          ),
        ).toBeInTheDocument()
      })
    })

    describe('Не имеет значения по умолчанию', () => {
      test(`Если нет группы с типом ${WorkGroupTypeEnum.AssociatedWithSapId} или ${WorkGroupTypeEnum.DefaultForSupportGroup}`, async () => {
        const workGroupList = workGroupFixtures.workGroupList(2)
        mockGetWorkGroupListSuccess({ body: workGroupList })

        render(<TaskSecondLineModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectWorkGroupLoadingFinished()
        expect(testUtils.getSelectedWorkGroup()).not.toBeInTheDocument()
      })
    })

    test('Отображается состояние загрузки во время загрузки рабочих групп', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingStarted()
    })

    test('Не активно во время загрузки', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} isLoading />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupSelectDisabled()
    })

    test('Отображает верное количество вариантов', async () => {
      const workGroupList = workGroupFixtures.workGroupList()
      mockGetWorkGroupListSuccess({ body: workGroupList })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()
      await testUtils.openWorkGroup(user)

      expect(
        workGroupList.map((workGroup) =>
          testUtils.getWorkGroupOption(workGroup.id),
        ),
      ).toHaveLength(workGroupList.length)
    })

    test('Корректно отображает варианты', async () => {
      const workGroupList = workGroupFixtures.workGroupList()
      mockGetWorkGroupListSuccess({ body: workGroupList })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()
      await testUtils.openWorkGroup(user)

      workGroupList.forEach((workGroup) => {
        const option = testUtils.getWorkGroupOption(workGroup.id)
        const optionText = testUtils.getWorkGroupOptionText(
          option,
          workGroup.name,
        )

        expect(option.title).toBe(workGroup.priority!.description)
        expect(optionText).toBeInTheDocument()
      })
    })

    test('Корректно отображает варианты с приоритетом >= 4', async () => {
      const workGroupList = [
        workGroupFixtures.workGroup({
          priority: workGroupFixtures.workGroupPriority({ value: 4 }),
        }),
      ]
      mockGetWorkGroupListSuccess({ body: workGroupList })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()
      await testUtils.openWorkGroup(user)

      workGroupList.forEach((workGroup) => {
        const option = testUtils.getWorkGroupOption(workGroup.id)
        const optionText = testUtils.getWorkGroupOptionText(
          option,
          workGroup.name,
        )

        expect(optionText).not.toHaveStyle('font-weight: 500')
      })
    })

    test('Корректно отображает варианты с приоритетом < 4', async () => {
      const workGroupList = [
        workGroupFixtures.workGroup({
          priority: workGroupFixtures.workGroupPriority({ value: 3 }),
        }),
      ]
      mockGetWorkGroupListSuccess({ body: workGroupList })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()
      await testUtils.openWorkGroup(user)

      workGroupList.forEach((workGroup) => {
        const option = testUtils.getWorkGroupOption(workGroup.id)
        const optionText = testUtils.getWorkGroupOptionText(
          option,
          workGroup.name,
        )

        expect(optionText).toHaveStyle('font-weight: 500')
      })
    })

    test('Можно выбрать рабочую группу', async () => {
      const workGroupList = workGroupFixtures.workGroupList()
      mockGetWorkGroupListSuccess({ body: workGroupList })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()
      await testUtils.openWorkGroup(user)
      await testUtils.selectWorkGroup(user, workGroupList[0].name)

      expect(testUtils.getSelectedWorkGroup()).toBeInTheDocument()
    })

    test('После выбора рабочей группы поле закрывается', async () => {
      const workGroupList = workGroupFixtures.workGroupList()
      mockGetWorkGroupListSuccess({ body: workGroupList })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()
      await testUtils.openWorkGroup(user)
      await testUtils.selectWorkGroup(user, workGroupList[0].name)

      expect(
        testUtils.getWorkGroupField({ expanded: false }),
      ).toBeInTheDocument()
    })

    test('Отображает ошибку если не выбрать группу и нажать кнопку отправки', async () => {
      const workGroupList = workGroupFixtures.workGroupList()
      mockGetWorkGroupListSuccess({ body: workGroupList })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectWorkGroupLoadingFinished()
      await testUtils.clickSubmitButton(user)

      expect(
        await testUtils.findWorkGroupFieldError(validationMessages.required),
      ).toBeInTheDocument()
    })
  })

  describe('Поле комментария', () => {
    test('Отображается корректно', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />)

      await testUtils.expectWorkGroupLoadingFinished()
      const label = testUtils.getCommentFieldLabel()
      const field = testUtils.getCommentField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      const { user } = render(<TaskSecondLineModal {...props} />)

      await testUtils.expectWorkGroupLoadingFinished()

      const value = fakeWord()
      const field = await testUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается', () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состоянии загрузки', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} isLoading />, {
        store: getStoreWithAuth(),
      })

      await testUtils.expectLoadingStarted()
    })

    describe('Обработчик вызывается корректно', () => {
      test('Если заполнить обязательные поля', async () => {
        const workGroupList = workGroupFixtures.workGroupList()
        mockGetWorkGroupListSuccess({ body: workGroupList })

        const { user } = render(<TaskSecondLineModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectWorkGroupLoadingFinished()
        await testUtils.openWorkGroup(user)
        await testUtils.selectWorkGroup(user, workGroupList[0].name)
        await testUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(
          expect.anything(),
          expect.anything(),
        )
      })

      test('Если не заполнить обязательные поля', async () => {
        const workGroupList = workGroupFixtures.workGroupList()
        mockGetWorkGroupListSuccess({ body: workGroupList })

        const { user } = render(<TaskSecondLineModal {...props} />, {
          store: getStoreWithAuth(),
        })

        await testUtils.expectWorkGroupLoadingFinished()
        await testUtils.clickSubmitButton(user)

        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      mockGetWorkGroupListSuccess({ body: [] })

      render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      mockGetWorkGroupListSuccess({ body: [] })

      const { user } = render(<TaskSecondLineModal {...props} />, {
        store: getStoreWithAuth(),
      })

      await testUtils.clickCloseButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  test('Обработчик вызывается корректно кликнув вне модалки', async () => {
    mockGetWorkGroupListSuccess({ body: [] })

    const { user } = render(<TaskSecondLineModal {...props} />, {
      store: getStoreWithAuth(),
    })

    await modalTestUtils.clickOutsideModal(user)
    expect(props.onCancel).toBeCalledTimes(1)
  })
})
