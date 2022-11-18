import { generateWord, render } from '_tests_/utils'
import { TaskTypeEnum } from 'modules/task/constants/common'
import {
  DEFAULT_LONG_TEXT_LENGTH,
  DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
  FIELD_CAN_NOT_BE_EMPTY_MSG,
  REQUIRED_FIELD_MSG,
} from 'shared/constants/validation'

import TaskResolutionModal, { TaskResolutionModalProps } from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

jest.setTimeout(10000)

describe('Модалка решения по заявки', () => {
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

      await testUtils.userClickCloseButton(user)
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

      await testUtils.userClickCancelButton(user)
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
        await testUtils.userClickSubmitButton(user)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<TaskResolutionModal {...requiredProps} />)

        await testUtils.userClickSubmitButton(user)
        expect(requiredProps.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    test('Можно установить изначальные значения', () => {
      const initialFormValues: TaskResolutionModalProps['initialFormValues'] = {
        userResolution: generateWord(),
        techResolution: generateWord(),
      }

      render(
        <TaskResolutionModal
          {...requiredProps}
          initialFormValues={initialFormValues}
        />,
      )

      expect(testUtils.getTechResolutionField()).toHaveDisplayValue(
        initialFormValues.techResolution!,
      )
      expect(testUtils.getUserResolutionField()).toHaveDisplayValue(
        initialFormValues.userResolution!,
      )
    })

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
            await testUtils.findTechResolutionError(FIELD_CAN_NOT_BE_EMPTY_MSG),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.findTechResolutionError(REQUIRED_FIELD_MSG),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userSetTechResolution(
            user,
            generateWord({ length: DEFAULT_LONG_TEXT_LENGTH + 1 }),
          )

          expect(
            await testUtils.findTechResolutionError(
              DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
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

      test('Отображается корректно если все условия соблюдены', () => {
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
            await testUtils.findUserResolutionError(FIELD_CAN_NOT_BE_EMPTY_MSG),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.findUserResolutionError(REQUIRED_FIELD_MSG),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<TaskResolutionModal {...requiredProps} />)

          await testUtils.userSetUserResolution(
            user,
            generateWord({ length: DEFAULT_LONG_TEXT_LENGTH + 1 }),
          )

          expect(
            await testUtils.findUserResolutionError(
              DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })
})
