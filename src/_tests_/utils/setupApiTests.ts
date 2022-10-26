import { api } from '_tests_/mocks/api'

const setupApiTests = () => {
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

export default setupApiTests
