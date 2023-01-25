import {
  generateIdStr,
  generateWord,
  getButtonIn,
  loadingFinishedByButton,
  loadingStartedByButton,
  modalTestUtils,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { TaskTypeEnum } from 'modules/task/constants/common'
import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import TaskResolutionModal, { TaskResolutionModalProps } from './index'

const requiredProps: TaskResolutionModalProps = {
  type: TaskTypeEnum.Request,
  recordId: generateIdStr(),
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('task-resolution-modal')

const findContainer = () => screen.findByTestId('task-resolution-modal')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
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

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /выполнить заявку/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// tech resolution
const getTechResolutionBlock = () =>
  within(getContainer()).getByTestId('tech-resolution')

const getTechResolutionTitle = () =>
  within(getTechResolutionBlock()).getByTitle('Техническое решение')

const getTechResolutionField = () =>
  within(getContainer()).getByPlaceholderText('Расскажите о работах на объекте')

const findTechResolutionError = (text: string) =>
  within(getTechResolutionBlock()).findByText(text)

const userSetTechResolution = async (user: UserEvent, value: string) => {
  const field = getTechResolutionField()
  await user.type(field, value)
  return field
}

// user resolution
const getUserResolutionBlock = () =>
  within(getContainer()).getByTestId('user-resolution')

const getUserResolutionTitle = () =>
  within(getUserResolutionBlock()).getByTitle('Решение для пользователя')

const getUserResolutionField = () =>
  within(getUserResolutionBlock()).getByPlaceholderText(
    'Расскажите заявителю о решении',
  )

const queryUserResolutionField = () =>
  within(getContainer()).queryByRole('textbox', {
    name: 'Решение для пользователя',
  })

const findUserResolutionError = (text: string) =>
  within(getUserResolutionBlock()).findByText(text)

const userSetUserResolution = async (user: UserEvent, value: string) => {
  const field = getUserResolutionField()
  await user.type(field, value)
  return field
}

// loading
const loadingStarted = () => loadingStartedByButton(getSubmitButton())

const loadingFinished = () => loadingFinishedByButton(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getCloseButton,
  clickCloseButton,

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getTechResolutionBlock,
  getTechResolutionTitle,
  getTechResolutionField,
  findTechResolutionError,
  userSetTechResolution,

  getUserResolutionBlock,
  getUserResolutionTitle,
  getUserResolutionField,
  queryUserResolutionField,
  findUserResolutionError,
  userSetUserResolution,

  loadingStarted,
  loadingFinished,
}

describe('Модалка решения по заявке', () => {
  test('Заголовок отображается', () => {
    render(<TaskResolutionModal {...requiredProps} />)

    expect(testUtils.getChildByText('Решение по заявке')).toBeInTheDocument()
    expect(testUtils.getChildByText(requiredProps.recordId)).toBeInTheDocument()
  })

  test('Текст отображается', () => {
    render(<TaskResolutionModal {...requiredProps} />)

    expect(
      testUtils.getChildByText(
        'Заполните информацию о работах на объекте и предложенном решении. Затем нажмите кнопку «Выполнить заявку».',
      ),
    ).toBeInTheDocument()

    expect(
      testUtils.getChildByText(
        'После выполнения заявка будет доступна только в режиме просмотра.',
      ),
    ).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<TaskResolutionModal {...requiredProps} />)

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskResolutionModal {...requiredProps} />)

      await testUtils.clickCloseButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<TaskResolutionModal {...requiredProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskResolutionModal {...requiredProps} />)

      await testUtils.clickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<TaskResolutionModal {...requiredProps} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<TaskResolutionModal {...requiredProps} isLoading />)
      await testUtils.loadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<TaskResolutionModal {...requiredProps} />)

        await testUtils.userSetTechResolution(user, generateWord())
        await testUtils.userSetUserResolution(user, generateWord())
        await testUtils.clickSubmitButton(user)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<TaskResolutionModal {...requiredProps} />)

        await testUtils.clickSubmitButton(user)
        expect(requiredProps.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    describe('Поле технического решения', () => {
      test('Заголовок отображается', () => {
        render(<TaskResolutionModal {...requiredProps} />)
        expect(testUtils.getTechResolutionTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<TaskResolutionModal {...requiredProps} />)

        const field = testUtils.getTechResolutionField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно заполнить', async () => {
        const { user } = render(<TaskResolutionModal {...requiredProps} />)

        const value = generateWord()
        const field = await testUtils.userSetTechResolution(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<TaskResolutionModal {...requiredProps} isLoading />)
        expect(testUtils.getTechResolutionField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userSetTechResolution(user, ' ')

          expect(
            await testUtils.findTechResolutionError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findTechResolutionError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userSetTechResolution(
            user,
            generateWord({ length: validationSizes.string.long + 1 }),
          )

          expect(
            await testUtils.findTechResolutionError(
              validationMessages.string.max.long,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле решения для пользователя', () => {
      test('Заголовок отображается', () => {
        render(<TaskResolutionModal {...requiredProps} />)
        expect(testUtils.getUserResolutionTitle()).toBeInTheDocument()
      })

      test('Отображается корректно если условия соблюдены', () => {
        render(<TaskResolutionModal {...requiredProps} />)

        const field = testUtils.getUserResolutionField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      describe('Не отображается', () => {
        test('Если тип заявки - incident task', () => {
          render(
            <TaskResolutionModal
              {...requiredProps}
              type={TaskTypeEnum.IncidentTask}
            />,
          )

          expect(testUtils.queryUserResolutionField()).not.toBeInTheDocument()
        })

        test('Если тип заявки - request task', () => {
          render(
            <TaskResolutionModal
              {...requiredProps}
              type={TaskTypeEnum.RequestTask}
            />,
          )

          expect(testUtils.queryUserResolutionField()).not.toBeInTheDocument()
        })
      })

      test('Можно заполнить', async () => {
        const { user } = render(<TaskResolutionModal {...requiredProps} />)

        const value = generateWord()
        const field = await testUtils.userSetUserResolution(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<TaskResolutionModal {...requiredProps} isLoading />)
        expect(testUtils.getUserResolutionField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userSetUserResolution(user, ' ')

          expect(
            await testUtils.findUserResolutionError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findUserResolutionError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userSetUserResolution(
            user,
            generateWord({ length: validationSizes.string.long + 1 }),
          )

          expect(
            await testUtils.findUserResolutionError(
              validationMessages.string.max.long,
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })

  test('Обработчик вызывается корректно кликнув вне модалки', async () => {
    const { user } = render(<TaskResolutionModal {...requiredProps} />)

    await modalTestUtils.clickOutsideModal(user)
    expect(requiredProps.onCancel).toBeCalledTimes(1)
  })
})
