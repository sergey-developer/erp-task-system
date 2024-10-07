import { Form } from 'antd'

import ChangeInfrastructureOrderFormTable from 'modules/infrastructures/components/ChangeInfrastructureOrderFormTable'

import { props } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderFormTable/constants'
import { changeInfrastructureOrderFormTableTestUtils } from '_tests_/features/infrastructures/components/ChangeInfrastructureOrderFormTable/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import { buttonTestUtils, fakeInteger, render, tableTestUtils } from '_tests_/utils'

describe('Таблица добавления работ к бланк-заказу', () => {
  test('Все колонки отображаются', async () => {
    render(
      <Form>
        <ChangeInfrastructureOrderFormTable {...props} />
      </Form>,
    )

    const container = changeInfrastructureOrderFormTableTestUtils.getContainer()
    const workTypeCol = tableTestUtils.getHeadCell(container, 'Наименование работ')
    const budgetCol = tableTestUtils.getHeadCell(container, 'Бюджет')
    const laborCostsCol = tableTestUtils.getHeadCell(container, 'Количество нч/шт')
    const amountCol = tableTestUtils.getHeadCell(container, 'Количество единиц')
    const costCol = tableTestUtils.getHeadCell(container, 'Цена, руб')
    const priceCol = tableTestUtils.getHeadCell(container, 'Стоимость, руб')

    expect(workTypeCol).toBeInTheDocument()
    expect(budgetCol).toBeInTheDocument()
    expect(laborCostsCol).toBeInTheDocument()
    expect(amountCol).toBeInTheDocument()
    expect(costCol).toBeInTheDocument()
    expect(priceCol).toBeInTheDocument()
  })

  describe('Кнопка добавить работы', () => {
    test('Отображается и активна', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )

      const button = buttonTestUtils.getButtonIn(
        changeInfrastructureOrderFormTableTestUtils.getContainer(),
        /Добавить работы/,
      )

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Неактивна, если текущий пользователь не назначен менеджером по сопровождению', () => {
      render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} managerIsCurrentUser={false} />
        </Form>,
      )

      const button = changeInfrastructureOrderFormTableTestUtils.getAddOrderFormWorksButton()

      expect(button).toBeDisabled()
    })

    test('Добавляет пустую строку в таблицу', async () => {
      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )

      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

      expect(row).toBeInTheDocument()
    })
  })

  describe('Поле наименование работ', () => {
    test('Отображается и активно', async () => {
      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )
      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()
      const select = changeInfrastructureOrderFormTableTestUtils.getWorkTypeSelect(row)

      expect(select).toBeInTheDocument()
      expect(select).toBeEnabled()
    })

    test('При установлении значения вызывается обработчик', async () => {
      const infrastructureWorkTypeListItem = catalogsFixtures.infrastructureWorkTypeListItem()

      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable
            {...props}
            infrastructureWorkTypes={[infrastructureWorkTypeListItem]}
          />
        </Form>,
      )
      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

      await changeInfrastructureOrderFormTableTestUtils.openWorkTypeSelect(user, row)
      await changeInfrastructureOrderFormTableTestUtils.setWorkType(
        user,
        infrastructureWorkTypeListItem.title,
      )

      expect(props.onChangeWorkType).toBeCalledTimes(1)
      expect(props.onChangeWorkType).toBeCalledWith(
        { rowIndex: 0 },
        infrastructureWorkTypeListItem.id,
      )
    })
  })

  test('Поле бюджет отображается и не активно', async () => {
    const { user } = render(
      <Form>
        <ChangeInfrastructureOrderFormTable {...props} />
      </Form>,
    )

    await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

    const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()
    const field = changeInfrastructureOrderFormTableTestUtils.getBudgetTypeField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  test('Поле количество отображается и не активно', async () => {
    const { user } = render(
      <Form>
        <ChangeInfrastructureOrderFormTable {...props} />
      </Form>,
    )

    await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

    const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()
    const field = changeInfrastructureOrderFormTableTestUtils.getLaborCostsField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  describe('Поле количество единиц', () => {
    test('Отображается. Не активно, если не выбрано наименование работ', async () => {
      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />,
        </Form>,
      )

      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()
      const input = changeInfrastructureOrderFormTableTestUtils.getAmountInput(row)

      expect(input).toBeInTheDocument()
      expect(input).toBeDisabled()
    })

    test('Активно, если выбрано наименование работ', async () => {
      const infrastructureWorkTypeListItem = catalogsFixtures.infrastructureWorkTypeListItem()

      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable
            {...props}
            infrastructureWorkTypes={[infrastructureWorkTypeListItem]}
          />
          ,
        </Form>,
      )

      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

      await changeInfrastructureOrderFormTableTestUtils.openWorkTypeSelect(user, row)
      await changeInfrastructureOrderFormTableTestUtils.setWorkType(
        user,
        infrastructureWorkTypeListItem.title,
      )

      const input = changeInfrastructureOrderFormTableTestUtils.getAmountInput(row)

      expect(input).toBeEnabled()
    })

    test('При установлении значения вызывается обработчик', async () => {
      const infrastructureWorkTypeListItem = catalogsFixtures.infrastructureWorkTypeListItem()

      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable
            {...props}
            infrastructureWorkTypes={[infrastructureWorkTypeListItem]}
          />
          ,
        </Form>,
      )

      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

      await changeInfrastructureOrderFormTableTestUtils.openWorkTypeSelect(user, row)
      await changeInfrastructureOrderFormTableTestUtils.setWorkType(
        user,
        infrastructureWorkTypeListItem.title,
      )

      const input = changeInfrastructureOrderFormTableTestUtils.getAmountInput(row)
      const value = fakeInteger()

      await user.clear(input)
      await changeInfrastructureOrderFormTableTestUtils.setAmount(user, row, value)
      await user.tab()

      expect(input).toHaveDisplayValue(String(value))
      expect(props.onChangeAmount).toBeCalledTimes(1)
      expect(props.onChangeAmount).toBeCalledWith(expect.anything(), value, { rowIndex: 0 })
    })
  })

  test('Поле цена отображается и не активно', async () => {
    const { user } = render(
      <Form>
        <ChangeInfrastructureOrderFormTable {...props} />
      </Form>,
    )

    await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

    const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()
    const field = changeInfrastructureOrderFormTableTestUtils.getCostField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  test('Поле стоимость отображается и не активно', async () => {
    const { user } = render(
      <Form>
        <ChangeInfrastructureOrderFormTable {...props} />
      </Form>,
    )

    await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

    const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()
    const field = changeInfrastructureOrderFormTableTestUtils.getPriceField(row)

    expect(field).toBeInTheDocument()
    expect(field).toBeDisabled()
  })

  describe('Кнопка удаления работ', () => {
    test('При нажатии вызывается обработчик', async () => {
      const { user } = render(
        <Form>
          <ChangeInfrastructureOrderFormTable {...props} />
        </Form>,
      )

      await changeInfrastructureOrderFormTableTestUtils.clickAddOrderFormWorksButton(user)

      const row = changeInfrastructureOrderFormTableTestUtils.getRowByRole()

      await changeInfrastructureOrderFormTableTestUtils.clickDeleteOrderFormWorksButton(user, row)

      expect(props.onClickDeleteInfrastructureWorkType).toBeCalledTimes(1)
      expect(props.onClickDeleteInfrastructureWorkType).toBeCalledWith({
        id: undefined,
        rowIndex: 0,
      })
    })
  })
})
