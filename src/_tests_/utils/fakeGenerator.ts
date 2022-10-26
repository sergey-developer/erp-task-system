import Chance from 'chance'

const chance = new Chance()

export const generateInteger = chance.natural.bind(chance)
export const generateEmail = chance.email.bind(chance)
export const generateName = chance.name.bind(chance)
export const generateWord = chance.word.bind(chance)
export const generateString = chance.string.bind(chance)
export const generateSentence = chance.sentence.bind(chance)
export const generateBoolean = chance.bool.bind(chance)
export const generateDate = chance.date.bind(chance)

export const generateId = () => generateInteger({ min: 1, max: 1000 })
export const generateDateString = () => generateDate().toISOString()
