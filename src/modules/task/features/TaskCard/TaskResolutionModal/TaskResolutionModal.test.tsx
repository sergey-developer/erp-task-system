import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TaskTypeEnum } from 'modules/task/constants/common'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import {
  fakeIdStr,
  fakeWord,
  getButtonIn,
  expectLoadingFinishedByButton,
  expectLoadingStartedByButton,
  modalTestUtils,
  render,
  getAllButtonIn,
} from '_tests_/utils'

import TaskResolutionModal, { TaskResolutionModalProps } from './index'

const props: TaskResolutionModalProps = {
  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
  onMakeAct: jest.fn(),
  makeActIsLoading: false,
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
const getCancelButton = () => getButtonIn(getContainer(), /Отменить/)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// make act button
const getMakeActButton = () => getButtonIn(getContainer(), /Сформировать акт/)

const clickMakeActButton = async (user: UserEvent) => {
  const button = getMakeActButton()
  await user.click(button)
}

const expectMakeActLoadingStarted = () =>
  expectLoadingStartedByButton(getMakeActButton())

const expectMakeActLoadingFinished = () =>
  expectLoadingFinishedByButton(getMakeActButton())

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /Выполнить заявку/)

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

const setTechResolution = async (user: UserEvent, value: string) => {
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

const setUserResolution = async (user: UserEvent, value: string) => {
  const field = getUserResolutionField()
  await user.type(field, value)
  return field
}

// attachments
const getAttachmentsFormItem = () =>
  within(getContainer()).getByTestId('attachments-form-item')

const getAddAttachmentsButton = () =>
  getAllButtonIn(getAttachmentsFormItem(), /Добавить вложение/)[1]

const getAddAttachmentsZoneButton = () =>
  getAllButtonIn(getAttachmentsFormItem(), /Добавить вложение/)[0]

const clickAddAttachmentsButton = async (user: UserEvent) => {
  const button = getAddAttachmentsButton()
  await user.click(button)
}

const setAttachment = async (
  user: UserEvent,
  file: File = new File([], '', { type: 'image/png' }),
) => {
  const button = getAddAttachmentsZoneButton()
  // eslint-disable-next-line testing-library/no-node-access
  const input = button.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedAttachment = (filename: string) =>
  within(getAttachmentsFormItem()).getByTitle(filename)

const findAttachmentsError = (error: string) =>
  within(getAttachmentsFormItem()).findByText(error)

// loading
const expectLoadingStarted = () =>
  expectLoadingStartedByButton(getSubmitButton())

const expectLoadingFinished = () =>
  expectLoadingFinishedByButton(getSubmitButton())

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

  getMakeActButton,
  clickMakeActButton,
  expectMakeActLoadingStarted,
  expectMakeActLoadingFinished,

  getTechResolutionBlock,
  getTechResolutionTitle,
  getTechResolutionField,
  findTechResolutionError,
  setTechResolution,

  getUserResolutionBlock,
  getUserResolutionTitle,
  getUserResolutionField,
  queryUserResolutionField,
  findUserResolutionError,
  setUserResolution,

  getAddAttachmentsButton,
  clickAddAttachmentsButton,
  setAttachment,
  getUploadedAttachment,
  findAttachmentsError,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка решения по заявке', () => {
  test('Заголовок отображается', () => {
    render(<TaskResolutionModal {...props} />)

    expect(testUtils.getChildByText('Решение по заявке')).toBeInTheDocument()
    expect(testUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  test('Текст отображается', () => {
    render(<TaskResolutionModal {...props} />)

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
      render(<TaskResolutionModal {...props} />)

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskResolutionModal {...props} />)

      await testUtils.clickCloseButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<TaskResolutionModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskResolutionModal {...props} />)

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка сформировать отчёт', () => {
    test('Отображается корректно', () => {
      render(<TaskResolutionModal {...props} />)

      const button = testUtils.getMakeActButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskResolutionModal {...props} />)

      await testUtils.clickMakeActButton(user)
      expect(props.onMakeAct).toBeCalledTimes(1)
    })

    test('Отображает состояние загрузки', async () => {
      render(<TaskResolutionModal {...props} makeActIsLoading />)
      await testUtils.expectMakeActLoadingStarted()
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<TaskResolutionModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<TaskResolutionModal {...props} isLoading />)
      await testUtils.expectLoadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<TaskResolutionModal {...props} />)

        await testUtils.setTechResolution(user, fakeWord())
        await testUtils.setUserResolution(user, fakeWord())
        await testUtils.setAttachment(user)
        await testUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(
          expect.anything(),
          expect.anything(),
        )
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<TaskResolutionModal {...props} />)

        await testUtils.clickSubmitButton(user)
        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    describe('Поле технического решения', () => {
      test('Заголовок отображается', () => {
        render(<TaskResolutionModal {...props} />)
        expect(testUtils.getTechResolutionTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<TaskResolutionModal {...props} />)

        const field = testUtils.getTechResolutionField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно заполнить', async () => {
        const { user } = render(<TaskResolutionModal {...props} />)

        const value = fakeWord()
        const field = await testUtils.setTechResolution(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<TaskResolutionModal {...props} isLoading />)
        expect(testUtils.getTechResolutionField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<TaskResolutionModal {...props} />)

          await testUtils.setTechResolution(user, ' ')

          expect(
            await testUtils.findTechResolutionError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskResolutionModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findTechResolutionError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskResolutionModal {...props} />)

          await testUtils.setTechResolution(
            user,
            fakeWord({ length: validationSizes.string.long + 1 }),
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
        render(<TaskResolutionModal {...props} />)
        expect(testUtils.getUserResolutionTitle()).toBeInTheDocument()
      })

      test('Отображается корректно если условия соблюдены', () => {
        render(<TaskResolutionModal {...props} />)

        const field = testUtils.getUserResolutionField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      describe('Не отображается', () => {
        test('Если тип заявки - incident task', () => {
          render(
            <TaskResolutionModal {...props} type={TaskTypeEnum.IncidentTask} />,
          )

          expect(testUtils.queryUserResolutionField()).not.toBeInTheDocument()
        })

        test('Если тип заявки - request task', () => {
          render(
            <TaskResolutionModal {...props} type={TaskTypeEnum.RequestTask} />,
          )

          expect(testUtils.queryUserResolutionField()).not.toBeInTheDocument()
        })
      })

      test('Можно заполнить', async () => {
        const { user } = render(<TaskResolutionModal {...props} />)

        const value = fakeWord()
        const field = await testUtils.setUserResolution(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<TaskResolutionModal {...props} isLoading />)
        expect(testUtils.getUserResolutionField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<TaskResolutionModal {...props} />)

          await testUtils.setUserResolution(user, ' ')

          expect(
            await testUtils.findUserResolutionError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskResolutionModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findUserResolutionError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskResolutionModal {...props} />)

          await testUtils.setUserResolution(
            user,
            fakeWord({ length: validationSizes.string.long + 1 }),
          )

          expect(
            await testUtils.findUserResolutionError(
              validationMessages.string.max.long,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле добавления вложения', () => {
      test('Кнопка отображается корректно', () => {
        render(<TaskResolutionModal {...props} />)

        const button = testUtils.getAddAttachmentsButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Можно загрузить вложение', async () => {
        const { user } = render(<TaskResolutionModal {...props} />)

        const { input, file } = await testUtils.setAttachment(user)

        expect(input.files!.item(0)).toBe(file)
        expect(input.files).toHaveLength(1)
      })

      test('После загрузки вложение отображается', async () => {
        const { user } = render(<TaskResolutionModal {...props} />)

        const { file } = await testUtils.setAttachment(user)

        const uploadedAttachment = testUtils.getUploadedAttachment(file.name)
        expect(uploadedAttachment).toBeInTheDocument()
      })

      test('Кнопка не активна во время загрузки', () => {
        render(<TaskResolutionModal {...props} isLoading />)
        const button = testUtils.getAddAttachmentsButton()
        expect(button).toBeDisabled()
      })
    })
  })

  test('Обработчик вызывается корректно кликнув вне модалки', async () => {
    const { user } = render(<TaskResolutionModal {...props} />)

    await modalTestUtils.clickOutsideModal(user)
    expect(props.onCancel).toBeCalledTimes(1)
  })
})
