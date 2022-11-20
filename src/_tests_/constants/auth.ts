import { generateEmail, generateWord } from '_tests_/utils'

export const CORRECT_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoiQURNSU4ifQ._dHw0q0cMhOG_Y4KPpjzkpgYwGuyl3GAvFXZrSWhYl4'

export const CORRECT_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoiQURNSU4ifQ.kCB1hsZQH5YGs4mGTVBUESoq5MHWSDGk7dj74E7lfVw'

export const CORRECT_EMAIL = generateEmail()
export const INCORRECT_EMAIL = generateEmail()
export const NOT_EXISTING_EMAIL = generateEmail()

export const CORRECT_PASSWORD = generateWord()
export const WRONG_PASSWORD = generateWord()
