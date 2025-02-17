import { screen, within } from '@testing-library/react'

import technicalExaminationsFixtures from '_tests_/fixtures/api/data/technicalExaminations'
import { render } from '_tests_/helpers'

import { testUtils as technicalExaminationsHistoryTableTestUtils } from '../TechnicalExaminationsHistoryTable/TechnicalExaminationsHistoryTable.test'
import TechnicalExaminationsHistoryModal, { TechnicalExaminationsHistoryModalProps } from './index'

const props: TechnicalExaminationsHistoryModalProps = {
  open: true,
  loading: false,
  dataSource: [technicalExaminationsFixtures.technicalExamination()],
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('technical-examinations-history-modal')
const findContainer = () => screen.findByTestId('technical-examinations-history-modal')

export const testUtils = {
  getContainer,
  findContainer,
}

describe('Модалка истории технической экспертизы', () => {
  test('Таблица и заголовок отображаются', () => {
    render(<TechnicalExaminationsHistoryModal {...props} />)

    const title = within(getContainer()).getByText('История актов технической экспертизы')
    const table = technicalExaminationsHistoryTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })
})
