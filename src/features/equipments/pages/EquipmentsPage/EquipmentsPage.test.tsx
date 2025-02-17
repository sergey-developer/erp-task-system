import { waitFor } from '@testing-library/react'
import { getEquipmentsErrorMessage } from 'features/equipments/api/constants'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import { equipmentDetailsTestUtils } from '_tests_/features/warehouses/components/EquipmentDetails/testUtils'
import { equipmentTableTestUtils } from '_tests_/features/warehouses/components/EquipmentTable/testUtils'
import commonFixtures from '_tests_/fixtures/api/common'
import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'
import userFixtures from '_tests_/fixtures/api/data/users'
import {
  mockGetEquipmentsForbiddenError,
  mockGetEquipmentsServerError,
  mockGetEquipmentsSuccess,
  mockGetEquipmentSuccess,
} from '_tests_/mocks/api'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import {
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  tableTestUtils,
} from '_tests_/helpers'

import EquipmentsPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe.skip('Страница списка оборудования', () => {
  describe('Список оборудования', () => {
    test('При успешном запросе отображается корректно', async () => {
      const equipments = [equipmentsFixtures.equipment()]
      mockGetEquipmentsSuccess({
        body: commonFixtures.paginatedListResponse(equipments),
      })

      render(<EquipmentsPage />)

      await equipmentTableTestUtils.expectLoadingFinished()

      equipments.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMessage = fakeWord()
        mockGetEquipmentsForbiddenError({ body: { detail: errorMessage } })

        render(<EquipmentsPage />)

        await equipmentTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetEquipmentsServerError()
        render(<EquipmentsPage />)

        await equipmentTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(getEquipmentsErrorMessage)

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const equipments = equipmentsFixtures.equipments(11)
      mockGetEquipmentsSuccess({
        body: commonFixtures.paginatedListResponse(equipments),
        once: false,
      })

      const { user } = render(<EquipmentsPage />)

      const table = await equipmentTableTestUtils.expectLoadingFinished()
      await tableTestUtils.clickPaginationNextButtonIn(user, table)
      await equipmentTableTestUtils.expectLoadingStarted()
      await equipmentTableTestUtils.expectLoadingFinished()

      equipments.slice(-1).forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    test('Установлена сортировка по умолчанию', async () => {
      mockGetEquipmentsSuccess({
        body: commonFixtures.paginatedListResponse(equipmentsFixtures.equipments()),
        once: false,
      })

      render(<EquipmentsPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      const headCell = equipmentTableTestUtils.getHeadCell('Наименование')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
    })

    test('Сортировка работает корректно', async () => {
      const equipments = equipmentsFixtures.equipments()
      mockGetEquipmentsSuccess({
        body: commonFixtures.paginatedListResponse(equipments),
        once: false,
      })

      const { user } = render(<EquipmentsPage />)

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickColTitle(user, 'Серийный номер')
      await equipmentTableTestUtils.expectLoadingStarted()
      await equipmentTableTestUtils.expectLoadingFinished()
      const headCell = equipmentTableTestUtils.getHeadCell('Серийный номер')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      equipments.forEach((item) => {
        const row = equipmentTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Карточка просмотра оборудования', () => {
    test('Открывается по клику на строку таблицы', async () => {
      const equipmentListItem = equipmentsFixtures.equipment()
      mockGetEquipmentsSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      mockGetEquipmentSuccess(equipmentListItem.id, {
        body: equipmentsFixtures.equipmentDetail({ id: equipmentListItem.id }),
      })

      const { user } = render(<EquipmentsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      const equipment = await equipmentDetailsTestUtils.findContainer()

      expect(equipment).toBeInTheDocument()
    })

    test('Открывается по данным из search params', async () => {
      const fakeEquipmentId = 1
      jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(() => String(fakeEquipmentId))

      mockGetEquipmentsSuccess()
      mockGetEquipmentSuccess(fakeEquipmentId)

      render(<EquipmentsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const equipment = await equipmentDetailsTestUtils.findContainer()
      expect(equipment).toBeInTheDocument()
    })

    test('Закрывается', async () => {
      const equipmentListItem = equipmentsFixtures.equipment()
      mockGetEquipmentsSuccess({
        body: commonFixtures.paginatedListResponse([equipmentListItem]),
      })

      mockGetEquipmentSuccess(equipmentListItem.id, {
        body: equipmentsFixtures.equipmentDetail({ id: equipmentListItem.id }),
      })

      const { user } = render(<EquipmentsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await equipmentTableTestUtils.expectLoadingFinished()
      await equipmentTableTestUtils.clickRow(user, equipmentListItem.id)
      const equipment = await equipmentDetailsTestUtils.findContainer()
      await equipmentDetailsTestUtils.clickCloseButton(user)

      await waitFor(() => {
        expect(equipment).not.toBeInTheDocument()
      })
    })
  })
})
