import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { radioButtonTestUtils, render } from '_tests_/utils'

import { mtsrReportLevelDict, MtsrReportLevelEnum } from './constants'
import MtsrReportPage from './index'

const getContainer = () => screen.getByTestId('mtsr-report-page')

const getLevelButton = (name: MtsrReportLevelEnum) =>
  radioButtonTestUtils.getRadioButtonIn(getContainer(), mtsrReportLevelDict[name])

const clickLevelButton = async (user: UserEvent, name: MtsrReportLevelEnum) => {
  const button = getLevelButton(name)
  await user.click(button)
}

const testUtils = {
  getContainer,

  getLevelButton,
  clickLevelButton,
}

describe('Страница отчета MTSR', () => {
  test('По умолчанию выбран нужный уровень', () => {
    render(<MtsrReportPage />)
    const button = testUtils.getLevelButton(MtsrReportLevelEnum.Macroregions)
    expect(button).toBeChecked()
  })

  test('Переход по уровням работает', async () => {
    const { user } = render(<MtsrReportPage />)
    const btn = within(getContainer()).getByRole('radio', { name: 'Макро' })
    screen.debug(btn)
  })
})
