import api from '__tests/mocks/api'

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
