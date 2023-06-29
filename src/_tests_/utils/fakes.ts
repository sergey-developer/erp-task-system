import Chance from 'chance'

const chance = new Chance()

export const fakeInteger = chance.natural.bind(chance)
export const fakeEmail = chance.email.bind(chance)
export const fakeName = chance.name.bind(chance)
export const fakeWord = chance.word.bind(chance)
export const fakeColor = chance.color.bind(chance)
export const fakePhone = chance.phone.bind(chance)
export const fakeAddress = chance.address.bind(chance)
export const fakeUrl = chance.url.bind(chance)
export const fakeLatitude = chance.latitude.bind(chance)
export const fakeLongitude = chance.longitude.bind(chance)

export const fakeDate = chance.date.bind(chance)
export const fakeDateString = () => fakeDate().toISOString()

export const fakeId = fakeInteger
export const fakeIdStr = () => String(fakeId())
