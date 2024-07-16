import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TaskTypeEnum } from 'modules/task/constants/task'

import { validationMessages, validationSizes } from 'shared/constants/validation'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import taskFixtures from '_tests_/fixtures/task'
import { buttonTestUtils, fakeIdStr, fakeWord, render, selectTestUtils } from '_tests_/utils'

import ExecuteTaskModal from './index'
import { ExecuteTaskModalProps } from './types'

const props: Readonly<ExecuteTaskModalProps> = {
  open: true,
  isLoading: false,

  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  supportGroup: taskFixtures.supportGroup(),

  onSubmit: jest.fn(),
  onCancel: jest.fn(),

  resolutionClassifications: [],
  resolutionClassificationsIsLoading: false,

  onGetAct: jest.fn(),
  getActIsLoading: false,
}

const showResolutionClassifierFieldProps: Readonly<Pick<ExecuteTaskModalProps, 'supportGroup'>> = {
  supportGroup: taskFixtures.supportGroup({ hasResolutionClassifiers: true }),
}

const hideResolutionClassifierFieldProps: Readonly<Pick<ExecuteTaskModalProps, 'supportGroup'>> = {
  supportGroup: taskFixtures.supportGroup({ hasResolutionClassifiers: false }),
}

const getContainer = () => screen.getByTestId('execute-task-modal')
const findContainer = () => screen.findByTestId('execute-task-modal')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)
const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /Отменить/)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// get act button
const getGetActButton = () => buttonTestUtils.getButtonIn(getContainer(), /Сформировать акт/)
const clickGetActButton = async (user: UserEvent) => {
  const button = getGetActButton()
  await user.click(button)
}

const expectGetActLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getGetActButton())
const expectGetActLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getGetActButton())

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /Выполнить заявку/)
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// resolutionClassifier1
const getResolutionClassificationFormItem = () =>
  screen.getByTestId('resolution-classification-form-item')
const queryResolutionClassificationFormItem = () =>
  screen.queryByTestId('resolution-classification-form-item')

const getResolutionClassificationLabel = () =>
  within(getResolutionClassificationFormItem()).getByLabelText('Категория решения')

const getResolutionClassificationSelectInput = () =>
  selectTestUtils.getSelect(getResolutionClassificationFormItem())

const openResolutionClassificationSelect = (user: UserEvent) =>
  selectTestUtils.openSelect(user, getResolutionClassificationFormItem())

const setResolutionClassification = selectTestUtils.clickSelectOption

const getSelectedResolutionClassification = (text: string) =>
  selectTestUtils.getSelectedOptionByTitle(getResolutionClassificationFormItem(), text)

const querySelectedResolutionClassification = (title: string) =>
  selectTestUtils.querySelectedOptionByTitle(getResolutionClassificationFormItem(), title)

const findResolutionClassificationError = (text: string) =>
  within(getResolutionClassificationFormItem()).findByText(text)

const expectResolutionClassificationLoadingFinished = () =>
  selectTestUtils.expectLoadingFinished(getResolutionClassificationFormItem())

// tech resolution
const getTechResolutionBlock = () => within(getContainer()).getByTestId('tech-resolution')

const getTechResolutionTitle = () =>
  within(getTechResolutionBlock()).getByTitle('Техническое решение')

const getTechResolutionField = () =>
  within(getContainer()).getByPlaceholderText('Расскажите о работах на объекте')

const findTechResolutionError = (text: string) => within(getTechResolutionBlock()).findByText(text)

const setTechResolution = async (user: UserEvent, value: string) => {
  const field = getTechResolutionField()
  await user.type(field, value)
  return field
}

// user resolution
const getUserResolutionBlock = () => within(getContainer()).getByTestId('user-resolution')

const getUserResolutionTitle = () =>
  within(getUserResolutionBlock()).getByTitle('Решение для пользователя')

const getUserResolutionField = () =>
  within(getUserResolutionBlock()).getByPlaceholderText('Расскажите заявителю о решении')

