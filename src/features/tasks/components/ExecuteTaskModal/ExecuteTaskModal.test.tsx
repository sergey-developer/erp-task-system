import { TaskTypeEnum } from 'features/tasks/api/constants'

import { validationMessages, validationSizes } from 'shared/constants/validation'

import {
  hideResolutionClassifierFieldProps,
  props,
  showResolutionClassifierFieldProps,
} from '_tests_/features/tasks/components/ExecuteTaskModal/constants'
import { executeTaskModalTestUtils } from '_tests_/features/tasks/components/ExecuteTaskModal/testUtils'
import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import { fakeWord, render } from '_tests_/helpers'

import ExecuteTaskModal from './index'

describe('Модалка выполнения заявки', () => {
  test('Заголовок отображается', () => {
    render(<ExecuteTaskModal {...props} />)

    expect(executeTaskModalTestUtils.getChildByText('Решение по заявке')).toBeInTheDocument()
    expect(executeTaskModalTestUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  test('Текст отображается', () => {
    render(<ExecuteTaskModal {...props} />)

    expect(
      executeTaskModalTestUtils.getChildByText(
        'Заполните информацию о работах на объекте и предложенном решении. Затем нажмите кнопку «Выполнить заявку».',
      ),
    ).toBeInTheDocument()

    expect(
      executeTaskModalTestUtils.getChildByText(
        'После выполнения заявка будет доступна только в режиме просмотра.',
      ),
    ).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = executeTaskModalTestUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await executeTaskModalTestUtils.clickCloseButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = executeTaskModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await executeTaskModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка сформировать отчёт', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = executeTaskModalTestUtils.getGetActButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    test('Активна если заполнено техническое решение', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
      const button = executeTaskModalTestUtils.getGetActButton()

      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
      await executeTaskModalTestUtils.clickGetActButton(user)

      expect(props.onGetAct).toBeCalledTimes(1)
      expect(props.onGetAct).toBeCalledWith(expect.anything())
    })

    test('Отображает состояние загрузки', async () => {
      render(<ExecuteTaskModal {...props} getActIsLoading />)
      await executeTaskModalTestUtils.expectGetActLoadingStarted()
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = executeTaskModalTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      await executeTaskModalTestUtils.expectLoadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
        await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
        await executeTaskModalTestUtils.setAttachment(user)
        await executeTaskModalTestUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.clickSubmitButton(user)
        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Поле категории решения', () => {
    test('Отображается если у группы поддержки поле hasResolutionClassifiers=true', () => {
      const resolutionClassificationCatalogItem =
        catalogsFixtures.resolutionClassificationCatalogItem()

      render(
        <ExecuteTaskModal
          {...props}
          {...showResolutionClassifierFieldProps}
          resolutionClassifications={[resolutionClassificationCatalogItem]}
        />,
      )

      const label = executeTaskModalTestUtils.getResolutionClassificationLabel()
      const field = executeTaskModalTestUtils.getResolutionClassificationSelectInput()
      const selectedOption = executeTaskModalTestUtils.querySelectedResolutionClassification(
        resolutionClassificationCatalogItem.title,
      )

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(selectedOption).not.toBeInTheDocument()
    })

    test('Не отображается если у группы поддержки поле hasResolutionClassifiers=false', () => {
      render(<ExecuteTaskModal {...props} {...hideResolutionClassifierFieldProps} />)
      const formItem = executeTaskModalTestUtils.queryResolutionClassificationFormItem()
      expect(formItem).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const resolutionClassificationCatalogItem =
        catalogsFixtures.resolutionClassificationCatalogItem()

      const { user } = render(
        <ExecuteTaskModal
          {...props}
          {...showResolutionClassifierFieldProps}
          resolutionClassifications={[resolutionClassificationCatalogItem]}
        />,
      )

      await executeTaskModalTestUtils.openResolutionClassificationSelect(user)
      await executeTaskModalTestUtils.setResolutionClassification(
        user,
        resolutionClassificationCatalogItem.title,
      )
      const selectedOption = executeTaskModalTestUtils.getSelectedResolutionClassification(
        resolutionClassificationCatalogItem.title,
      )

      expect(selectedOption).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(
        <ExecuteTaskModal {...props} {...showResolutionClassifierFieldProps} />,
      )
      await executeTaskModalTestUtils.clickSubmitButton(user)
      const error = await executeTaskModalTestUtils.findResolutionClassificationError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле технического решения', () => {
    test('Заголовок отображается', () => {
      render(<ExecuteTaskModal {...props} />)
      expect(executeTaskModalTestUtils.getTechResolutionTitle()).toBeInTheDocument()
    })

    test('Отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const field = executeTaskModalTestUtils.getTechResolutionField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно заполнить', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      const value = fakeWord()
      const field = await executeTaskModalTestUtils.setTechResolution(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно во время загрузки', () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      expect(executeTaskModalTestUtils.getTechResolutionField()).toBeDisabled()
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.setTechResolution(user, ' ')

        expect(
          await executeTaskModalTestUtils.findTechResolutionError(validationMessages.canNotBeEmpty),
        ).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await executeTaskModalTestUtils.findTechResolutionError(validationMessages.required),
        ).toBeInTheDocument()
      })

      test('Если превысить лимит символов', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.setTechResolution(
          user,
          fakeWord({ length: validationSizes.string.long + 1 }),
        )

        expect(
          await executeTaskModalTestUtils.findTechResolutionError(
            validationMessages.string.max.long,
          ),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Поле решения для пользователя', () => {
    test('Заголовок отображается', () => {
      render(<ExecuteTaskModal {...props} />)
      expect(executeTaskModalTestUtils.getUserResolutionTitle()).toBeInTheDocument()
    })

    test('Отображается корректно если условия соблюдены', () => {
      render(<ExecuteTaskModal {...props} />)

      const field = executeTaskModalTestUtils.getUserResolutionField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    describe('Не отображается', () => {
      test('Если тип заявки - incident task', () => {
        render(<ExecuteTaskModal {...props} type={TaskTypeEnum.IncidentTask} />)
        expect(executeTaskModalTestUtils.queryUserResolutionField()).not.toBeInTheDocument()
      })

      test('Если тип заявки - request task', () => {
        render(<ExecuteTaskModal {...props} type={TaskTypeEnum.RequestTask} />)
        expect(executeTaskModalTestUtils.queryUserResolutionField()).not.toBeInTheDocument()
      })
    })

    test('Можно заполнить', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      const value = fakeWord()
      const field = await executeTaskModalTestUtils.setUserResolution(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Не активно во время загрузки', () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      expect(executeTaskModalTestUtils.getUserResolutionField()).toBeDisabled()
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.setUserResolution(user, ' ')

        expect(
          await executeTaskModalTestUtils.findUserResolutionError(validationMessages.canNotBeEmpty),
        ).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.clickSubmitButton(user)

        expect(
          await executeTaskModalTestUtils.findUserResolutionError(validationMessages.required),
        ).toBeInTheDocument()
      })

      test('Если превысить лимит символов', async () => {
        const { user } = render(<ExecuteTaskModal {...props} />)

        await executeTaskModalTestUtils.setUserResolution(
          user,
          fakeWord({ length: validationSizes.string.long + 1 }),
        )

        expect(
          await executeTaskModalTestUtils.findUserResolutionError(
            validationMessages.string.max.long,
          ),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Поле добавления вложения', () => {
    test('Кнопка отображается корректно', () => {
      render(<ExecuteTaskModal {...props} />)

      const button = executeTaskModalTestUtils.getAddAttachmentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загруженное вложение отображается', async () => {
      const { user } = render(<ExecuteTaskModal {...props} />)

      const { input, file } = await executeTaskModalTestUtils.setAttachment(user)
      const uploadedAttachment = executeTaskModalTestUtils.getUploadedAttachment(file.name)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedAttachment).toBeInTheDocument()
    })

    test('Кнопка не активна во время загрузки', () => {
      render(<ExecuteTaskModal {...props} isLoading />)
      const button = executeTaskModalTestUtils.getAddAttachmentsButton()
      expect(button).toBeDisabled()
    })
  })
})
