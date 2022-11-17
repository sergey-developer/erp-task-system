import { render } from '_tests_/utils'

import TaskSecondLineModal from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

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

      const input = testUtils.getWorkGroupSelectInput()
      const placeholder = testUtils.getChildByText('Выберите рабочую группу')

      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
      expect(placeholder).toBeInTheDocument()
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
      await testUtils.workGroupDisabled()
    })
  })
})
