import { fakeLatitude, fakeLongitude } from '_tests_/utils'

import * as utils from './utils'

test('makeYandexMapLink возвращает корректное значение', () => {
  const makeYandexMapLinkSpy = jest.spyOn(utils, 'makeYandexMapLink')

  const coords = {
    longitude: String(fakeLongitude()),
    latitude: String(fakeLatitude()),
  }

  const expectedLink = `https://yandex.ru/maps/?pt=${coords.longitude},${coords.latitude}&z=18&l=map`

  utils.makeYandexMapLink(coords)
  expect(makeYandexMapLinkSpy).toReturnWith(expectedLink)
})
