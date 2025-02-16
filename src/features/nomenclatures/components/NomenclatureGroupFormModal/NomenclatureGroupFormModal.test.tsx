import { within } from '@testing-library/react'

import { validationMessages } from 'shared/constants/validation'

import {
  addModeProps,
  props,
} from '_tests_/features/warehouses/components/NomenclatureGroupFormModal/constants'
import { nomenclatureGroupFormModalTestUtils } from '_tests_/features/warehouses/components/NomenclatureGroupFormModal/testUtils'
import { fakeWord, render } from '_tests_/helpers'

import NomenclatureGroupFormModal from './index'

describe('Модалка создания и редактирования номенклатурной группы', () => {
  test('Заголовок отображается', () => {
    render(<NomenclatureGroupFormModal {...props} />)
    const title = within(nomenclatureGroupFormModalTestUtils.getContainer()).getByText(
      props.title as string,
    )
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureGroupFormModal {...props} {...addModeProps} />)

      const button = nomenclatureGroupFormModalTestUtils.getAddButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<NomenclatureGroupFormModal {...props} {...addModeProps} />)

      await nomenclatureGroupFormModalTestUtils.setName(user, fakeWord())
      await nomenclatureGroupFormModalTestUtils.clickAddButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })

    test('При загрузке отображается спиннер', async () => {
      render(<NomenclatureGroupFormModal {...props} {...addModeProps} isLoading />)

      await nomenclatureGroupFormModalTestUtils.expectLoadingStarted()
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureGroupFormModal {...props} />)

      const button = nomenclatureGroupFormModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<NomenclatureGroupFormModal {...props} />)
      await nomenclatureGroupFormModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Поле названия', () => {
    test('Отображается корректно', () => {
      render(<NomenclatureGroupFormModal {...props} />)

      const label = nomenclatureGroupFormModalTestUtils.getNameLabel()
      const field = nomenclatureGroupFormModalTestUtils.getNameField()

      expect(label).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<NomenclatureGroupFormModal {...props} />)

      const value = fakeWord()
      const field = await nomenclatureGroupFormModalTestUtils.setName(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    test('Отображается ошибка если не заполнить поле и нажать кнопку отправки', async () => {
      const { user } = render(<NomenclatureGroupFormModal {...props} {...addModeProps} />)

      await nomenclatureGroupFormModalTestUtils.clickAddButton(user)
      const error = await nomenclatureGroupFormModalTestUtils.findNameError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })
})