const queryUserResolutionField = () =>
  within(getContainer()).queryByRole('textbox', {
    name: 'Решение для пользователя',
  })

const findUserResolutionError = (text: string) => within(getUserResolutionBlock()).findByText(text)

const setUserResolution = async (user: UserEvent, value: string) => {
  const field = getUserResolutionField()
  await user.type(field, value)
  return field
}

// attachments
const getAttachmentsFormItem = () => within(getContainer()).getByTestId('attachments-form-item')

const getAddAttachmentsButton = () =>
  buttonTestUtils.getButtonIn(getAttachmentsFormItem(), /Добавить вложение/)

const setAttachment = async (
  user: UserEvent,
  file: File = new File([], '', { type: 'image/png' }),
) => {
  const formItem = getAttachmentsFormItem()
  // eslint-disable-next-line testing-library/no-node-access
  const input = formItem.querySelector('input[type="file"]') as HTMLInputElement
  await user.upload(input, file)
  return { input, file }
}

const getUploadedAttachment = (filename: string) =>
  within(getAttachmentsFormItem()).getByTitle(filename)

const findAttachmentsError = (error: string) => within(getAttachmentsFormItem()).findByText(error)

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

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

  getGetActButton,
  clickGetActButton,
  expectGetActLoadingStarted,
  expectGetActLoadingFinished,

  queryResolutionClassificationFormItem,
  getResolutionClassificationLabel,
  getResolutionClassificationSelectInput,
  openResolutionClassificationSelect,
  setResolutionClassification,
  getSelectedResolutionClassification,
  querySelectedResolutionClassification,
  findResolutionClassificationError,
  expectResolutionClassificationLoadingFinished,

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
  setAttachment,
  getUploadedAttachment,
  findAttachmentsError,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка выполнения заявки', () => {
  test('Заголовок отображается', () => {
    render(<ExecuteTaskModal {...props} />)

    expect(testUtils.getChildByText('Решение по заявке')).toBeInTheDocument()
    expect(testUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  test('Текст отображается', () => {
    render(<ExecuteTaskModal {...props} />)

    expect(
      testUtils.getChildByText(
        'Заполните информацию о работах на объекте и предложенном решении. Затем нажмите кнопку «Выполнить заявку».',
      ),
    ).toBeInTheDocument()

    expect(
      testUtils.getChildByText('После выполнения заявка будет доступна только в режиме просмотра.'),
    ).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await testUtils.clickCloseButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка сформировать отчёт', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = testUtils.getGetActButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    test('Активна если заполнено техническое решение', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await testUtils.setTechResolution(user, fakeWord())
      const button = testUtils.getGetActButton()

      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await testUtils.setTechResolution(user, fakeWord())
      await testUtils.clickGetActButton(user)

      expect(props.onGetAct).toBeCalledTimes(1)
      expect(props.onGetAct).toBeCalledWith(expect.anything())
    })

    test('Отображает состояние загрузки', async () => {
      render(<ExecuteTaskModal {...props} getActIsLoading />)
      await testUtils.expectGetActLoadingStarted()
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      await testUtils.expectLoadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.setTechResolution(user, fakeWord())
        await testUtils.setUserResolution(user, fakeWord())
        await testUtils.setAttachment(user)
        await testUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.clickSubmitButton(user)
        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Поле категории решения', () => {
    test('Отображается если у группы поддержки поле hasResolutionClassifiers=true', () => {
      const resolutionClassificationListItem = catalogsFixtures.resolutionClassificationListItem()

      render(
        <ExecuteTaskModal
          {...props}
          {...showResolutionClassifierFieldProps}
          resolutionClassifications={[resolutionClassificationListItem]}
        />,
      )

      const label = testUtils.getResolutionClassificationLabel()
      const field = testUtils.getResolutionClassificationSelectInput()
      const selectedOption = testUtils.querySelectedResolutionClassification(
        resolutionClassificationListItem.title,
      )

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(selectedOption).not.toBeInTheDocument()
    })

    test('Не отображается если у группы поддержки поле hasResolutionClassifiers=false', () => {
      render(<ExecuteTaskModal {...props} {...hideResolutionClassifierFieldProps} />)
      const formItem = testUtils.queryResolutionClassificationFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const resolutionClassificationListItem = catalogsFixtures.resolutionClassificationListItem()

      const { user } = render(
        <ExecuteTaskModal
          {...props}
          {...showResolutionClassifierFieldProps}
          resolutionClassifications={[resolutionClassificationListItem]}
        />,
      )

      await testUtils.openResolutionClassificationSelect(user)
      await testUtils.setResolutionClassification(user, resolutionClassificationListItem.title)
      const selectedOption = testUtils.getSelectedResolutionClassification(
        resolutionClassificationListItem.title,
      )

      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(
        <ExecuteTaskModal {...props} {...showResolutionClassifierFieldProps} />,
      )
      await testUtils.clickSubmitButton(user)
      const error = await testUtils.findResolutionClassificationError(validationMessages.required)
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле технического решения', () => {
    test('Заголовок отображается', () => {
      render(<ExecuteTaskModal {...props} />)
      expect(testUtils.getTechResolutionTitle()).toBeInTheDocument()
    })

    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const field = testUtils.getTechResolutionField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно заполнить', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setTechResolution(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно во время загрузки', () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      expect(testUtils.getTechResolutionField()).toBeDisabled()
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.setTechResolution(user, ' ')

        expect(
          await testUtils.findTechResolutionError(validationMessages.canNotBeEmpty),
        ).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findTechResolutionError(validationMessages.required),
        ).toBeInTheDocument()
      })

      test('Если превысить лимит символов', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.setTechResolution(
          user,
          fakeWord({ length: validationSizes.string.long + 1 }),
        )

        expect(
          await testUtils.findTechResolutionError(validationMessages.string.max.long),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Поле решения для пользователя', () => {
    test('Заголовок отображается', () => {
      render(<ExecuteTaskModal {...props} />)
      expect(testUtils.getUserResolutionTitle()).toBeInTheDocument()
    })

    test('Отображается корректно если условия соблюдены', () => {
      render(<ExecuteTaskModal {...props} />)

      const field = testUtils.getUserResolutionField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    describe('Не отображается', () => {
      test('Если тип заявки - incident task', () => {
        render(<ExecuteTaskModal {...props} type={TaskTypeEnum.IncidentTask} />)
        expect(testUtils.queryUserResolutionField()).not.toBeInTheDocument()
      })

      test('Если тип заявки - request task', () => {
        render(<ExecuteTaskModal {...props} type={TaskTypeEnum.RequestTask} />)
        expect(testUtils.queryUserResolutionField()).not.toBeInTheDocument()
      })
    })

    test('Можно заполнить', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setUserResolution(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно во время загрузки', () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      expect(testUtils.getUserResolutionField()).toBeDisabled()
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.setUserResolution(user, ' ')

        expect(
          await testUtils.findUserResolutionError(validationMessages.canNotBeEmpty),
        ).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.clickSubmitButton(user)

        expect(
          await testUtils.findUserResolutionError(validationMessages.required),
        ).toBeInTheDocument()
      })

      test('Если превысить лимит символов', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await testUtils.setUserResolution(
          user,
          fakeWord({ length: validationSizes.string.long + 1 }),
        )

        expect(
          await testUtils.findUserResolutionError(validationMessages.string.max.long),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Поле добавления вложения', () => {
    test('Кнопка отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = testUtils.getAddAttachmentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загруженное вложение отображается', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      const { input, file } = await testUtils.setAttachment(user)
      const uploadedAttachment = testUtils.getUploadedAttachment(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedAttachment).toBeInTheDocument()
    })

    test('Кнопка не активна во время загрузки', () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      const button = testUtils.getAddAttachmentsButton()
      expect(button).toBeDisabled()
    })
  })
})
