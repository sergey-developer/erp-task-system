import { LoginResponseModel } from 'modules/auth/models'

export const CORRECT_EMAIL = 'a@mail.ru'
export const INCORRECT_EMAIL = 'amailru'

export const CORRECT_PASSWORD = '123'

export const successLoginResponse: LoginResponseModel = {
  access:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyMDUwNjkwLCJpYXQiOjE2NjE0NDU4OTAsImp0aSI6ImMwMDIzZmVkYzJiNTQxODNiOTkxZWExMWNhNmU3M2ZlIiwidXNlcl9pZCI6MTIsInVzZXJfcm9sZSI6IlNFTklPUl9FTkdJTkVFUiJ9.dR7RlSKEAAqkbUdKqKqEIYwyzX6mXvUMKWH2tIIFToY',
  refresh:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2MTUzMjI5MCwiaWF0IjoxNjYxNDQ1ODkwLCJqdGkiOiI0NWY5NWY3ZWZmOGU0MzlkODYwMjM2NTY4ZGNmOTM0NiIsInVzZXJfaWQiOjEyLCJ1c2VyX3JvbGUiOiJTRU5JT1JfRU5HSU5FRVIifQ.wsrN3H0SbJmUiiyV3Ml2wsnWtdZXtvVB-ZWWvRjdEpI',
}
