import * as utils from '../utils'

test(`Функция "${utils.makeYandexMapLink.name}" возвращает корректное значение`, () => {
  const makeYandexMapLinkSpy = jest.spyOn(utils, 'makeYandexMapLink')

  const coords = {
    longitude: '30.335429',
    latitude: '59.944869',
  }

  const expectedLink = `https://yandex.ru/maps/?pt=${coords.longitude},${coords.latitude}&z=18&l=map`

  utils.makeYandexMapLink(coords)
  expect(makeYandexMapLinkSpy).toReturnWith(expectedLink)
})
