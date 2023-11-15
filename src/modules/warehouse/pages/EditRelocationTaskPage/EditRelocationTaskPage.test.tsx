import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import { testUtils as relocationEquipmentEditableTableTestUtils } from 'modules/warehouse/components/RelocationEquipmentEditableTable/RelocationEquipmentEditableTable.test'
import { testUtils as createRelocationTaskFormTestUtils } from 'modules/warehouse/components/RelocationTaskForm/RelocationTaskForm.test'

import { CANCEL_TEXT } from 'shared/constants/common'

import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentBalanceListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { buttonTestUtils, fakeId, getStoreWithAuth, render, setupApiTests } from '_tests_/utils'

import EditRelocationTaskPage from './index'

const getContainer = () => screen.getByTestId('edit-relocation-task-page')

// download template button
const getDownloadTemplateButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /Скачать шаблон/)

const queryDownloadTemplateButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), /Скачать шаблон/)

const clickDownloadTemplateButton = async (user: UserEvent) => {
  const button = getDownloadTemplateButton()
  await user.click(button)
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Создать заявку')
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), CANCEL_TEXT)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getDownloadTemplateButton,
  queryDownloadTemplateButton,
  clickDownloadTemplateButton,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,
}

const relocationTaskId = fakeId()

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

setupApiTests()

describe('Страница редактирования заявки на перемещение', () => {
  describe('Форма', () => {
    test('Отображается', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />)

      const form = createRelocationTaskFormTestUtils.getContainer()
      expect(form).toBeInTheDocument()
    })
  })

  describe('Перечень оборудования', () => {
    test('Отображается', () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

      mockGetUserListSuccess()
      mockGetLocationListSuccess()
      mockGetEquipmentCatalogListSuccess()
      mockGetCurrencyListSuccess()
      mockGetRelocationTaskSuccess(relocationTaskId)
      mockGetRelocationEquipmentListSuccess(relocationTaskId)
      mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

      render(<EditRelocationTaskPage />)

      const title = within(getContainer()).getByText('Перечень оборудования')
      const table = relocationEquipmentEditableTableTestUtils.getContainer()

      expect(title).toBeInTheDocument()
      expect(table).toBeInTheDocument()
    })

    describe('Кнопка скачивания шаблона', () => {
      test('Отображается если есть права', () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUserListSuccess()
        mockGetLocationListSuccess()
        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess()
        mockGetRelocationTaskSuccess(relocationTaskId)
        mockGetRelocationEquipmentListSuccess(relocationTaskId)
        mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

        render(<EditRelocationTaskPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['EQUIPMENTS_CREATE'] }),
            },
          }),
        })

        const button = testUtils.getDownloadTemplateButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Не отображается если нет прав', () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(relocationTaskId) })

        mockGetUserListSuccess()
        mockGetLocationListSuccess()
        mockGetEquipmentCatalogListSuccess()
        mockGetCurrencyListSuccess()
        mockGetRelocationTaskSuccess(relocationTaskId)
        mockGetRelocationEquipmentListSuccess(relocationTaskId)
        mockGetRelocationEquipmentBalanceListSuccess(relocationTaskId)

        render(<EditRelocationTaskPage />)

        const button = testUtils.queryDownloadTemplateButton()
        expect(button).not.toBeInTheDocument()
      })
    })
  })
})
