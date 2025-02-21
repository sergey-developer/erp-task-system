import { waitFor } from '@testing-library/react'
import { Form } from 'antd'
import ChangeInfrastructureOrderForm from 'features/infrastructures/components/ChangeInfrastructureOrderForm/index'

import { props } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderForm/constants'
import { changeInfrastructureOrderFormTestUtils } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderForm/testUtils'
import { changeInfrastructureOrderFormTableTestUtils } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderFormTable/testUtils'
import { confirmDeleteInfrastructureWorkTypeModalTestUtils } from '_tests_/features/infrastructures/components/ConfirmDeleteInfrastructureWorkTypeModal/testUtils'
import catalogsFixtures from '_tests_/fixtures/api/data/catalogs'
import infrastructuresFixtures from '_tests_/fixtures/api/data/infrastructures'
import {
  mockCreateInfrastructureOrderFormWorkSuccess,
  mockGetInfrastructureOrderFormWorkTypeCostSuccess,
} from '_tests_/mocks/api/infrastructures'
import { fakeInteger, render } from '_tests_/helpers'

describe('Форма добавления работ к бланк-заказу', () => {
  describe('Поле тариф', () => {
    test('Заголовок отображается', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderForm {...props} />
        </Form>,
      )

      expect(changeInfrastructureOrderFormTestUtils.getChildByText('Тариф:')).toBeInTheDocument()
    })

    test('Значение отображается', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderForm {...props} />
        </Form>,
      )

      expect(
        changeInfrastructureOrderFormTestUtils.getChildByText(props.data.urgencyRateType.title),
      ).toBeInTheDocument()
    })
  })

  describe('Таблица добавления работ к бланк-заказу', () => {
    describe.skip('Изменение работ', () => {
      test('При выборе наименования работ устанавливаются значения для зависимых полей', async () => {
        const infrastructureWorkType = catalogsFixtures.infrastructureWorkTypeCatalogItem()

        const infrastructureWorkTypeCost = infrastructuresFixtures.infrastructureWorkTypeCost()
        mockGetInfrastructureOrderFormWorkTypeCostSuccess({ body: infrastructureWorkTypeCost })

        const { user } = render(
          <Form>
            <ChangeInfrastructureOrderForm
              {...props}
              infrastructureWorkTypes={[infrastructureWorkType]}
            />
          </Form>,
        )

        await changeInfrastructureOrderFormTableTestUtils.findContainer()
        await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

        const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

        await changeInfrastructureOrderFormTableTestUtils.openWorkTypeSelect(user, row)
        await changeInfrastructureOrderFormTableTestUtils.setWorkType(
          user,
          infrastructureWorkType.title,
        )

        const amountInput = changeInfrastructureOrderFormTableTestUtils.getAmountInput(row)

        await waitFor(() => {
          expect(amountInput).toBeEnabled()
        })

        const budgetTypeField = changeInfrastructureOrderFormTableTestUtils.getBudgetTypeField(row)
        const laborCostsField = changeInfrastructureOrderFormTableTestUtils.getLaborCostsField(row)
        const costField = changeInfrastructureOrderFormTableTestUtils.getCostField(row)

        await waitFor(() => {
          expect(budgetTypeField).toHaveDisplayValue(
            String(infrastructureWorkTypeCost.type.budgetType),
          )
        })
        await waitFor(() => {
          expect(laborCostsField).toHaveDisplayValue(
            String(infrastructureWorkTypeCost.type.laborCosts),
          )
        })
        await waitFor(() => {
          expect(costField).toHaveDisplayValue(String(infrastructureWorkTypeCost.cost))
        })
      })

      test('При выборе наименования работ и указании количества единиц, устаналиваются значения для зависимых полей', async () => {
        const infrastructureWorkType = catalogsFixtures.infrastructureWorkTypeCatalogItem()

        const infrastructureWorkTypeCost = infrastructuresFixtures.infrastructureWorkTypeCost()
        mockGetInfrastructureOrderFormWorkTypeCostSuccess({ body: infrastructureWorkTypeCost })
        const infrastructureWork = infrastructuresFixtures.infrastructureWork()
        mockCreateInfrastructureOrderFormWorkSuccess({ body: infrastructureWork })

        const { user } = render(
          <Form>
            <ChangeInfrastructureOrderForm
              {...props}
              infrastructureWorkTypes={[infrastructureWorkType]}
            />
          </Form>,
        )

        await changeInfrastructureOrderFormTableTestUtils.findContainer()
        await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

        const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

        await changeInfrastructureOrderFormTableTestUtils.openWorkTypeSelect(user, row)
        await changeInfrastructureOrderFormTableTestUtils.setWorkType(
          user,
          infrastructureWorkType.title,
        )

        const amountInput = changeInfrastructureOrderFormTableTestUtils.getAmountInput(row)

        await waitFor(() => {
          expect(amountInput).toBeEnabled()
        })

        const value = fakeInteger()

        await user.clear(amountInput)
        await changeInfrastructureOrderFormTableTestUtils.setAmount(user, row, value)
        await user.tab()

        const priceField = changeInfrastructureOrderFormTableTestUtils.getPriceField(row)

        await waitFor(() => {
          expect(priceField).toHaveDisplayValue(String(infrastructureWork.price))
        })
      })
    })

    describe('Удаление работ', () => {
      test('После подтверждения удаления вызывается запрос, работа удаляется из бланк-заказа и модалка закрывается', async () => {
        const { user } = render(
          <Form>
            <ChangeInfrastructureOrderForm {...props} />
          </Form>,
        )

        await changeInfrastructureOrderFormTableTestUtils.findContainer()
        await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

        const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

        await changeInfrastructureOrderFormTableTestUtils.clickDeleteOrderFormWorksButton(user, row)

        const modal = await confirmDeleteInfrastructureWorkTypeModalTestUtils.findContainer()

        await confirmDeleteInfrastructureWorkTypeModalTestUtils.clickConfirmButton(user)

        expect(row).not.toBeInTheDocument()
        expect(modal).not.toBeInTheDocument()
      })
    })
  })
})
