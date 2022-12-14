import { generateWord, modalTestUtils, render } from '_tests_/utils'
import { ReclassificationReasonEnum } from 'modules/task/constants/common'
import {
  DEFAULT_LONG_TEXT_LENGTH,
  DEFAULT_LONG_TEXT_MAX_LENGTH_MSG,
  FIELD_CAN_NOT_BE_EMPTY_MSG,
  REQUIRED_FIELD_MSG,
} from 'shared/constants/validation'

import TaskReclassificationModal from '../index'
import {
  availableReasons,
  notAvailableReasons,
  requiredProps,
} from './constants'
import testUtils from './utils'

describe('Модалка запроса о переклассификации заявки', () => {
  test('Заголовок отображается', () => {
    render(<TaskReclassificationModal {...requiredProps} />)

    expect(
      testUtils.getChildByText('Запрос о переклассификации заявки'),
    ).toBeInTheDocument()
    expect(testUtils.getChildByText(requiredProps.recordId)).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<TaskReclassificationModal {...requiredProps} />)
      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskReclassificationModal {...requiredProps} />)

      await testUtils.userClickCloseButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<TaskReclassificationModal {...requiredProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<TaskReclassificationModal {...requiredProps} />)

      await testUtils.userClickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<TaskReclassificationModal {...requiredProps} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<TaskReclassificationModal {...requiredProps} isLoading />)
      await testUtils.loadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(
          <TaskReclassificationModal {...requiredProps} />,
        )

        for await (const reason of Object.values(ReclassificationReasonEnum)) {
          await testUtils.userSetReclassificationReason(user, reason)
        }
        await testUtils.userSetComment(user, generateWord())
        await testUtils.userClickSubmitButton(user)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(
          <TaskReclassificationModal {...requiredProps} />,
        )

        await testUtils.userClickSubmitButton(user)
        expect(requiredProps.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    describe('Поле причины переклассификации', () => {
      test('Заголовок отображается', () => {
        render(<TaskReclassificationModal {...requiredProps} />)
        expect(testUtils.getReclassificationReasonTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<TaskReclassificationModal {...requiredProps} />)

        Object.values(ReclassificationReasonEnum).forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeInTheDocument()
          expect(field.value).toBe(reason)
          expect(field).not.toBeChecked()
        })

        availableReasons.forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeEnabled()
        })

        notAvailableReasons.forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeDisabled()
        })
      })

      test('Можно выбрать любую доступную причину', async () => {
        const { user } = render(
          <TaskReclassificationModal {...requiredProps} />,
        )

        for await (const reason of availableReasons) {
          const field = await testUtils.userSetReclassificationReason(
            user,
            reason,
          )
          expect(field).toBeChecked()
        }
      })

      test('Не активно во время загрузки', () => {
        render(<TaskReclassificationModal {...requiredProps} isLoading />)

        Object.values(ReclassificationReasonEnum).forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeDisabled()
        })
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(
            <TaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.findReclassificationReasonError(REQUIRED_FIELD_MSG),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле комментария', () => {
      test('Заголовок отображается', () => {
        render(<TaskReclassificationModal {...requiredProps} />)
        expect(testUtils.getCommentTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<TaskReclassificationModal {...requiredProps} />)

        const field = testUtils.getCommentField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно заполнить', async () => {
        const { user } = render(
          <TaskReclassificationModal {...requiredProps} />,
        )

        const value = generateWord()
        const field = await testUtils.userSetComment(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<TaskReclassificationModal {...requiredProps} isLoading />)
        expect(testUtils.getCommentField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(
            <TaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userSetComment(user, ' ')

          expect(
            await testUtils.findCommentError(FIELD_CAN_NOT_BE_EMPTY_MSG),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(
            <TaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.findCommentError(REQUIRED_FIELD_MSG),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(
            <TaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userSetComment(
            user,
            generateWord({ length: DEFAULT_LONG_TEXT_LENGTH + 1 }),
          )

          expect(
            await testUtils.findCommentError(DEFAULT_LONG_TEXT_MAX_LENGTH_MSG),
          ).toBeInTheDocument()
        })
      })
    })
  })

  test('Обработчик вызывается корректно кликнув вне модалки', async () => {
    const { user } = render(<TaskReclassificationModal {...requiredProps} />)

    await modalTestUtils.userClickOutOfModal(user)
    expect(requiredProps.onCancel).toBeCalledTimes(1)
  })
})
