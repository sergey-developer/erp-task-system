import { server } from '_tests_/mocks/api/server'

export const setupApiTests = () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })
}
