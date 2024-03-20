import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as mtsrReportTableTestUtils } from 'modules/reports/components/MtsrReportTable/MtsrReportTable.test'

import reportsFixtures from '_tests_/fixtures/reports'
import {
  mockGetCustomerListSuccess,
  mockGetMacroregionsMtsrReportSuccess,
  mockGetSupportGroupsMtsrReportSuccess,
  mockGetUsersMtsrReportSuccess,
  mockGetWorkGroupsMtsrReportSuccess,
} from '_tests_/mocks/api'
import { radioButtonTestUtils, render, setupApiTests } from '_tests_/utils'

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

setupApiTests()

describe('Страница отчета MTSR', () => {
  test('По умолчанию выбран нужный уровень', () => {
    mockGetMacroregionsMtsrReportSuccess()
    mockGetCustomerListSuccess()

    render(<MtsrReportPage />)

    const button = testUtils.getLevelButton(MtsrReportLevelEnum.Macroregions)
    expect(button).toBeChecked()
  })

  test('Переход по уровням работает', async () => {
    const mtsrReport1 = [reportsFixtures.getMtsrReportItem()]
    const mtsrReport2 = [reportsFixtures.getMtsrReportItem()]
    const mtsrReport3 = [reportsFixtures.getMtsrReportItem()]
    const mtsrReport4 = [reportsFixtures.getMtsrReportItem()]
    mockGetMacroregionsMtsrReportSuccess({ body: mtsrReport1 })
    mockGetSupportGroupsMtsrReportSuccess({ body: mtsrReport2 })
    mockGetWorkGroupsMtsrReportSuccess({ body: mtsrReport3 })
    mockGetUsersMtsrReportSuccess({ body: mtsrReport4 })
    mockGetCustomerListSuccess()

    const { user } = render(<MtsrReportPage />)

    await mtsrReportTableTestUtils.expectLoadingFinished()
    mtsrReport1.forEach((item) => {
      const row = mtsrReportTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })

    await testUtils.clickLevelButton(user, MtsrReportLevelEnum.SupportGroups)
    await mtsrReportTableTestUtils.expectLoadingStarted()
    await mtsrReportTableTestUtils.expectLoadingFinished()
    mtsrReport2.forEach((item) => {
      const row = mtsrReportTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })

    await testUtils.clickLevelButton(user, MtsrReportLevelEnum.WorkGroups)
    await mtsrReportTableTestUtils.expectLoadingStarted()
    await mtsrReportTableTestUtils.expectLoadingFinished()
    mtsrReport3.forEach((item) => {
      const row = mtsrReportTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })

    await testUtils.clickLevelButton(user, MtsrReportLevelEnum.Users)
    await mtsrReportTableTestUtils.expectLoadingStarted()
    await mtsrReportTableTestUtils.expectLoadingFinished()
    mtsrReport4.forEach((item) => {
      const row = mtsrReportTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })
})
