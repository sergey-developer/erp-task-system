import Chance from 'chance'

const chance = new Chance()

export const generateInteger = chance.natural.bind(chance)
export const generateEmail = chance.email.bind(chance)
export const generateName = chance.name.bind(chance)
export const generateWord = chance.word.bind(chance)
export const generatePhone = chance.phone.bind(chance)
export const generateAddress = chance.address.bind(chance)

export const generateDate = chance.date.bind(chance)
export const generateDateString = () => generateDate().toISOString()

export const generateId = generateInteger
export const generateIdStr = () => String(generateId())
