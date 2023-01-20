import {
  generateId,
  getAllSelectOption,
  getButtonIn,
  getSelect,
  getSelectOption,
  getSelectedOption,
  loadingStartedByButton,
  loadingStartedBySelect,
  modalTestUtils,
  querySelect,
  render,
  selectDisabled,
  userClickOption,
  userOpenSelect,
} from '_tests_/utils'
import { ByRoleOptions } from '@testing-library/dom/types/queries'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import workGroupFixtures from 'fixtures/workGroup'

import TaskSecondLineModal, { TaskSecondLineModalProps } from './index'

const requiredProps: TaskSecondLineModalProps = {
  id: generateId(),
  isLoading: false,
  workGroupList: workGroupFixtures.getWorkGroupList(),
  workGroupListIsLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('task-second-line-modal')
const findContainer = () => screen.findByTestId('task-second-line-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// work group
const getWorkGroup = () => within(getContainer()).getByTestId('work-group')

const getWorkGroupSelect = (opts?: ByRoleOptions) =>
  getSelect(getWorkGroup(), opts)

const queryWorkGroupSelect = (opts?: ByRoleOptions) =>
  querySelect(getWorkGroup(), opts)

const getSelectedWorkGroup = () => getSelectedOption(getWorkGroup())

const getWorkGroupOption = getSelectOption
const getAllWorkGroupOptions = getAllSelectOption

const workGroupLoadingStarted = () => loadingStartedBySelect(getWorkGroup())

const workGroupSelectDisabled = () => selectDisabled(getWorkGroup())

const userOpenWorkGroup = async (user: UserEvent) => {
  await userOpenSelect(user, getWorkGroup())
}

const userSelectWorkGroup = userClickOption

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /перевести заявку/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const userClickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// loading
const loadingStarted = () => loadingStartedByButton(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getWorkGroupSelect,
  queryWorkGroupSelect,
  getSelectedWorkGroup,
  getWorkGroupOption,
  getAllWorkGroupOptions,
  workGroupSelectDisabled,
  workGroupLoadingStarted,
  userOpenWorkGroup,
  userSelectWorkGroup,

  getSubmitButton,
  userClickSubmitButton,

  getCancelButton,
  userClickCancelButton,

  getCloseButton,
  userClickCloseButton,

  loadingStarted,
}

describe('Модалка перевода заявки на 2-ю линию', () => {
  test('Заголовок отображается корректно', () => {
    render(<TaskSecondLineModal {...requiredProps} />)

    expect(
      testUtils.getChildByText(String(requiredProps.id)),
    ).toBeInTheDocument()
    expect(testUtils.getChildByText(/перевод заявки/i)).toBeInTheDocument()
    expect(testUtils.getChildByText(/на II линию/i)).toBeInTheDocument()
  })

  test('Текст отображается корректно', () => {
    render(<TaskSecondLineModal {...requiredProps} />)

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
    test('Заголовок отображается корректно', () => {
      render(<TaskSecondLineModal {...requiredProps} />)
      expect(testUtils.getChildByText('Рабочая группа')).toBeInTheDocument()
    })

    test('Поле отображается корректно', () => {
      render(<TaskSecondLineModal {...requiredProps} />)

      const input = testUtils.getWorkGroupSelect()
      const placeholder = testUtils.getChildByText('Выберите рабочую группу')

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
    })

    test('Поле не открыто по умолчанию', () => {
      render(<TaskSecondLineModal {...requiredProps} />)

      expect(
        testUtils.queryWorkGroupSelect({ expanded: true }),
      ).not.toBeInTheDocument()
    })

    test('Не имеет значения по умолчанию', () => {
      render(<TaskSecondLineModal {...requiredProps} />)
      expect(testUtils.getSelectedWorkGroup()).not.toBeInTheDocument()
    })

    test('Состояние загрузки отображается во время загрузки рабочих групп', async () => {
      render(<TaskSecondLineModal {...requiredProps} workGroupListIsLoading />)
      await testUtils.workGroupLoadingStarted()
    })

    test('Не активно во время загрузки', async () => {
      render(<TaskSecondLineModal {...requiredProps} isLoading />)
      await testUtils.workGroupSelectDisabled()
    })

    test('Отображает верное количество вариантов', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      await testUtils.userOpenWorkGroup(user)
      expect(testUtils.getAllWorkGroupOptions()).toHaveLength(1)
    })

    test('Корректно отображает варианты', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      await testUtils.userOpenWorkGroup(user)

      requiredProps.workGroupList.forEach((workGroup) => {
        expect(testUtils.getWorkGroupOption(workGroup.name)).toBeInTheDocument()
      })
    })

    test('Можно выбрать рабочую группу', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      const workGroup = requiredProps.workGroupList[0]
      await testUtils.userOpenWorkGroup(user)
      await testUtils.userSelectWorkGroup(user, workGroup.name)

      expect(testUtils.getSelectedWorkGroup()).toBeInTheDocument()
    })

    test('После выбора рабочей группу поле закрывается', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      const workGroup = requiredProps.workGroupList[0]
      await testUtils.userOpenWorkGroup(user)
      await testUtils.userSelectWorkGroup(user, workGroup.name)

      expect(
        testUtils.getWorkGroupSelect({ expanded: false }),
      ).toBeInTheDocument()
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается', () => {
      render(<TaskSecondLineModal {...requiredProps} />)
      expect(testUtils.getSubmitButton()).toBeInTheDocument()
    })

    test('Не активна если не выбрана рабочая группа', () => {
      render(<TaskSecondLineModal {...requiredProps} />)

      expect(testUtils.getSelectedWorkGroup()).not.toBeInTheDocument()
      expect(testUtils.getSubmitButton()).toBeDisabled()
    })

    test('Активна если выбрана рабочая группа', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      const workGroup = requiredProps.workGroupList[0]

      await testUtils.userOpenWorkGroup(user)
      await testUtils.userSelectWorkGroup(user, workGroup.name)

      expect(testUtils.getSelectedWorkGroup()).toBeInTheDocument()
      expect(testUtils.getSubmitButton()).toBeEnabled()
    })

    test('Отображает состоянии загрузки', async () => {
      render(<TaskSecondLineModal {...requiredProps} isLoading />)
      await testUtils.loadingStarted()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      const workGroup = requiredProps.workGroupList[0]

      await testUtils.userOpenWorkGroup(user)
      await testUtils.userSelectWorkGroup(user, workGroup.name)
      await testUtils.userClickSubmitButton(user)

      expect(requiredProps.onSubmit).toBeCalledTimes(1)
      expect(requiredProps.onSubmit).toBeCalledWith(workGroup.id)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<TaskSecondLineModal {...requiredProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      await testUtils.userClickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<TaskSecondLineModal {...requiredProps} />)

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskSecondLineModal {...requiredProps} />)

      await testUtils.userClickCloseButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  test('Обработчик вызывается корректно кликнув вне модалки', async () => {
    const { user } = render(<TaskSecondLineModal {...requiredProps} />)

    await modalTestUtils.clickOutOfModal(user)
    expect(requiredProps.onCancel).toBeCalledTimes(1)
  })
})
