import { api } from '_tests_/mocks/api'

export const setupApiTests = () => {
  beforeAll(() => {
    api.listen()
  })

  afterEach(() => {
    api.resetHandlers()
  })

  afterAll(() => {
    api.close()
  })
}
