import { within } from '@testing-library/react'

import { yesNoOptions } from 'shared/constants/selectField'
import { validationMessages } from 'shared/constants/validation'

import { props } from '_tests_/features/warehouse/components/CreateEquipmentTechnicalExaminationModal/constants'
import { createEquipmentTechnicalExaminationModalTestUtils } from '_tests_/features/warehouse/components/CreateEquipmentTechnicalExaminationModal/testUtils'
import { fakeInteger, fakeWord, render } from '_tests_/utils'

import CreateEquipmentTechnicalExaminationModal from './index'

describe('Модалка создания акта технической экспертизы оборудования', () => {
  test('Заголовок и кнопки в футере отображаются верно', () => {
    render(<CreateEquipmentTechnicalExaminationModal {...props} />)

    const title = within(
      createEquipmentTechnicalExaminationModalTestUtils.getContainer(),
    ).getByText('Данные АТЭ')
    const submitButton = createEquipmentTechnicalExaminationModalTestUtils.getSubmitButton()
    const cancelButton = createEquipmentTechnicalExaminationModalTestUtils.getCancelButton()

    expect(title).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()
  })

  describe('Поле - Причина неисправности', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = createEquipmentTechnicalExaminationModalTestUtils.getMalfunctionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeWord()
      const field = await createEquipmentTechnicalExaminationModalTestUtils.setMalfunction(
        user,
        value,
      )
      expect(field).toHaveDisplayValue(value)
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)

      await createEquipmentTechnicalExaminationModalTestUtils.clickSubmitButton(user)

      const error = await createEquipmentTechnicalExaminationModalTestUtils.findMalfunctionError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Имеются следы механического повреждения', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)

      yesNoOptions.forEach((opt) => {
        const field = createEquipmentTechnicalExaminationModalTestUtils.getHasMechanicalDamageField(
          opt.label as string,
        )
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toBeChecked()
      })
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field =
        await createEquipmentTechnicalExaminationModalTestUtils.clickHasMechanicalDamageField(
          user,
          yesNoOptions[0].label as string,
        )
      expect(field).toBeChecked()
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      await createEquipmentTechnicalExaminationModalTestUtils.clickSubmitButton(user)
      const error =
        await createEquipmentTechnicalExaminationModalTestUtils.findHasMechanicalDamageError(
          validationMessages.required,
        )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Для устранения неисправности необходимо', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = createEquipmentTechnicalExaminationModalTestUtils.getRestorationActionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeWord()
      const field = await createEquipmentTechnicalExaminationModalTestUtils.setRestorationAction(
        user,
        value,
      )
      expect(field).toHaveDisplayValue(value)
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      await createEquipmentTechnicalExaminationModalTestUtils.clickSubmitButton(user)
      const error =
        await createEquipmentTechnicalExaminationModalTestUtils.findRestorationActionError(
          validationMessages.required,
        )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Стоимость восстановления', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = createEquipmentTechnicalExaminationModalTestUtils.getRestorationCostField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeInteger()
      const field = await createEquipmentTechnicalExaminationModalTestUtils.setRestorationCost(
        user,
        value,
      )
      expect(field).toHaveDisplayValue(String(value))
    })

    test('Валидируется как обязательное поле', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      await createEquipmentTechnicalExaminationModalTestUtils.clickSubmitButton(user)
      const error =
        await createEquipmentTechnicalExaminationModalTestUtils.findRestorationCostError(
          validationMessages.required,
        )
      expect(error).toBeInTheDocument()
    })
  })

  describe('Поле - Заключение комиссии', () => {
    test('Отображается и активно', () => {
      render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const field = createEquipmentTechnicalExaminationModalTestUtils.getConclusionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateEquipmentTechnicalExaminationModal {...props} />)
      const value = fakeWord()
      const field = await createEquipmentTechnicalExaminationModalTestUtils.setConclusion(
        user,
        value,
      )
      expect(field).toHaveDisplayValue(value)
    })
  })
})
